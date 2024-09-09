import * as Facebook from 'expo-facebook';
import { Alert } from 'react-native';
import { FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Make sure this path is correct

const FACEBOOK_APP_ID = '537396642191859'; // Replace with your Facebook App ID

export const signInWithFacebook = async () => {
  try {
    await Facebook.initializeAsync({ appId: FACEBOOK_APP_ID });

    const result = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
    });

    if (result.type === 'success') {
      // Create a Facebook credential with the token
      const credential = FacebookAuthProvider.credential(result.token);

      // Sign-in the user with the credential
      await signInWithCredential(auth, credential);

      // Handle successful login
      // For example: navigation.navigate('SetUp');
    } else {
      Alert.alert('Facebook Sign-In cancelled');
    }
  } catch (error) {
    Alert.alert('Facebook Sign-In Error', error.message);
  }
};
