import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  PanResponder,
  Animated,
  Dimensions,
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

  const screenWidth = Dimensions.get('window').width;

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        const { moveX } = gestureState;

        // Snap the bubble back to the nearest side
        const targetX = moveX < screenWidth / 2 ? 0 : screenWidth - 80; // 80 is the bubble size
        Animated.spring(pan, {
          toValue: { x: targetX, y: gestureState.moveY < 0 ? 0 : pan.y._value },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      {/* Chat Header */}
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

      {/* Chat Messages */}
      <ScrollView
        style={styles.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        {messages.map((message) => (
          <View key={message.id} style={styles.messageWrapper}>
            <View
              style={[
                styles.messageBubble,
                message.isBot ? styles.botMessage : styles.userMessage,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Draggable Chat Bubble */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.chatBubble,
          {
            transform: [
              { translateX: pan.x },
              { translateY: Animated.add(pan.y, new Animated.Value(0)) },
            ],
          },
        ]}
      >
        <Ionicons name="chatbubbles" size={32} color="#fff" />
      </Animated.View>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#666"
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity style={styles.sendButton}>
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
  chatBubble: {
    width: 80,
    height: 80,
    position: 'absolute',
    bottom: 80,
    left: 16,
    borderRadius: 40,
    backgroundColor: '#FF5733',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
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
