import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { auth, firestore } from './firebaseConfig';
import { doc, getDoc, collection, addDoc, query, orderBy, getDocs, deleteDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';


// Initialize Gemini API
const genAI = new GoogleGenerativeAI('AIzaSyBAKQdzi4bjkeHz_xnpVaUp0JbSgGB5mWc');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const ChatBot = () => {
    const [messages, setMessages] = useState([
        {
            id: Date.now().toString(),
            text: "Hello, I'm WaveBot. How can I help you today?",
            isBot: true,
        },
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollViewRef = useRef();
    const chatRef = useRef();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
      const [userData, setUserData] = useState({
        age: '',
        email: '',
        fullName: '',
        gender: '',
        height: '',
        selectedGoal: '',
        selectedLevel: '',
        weight: '',
         createdAt: null,
          setupCompleted: false,
         uid: null
    });
      const [user, setUser] = useState(null);

    const navigation = useNavigation();

    const quickOptions = [
       // 'Book me a visit in a gym',
       // 'Show me other sports facilities around',
       // 'Show me other options',
    ];

    const facilitiesExample = {
        name: 'BodyWorks on Nadwiślańska 12 street',
        distance: '250 meters',
        price: '30 zł/one entrance all day',
        facilities: ['Gym', 'SPA', 'Pool'],
    };

      useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
         return subscriber; // unsubscribe on unmount
    }, []);

     useEffect(() => {
        if (user) {
            loadUserData();
        }
        startChat();
    }, [user]);

      const onAuthStateChanged = (user) => {
        setUser(user);
      };

    const loadUserData = async () => {
     if(user){
            try {
                const userDocRef = doc(firestore, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                } else {
                    console.log('No user data found');
                }

                 // Load chat history
               const chatHistoryRef = collection(firestore, 'users', user.uid, 'chatHistory');
                const chatQuery = query(chatHistoryRef, orderBy('createdAt'));
                const chatSnapshot = await getDocs(chatQuery);
                 const historyMessages = chatSnapshot.docs.map(doc => doc.data());
                 setMessages(historyMessages);
            } catch (error) {
                 console.error('Error loading user data:', error);
            }
        }
    };


    const startChat = async () => {
        const chatHistory = messages.map(msg => ({
            role: msg.isBot ? 'model' : 'user',
            parts: msg.text
        }));

        chatRef.current = model.startChat({
            history: chatHistory.slice(1),
            generationConfig: {
                temperature: 0.7,
                topK: 1,
                topP: 1,
                maxOutputTokens: 1048,
            },
        });
    };
 const sendMessage = async (text) => {
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text,
      isBot: false,
        createdAt: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
      try {
        if (user) {
              const chatHistoryRef = collection(firestore, 'users', user.uid, 'chatHistory');
               await addDoc(chatHistoryRef, newMessage);
          }
      } catch (error) {
         console.error('Error saving message to Firestore:', error);
      }
    setInputMessage('');
    setIsLoading(true);

    if (!user) {
        try {
          await auth.signInAnonymously();
          console.log('User signed in anonymously');
        } catch (error) {
          console.error('Failed to sign in anonymously:', error);
            setIsLoading(false);
          return;
        }
    }
      let prompt = text;

      if (userData.fullName){
          prompt = `User ${userData.fullName}, age: ${userData.age}, gender: ${userData.gender}, height: ${userData.height}, weight: ${userData.weight}, selected goal: ${userData.selectedGoal}, selected level: ${userData.selectedLevel} said ${text}.`;
      }
     
    try {
        const result = await new Promise((resolve) => {
        setTimeout(async () => {
           try{
               const result = await chatRef.current.sendMessage(prompt);
               resolve(result);
           } catch (error) {
               resolve({error: error})
            }
          }, 500);
        });

      if(result.error) {
        throw result.error;
      }

      const response = await result.response;
      let botResponse;

      if (text.toLowerCase().includes('facilities') || text.toLowerCase().includes('sports')) {
          botResponse = {
              id: Date.now().toString(),
              text: 'Here are some options:',
              isBot: true,
                createdAt: new Date()
          };
          setMessages((prev) => [...prev, botResponse]);
          
           try {
              if (user) {
                 const chatHistoryRef = collection(firestore, 'users', user.uid, 'chatHistory');
                   await addDoc(chatHistoryRef, botResponse);
               }
              } catch (error) {
                  console.error('Error saving message to Firestore:', error);
             }
          // Add facility information as a special message type
          botResponse = {
              id: Date.now().toString(),
              type: 'facility',
              facility: facilitiesExample,
              isBot: true,
               createdAt: new Date()
          };
           try {
              if (user) {
                 const chatHistoryRef = collection(firestore, 'users', user.uid, 'chatHistory');
                   await addDoc(chatHistoryRef, botResponse);
               }
              } catch (error) {
                  console.error('Error saving message to Firestore:', error);
             }
      } else {
          botResponse = {
              id: Date.now().toString(),
              text: response.text(),
              isBot: true,
                createdAt: new Date()
          };
           try {
              if (user) {
                 const chatHistoryRef = collection(firestore, 'users', user.uid, 'chatHistory');
                   await addDoc(chatHistoryRef, botResponse);
               }
              } catch (error) {
                  console.error('Error saving message to Firestore:', error);
             }
      }
      setMessages(prev => [...prev, botResponse]);
  } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
          id: Date.now().toString(),
          text: "I'm having trouble responding right now. Please try again.",
          isBot: true,
           createdAt: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
       try {
            if (user) {
               const chatHistoryRef = collection(firestore, 'users', user.uid, 'chatHistory');
                 await addDoc(chatHistoryRef, errorMessage);
             }
            } catch (error) {
                console.error('Error saving message to Firestore:', error);
           }
  } finally {
      setIsLoading(false);
  }
};

const clearHistory = async () => {
    setMessages([{
      id: Date.now().toString(),
      text: "Hello, I'm WaveBot. How can I help you today?",
      isBot: true,
        createdAt: new Date()
  },]);
      try {
           if (user) {
            const chatHistoryRef = collection(firestore, 'users', user.uid, 'chatHistory');
               const chatQuery = query(chatHistoryRef);
               const chatSnapshot = await getDocs(chatQuery);

                chatSnapshot.docs.forEach(async (doc) => {
                   await deleteDoc(doc.ref);
                });
          }
      } catch (error) {
            console.error('Error saving message to Firestore:', error);
       }
    setIsMenuVisible(false);
};


const renderMessage = (message) => {
  if (message.type === 'facility') {
      return (
          <View style={styles.facilityContainer} key={message.id}>
              <Text style={styles.facilityName}>{message.facility.name}</Text>
              <View style={styles.facilityDetails}>
                  <Text style={styles.facilityText}>{message.facility.distance} • {message.facility.price}</Text>
              </View>
              <View style={styles.facilitiesRow}>
                  {message.facility.facilities.map((facility, index) => (
                      <View key={index} style={styles.facilityTag}>
                          <Text style={styles.facilityTagText}>{facility}</Text>
                      </View>
                  ))}
              </View>
          </View>
      );
  }

  return (
      <View
          style={[
              styles.messageBubble,
              message.isBot ? styles.botMessage : styles.userMessage,
          ]}
          key={message.id}
          >
          <Text style={styles.messageText}>{message.text}</Text>
      </View>
  );
};

const toggleMenu = () => {
  setIsMenuVisible(!isMenuVisible);
};

    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
           >
            <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                 <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                   <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.botInfo}>
                  <View style={styles.botAvatar}>
                    <Ionicons name="fitness" size={24} color="#fff" />
                  </View>
                  <View>
                    <Text style={styles.botName}>WaveBot</Text>
                    <View style={styles.statusContainer}>
                      <View style={styles.activeStatus} />
                      <Text style={styles.statusText}>Always active</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
                  <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
                </TouchableOpacity>
                 <Modal
                    visible={isMenuVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={toggleMenu}
                  >
                    <TouchableOpacity
                      style={styles.modalBackground}
                      activeOpacity={1}
                      onPress={toggleMenu}
                    >
                    <View style={styles.menuContainer}>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={clearHistory}
                         >
                        <Text style={styles.menuItemText}>Clear History</Text>
                         </TouchableOpacity>
                    </View>
                   </TouchableOpacity>
                </Modal>
              </View>

              <ScrollView
                style={styles.messagesContainer}
                ref={scrollViewRef}
                onContentSizeChange={() =>
                  scrollViewRef.current.scrollToEnd({ animated: true })
                }
              >
                {messages.map((message) => (
                  <View key={message.id} style={styles.messageWrapper}>
                    {renderMessage(message)}
                  </View>
                ))}
                {isLoading && (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#4CAF50" />
                  </View>
                )}
              </ScrollView>

              <View style={styles.quickOptionsContainer}>
                {quickOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.quickOption}
                    onPress={() => sendMessage(option)}
                  >
                    <Text style={styles.quickOptionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Type a message..."
                  placeholderTextColor="#666"
                  value={inputMessage}
                  onChangeText={setInputMessage}
                  multiline
                />
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={() => {
                    if (inputMessage.trim()) {
                      sendMessage(inputMessage);
                    }
                  }}
                  disabled={isLoading}
                >
                  <Ionicons name="send" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start', // Keep to top to align under the header
    alignItems: 'flex-end',      // Align to the right edge
    paddingTop: Platform.OS === 'ios' ? 80 : 50,   // Add padding for space
  },
  menuContainer: {
     backgroundColor: '#333',
    marginRight: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
    menuItem: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#444', // Slightly darker background on hover
         marginBottom: 2, // Add a small spacing between the options
         marginLeft: 1,
          marginRight: 1,
         },
       menuItemText: {
          color: '#fff',
          fontSize: 16,
          fontWeight: '500',
      },

  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 8,
  },
  botInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF5733',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  botName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    color: '#888',
    fontSize: 12,
  },
  menuButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageWrapper: {
    marginBottom: 12,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  botMessage: {
    backgroundColor: '#333',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  userMessage: {
    backgroundColor: '#FF5733',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  facilityContainer: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  facilityName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  facilityDetails: {
    marginBottom: 8,
  },
  facilityText: {
    color: '#888',
    fontSize: 14,
  },
  facilitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  facilityTag: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  facilityTagText: {
    color: '#fff',
    fontSize: 14,
  },
    loadingContainer: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
  quickOptionsContainer: {
    padding: 16,
    gap: 8,
  },
  quickOption: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  quickOptionText: {
    color: '#FF5733',
    fontSize: 14,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  input: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    color: '#fff',
    fontSize: 16,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF5733',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default ChatBot;