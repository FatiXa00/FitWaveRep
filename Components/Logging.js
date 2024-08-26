
import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

   
const Logging = ({ navigation }) => {
   const [usernameOrEmail, setususernameOrEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleLogin = () => {
    navigation.navigate('SetUp'); 
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <Text style={styles.subtitle}>Welcome</Text>

      <View style={styles.inputContainer}>
      <Text
        style={styles.label}>Username or email</Text>
        <TextInput
        style={styles.input}
         placeholder="Enter Your Username or Email"
        value={usernameOrEmail}
        onChangeText={setususernameOrEmail}
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

      <TouchableOpacity onPress={() => {navigation.navigate('ForgottenPassword')}}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.orSignUpWith}>or sign up with</Text>

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

      <Text style={styles.signUp}>Don't have an account? Sign Up as</Text>
      <View style={styles.signUpRow}>
        <TouchableOpacity onPress={() => {   navigation.navigate('CreateAccount');  }}>
          <Text style={styles.signUpUser}> User</Text>
        </TouchableOpacity>
        <Text style={styles.signUp}> or</Text>
        <TouchableOpacity onPress={() => { navigation.navigate('CreateDoctor'); }}>
          <Text style={styles.signUpUser}> Doctor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    marginBottom: 50,
    marginTop:50,
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

  forgotPassword: {
    color: '#FD6639',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },

  loginButton: {
    backgroundColor: '#FD6639',
    paddingVertical: 15,
    paddingHorizontal:5,
    borderRadius: 25,
    marginVertical: 20,
  },
  loginButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orSignUpWith: {
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
  signUp: {
    color: '#fff',
    alignSelf: 'center',
  },
  signUpUser: {
    color: '#FD6639',
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Logging;
