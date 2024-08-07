import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Logging = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Home'); // Replace 'Home' with the next screen after login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log p                            In</Text>
      <Text style={styles.welcome}>Welcome</Text>

      <TextInput
        style={styles.input}
        placeholder="Username or email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={() => { /* Navigate to forgot password screen */ }}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.orSignUpWith}>or sign up with</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => { /* Navigate to sign up screen */ }}>
        <Text style={styles.signUp}>Don't have an account? Sign Up as User or Doctor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#ff6f00',
    alignSelf: 'center',
    marginBottom: 10,
  },
  welcome: {
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  forgotPassword: {
    color: '#ff6f00',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#ff6f00',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  orSignUpWith: {
    color: '#888',
    alignSelf: 'center',
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
  },
  signUp: {
    color: '#fff',
    alignSelf: 'center',
  },
});

export default Logging;
