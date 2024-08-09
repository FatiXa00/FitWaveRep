import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ForgottenPassword from './ForgottenPassword';
import SetPassword from './SetPassword';

export default function CreateDoctor() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [Contact, setConcatc] = useState('');
  const [Address, setAdress] = useState('');

  const handleSignUp = () => {
    navigation.navigate('ForgottenPassword');   
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
          placeholder="Enter Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email or Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contact</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          value={Contact}
          onChangeText={setConcatc}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Adress"
          value={Address}
          onChangeText={setAdress}
        />
      </View>



      <View style={styles.policy}>
      <Text style={styles.terms}>By continuing, you agree to</Text>
      <Text style={styles.terms}>
        <Text style={styles.link}>Terms of Use</Text> and{' '}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={() => { navigation.navigate('CreateDoctor2');  }}>
        <Text style={styles.signUpButtonText}>Continue</Text>
      </TouchableOpacity>

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

    header: {
     flexDirection: "row",
     alignItems: 'center',
      },

  backButton: {
    marginTop: 25,
    marginLeft:1
    },
    
    backButtonText: {
      color: '#FD6639',
     fontSize: 18,
      },
  
  backButtonText: {
    color: '#FD6639',
    fontSize: 18,
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
 