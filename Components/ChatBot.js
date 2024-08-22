import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import axiosRetry from 'axios-retry';

// Initialize axios retry for handling 429 errors
axiosRetry(axios, {
  retries: 5, // Number of retries
  retryDelay: (retryCount) => {
    return axiosRetry.exponentialDelay(retryCount);
  },
  retryCondition: (error) => {
    return error.response.status === 429; // Retry only for rate limit errors
  },
});

const API_KEY = ''; // Replace with your actual API key

const ChatBot = () => {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (message.trim()) {
      setIsLoading(true);
      setResponses([...responses, { text: message, isUser: true }]);

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
          },
          {
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const chatResponse = response.data.choices[0].message.content.trim();
        setResponses([...responses, { text: message, isUser: true }, { text: chatResponse, isUser: false }]);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // Delay before retrying (5 seconds)
          await new Promise(resolve => setTimeout(resolve, 5000));
          handleSend(); // Retry sending the message
        } else {
          // Handle other errors
          setResponses([...responses, { text: message, isUser: true }, { text: 'Sorry, there was an error.', isUser: false }]);
        }
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }

      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Add a header section with a title like "Chat with Bard" */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {responses.map((response, index) => (
          <View key={index} style={response.isUser ? styles.userMessage : styles.botMessage}>
            {/* Add user avatar if needed */}
            <Text style={styles.messageText}>{response.text}</Text>
            {/* Add bot avatar if needed */}
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.sendButtonText}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#FD6639',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#e1ffc7',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    maxWidth: '70%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    maxWidth: '70%',
  },
  messageText: {
    fontSize: 16,
  },
});

export default ChatBot;