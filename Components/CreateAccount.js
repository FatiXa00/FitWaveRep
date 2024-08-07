import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CreateAccount() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Handle sign-up logic here
  };

  const handleLogin = () => {
    navigation.navigate('Logging'); 
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Let's Start!</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full name</Text>
        <TextInput
          style={styles.input}
          placeholder="example"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email or Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="+212625739588"
          value={emailOrMobile}
          onChangeText={setEmailOrMobile}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="************"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="************"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <View style={styles.policy}>
      <Text style={styles.terms}>By continuing, you agree to</Text>
      <Text style={styles.terms}>
        <Text style={styles.link}>Terms of Use</Text> and{' '}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or sign up with</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity>
          <Image source={require('../assets/icons/IconApple.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/icons/IconGoogle.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/icons/IconFacebook.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLink}>Log in</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#141824',
  },
  
  title: {
    marginTop:45,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FD6639',
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
  },
  terms: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
  },
  link: {
    color: '#FD6639',
  },
  signUpButton: {
    backgroundColor: '#FD6639',
    paddingVertical: 15,
    paddingHorizontal:5,
    borderRadius: 25,
    marginVertical: 20,
  },
  signUpButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    color: '#888888',
    textAlign: 'center',
    marginVertical: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  loginText: {
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 20,
  },
  loginLink: {
    color: '#FD6639',
  },
  policy:{
    marginTop:10,

  },
});
 