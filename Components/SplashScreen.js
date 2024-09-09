import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkSetupStatus = async () => {
      const auth = getAuth();
      const firestore = getFirestore();
      const user = auth.currentUser;

      if (user) {
        const userRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.setupCompleted) {
            navigation.navigate('Home');
          } else {
            navigation.navigate('SetUp');
          }
        } else {
          navigation.navigate('SetUp');
        }
      } else {
        navigation.navigate('Login'); // or wherever you want to send unauthenticated users
      }
    };

    checkSetupStatus();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FD6639" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141824',
  },
  text: {
    color: '#FD6639',
    marginTop: 10,
  },
});
