import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, I'm WaveBot! 👋 I'm your personal assistant. How can I help you?",
      isBot: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const scrollViewRef = useRef();

  const quickOptions = [
    'Book me a visit in a gym',
    'Show me other sports facilities around',
    'Show me other options',
  ];

  const facilitiesExample = {
    name: 'BodyWorks on Nadwiślańska 12 street',
    distance: '250 meters',
    price: '30 zł/one entrance all day',
    facilities: ['Gym', 'SPA', 'Pool'],
  };

  const sendMessage = (text) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      isBot: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      let botResponse;
      if (text.toLowerCase().includes('facilities') || text.toLowerCase().includes('sports')) {
        botResponse = {
          id: messages.length + 2,
          text: 'Ok, how about these?',
          isBot: true,
        };
        setMessages((prev) => [...prev, botResponse]);
        
        // Add facility information as a special message type
        botResponse = {
          id: messages.length + 3,
          type: 'facility',
          facility: facilitiesExample,
          isBot: true,
        };
      } else {
        botResponse = {
          id: messages.length + 2,
          text: 'I can help you with that! Would you like to see some options?',
          isBot: true,
        };
      }
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const renderMessage = (message) => {
    if (message.type === 'facility') {
      return (
        <View style={styles.facilityContainer}>
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
      >
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
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
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
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
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            if (inputMessage.trim()) {
              sendMessage(inputMessage);
            }
          }}
        >
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
