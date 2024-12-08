import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'; 
import { getFirestore, doc, setDoc } from 'firebase/firestore';


export default function CreateAccount() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    try {
      if (!email.includes('@')) {
        throw new Error('Invalid email address');
      }
  
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const firestore = getFirestore();
        const userRef = doc(firestore, 'users', user.uid);
  
      await setDoc(userRef, {
        fullName: fullName,
        email: email, 
        uid: user.uid, 
        setupCompleted: false, 
        createdAt: new Date(),
      });
  
      navigation.navigate('Logging');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  

  const handleLogin = () => {
    navigation.navigate('Logging');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'} Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create Account</Text>
      </View>
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
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Password again"
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#141824',
      },

    header: {
     flexDirection: "row",
     alignItems: 'center',
      },

  backButton: {
    marginTop: -20,
    marginLeft:1

    },
    
  
  backButtonText: {
    color: '#FD6639',
    fontSize: 18,
    top: -2,
    left:-10

  },

  arrow: {
    fontSize: 30,
    color: '#FD6639',
   },
  
  title: {
    marginTop:45,
    marginLeft:25,
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
    marginTop:50,
    backgroundColor: '#FD6639',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 25,
    marginVertical: 20,
    width:'50%',
    alignSelf:'center',
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