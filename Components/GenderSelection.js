import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import CustomAlert from './CustomAlert'; 

export default function GenderSelection() {
  const navigation = useNavigation();
  const [selectedGender, setSelectedGender] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);

  const auth = getAuth();
  const firestore = getFirestore();

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleContinuePress = async () => {
    if (selectedGender) {
      const user = auth.currentUser;

      if (user) {
        const userRef = doc(firestore, 'users', user.uid); 
        try {
          await setDoc(userRef, { gender: selectedGender }, { merge: true });

          console.log('Selected gender:', selectedGender);
          navigation.navigate('HowOld');
        } catch (error) {
          console.error('Failed to save gender to Firestore', error);
        }
      }
    } else {
      setAlertVisible(true);
    }
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'<'} Back</Text>
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What's Your Gender</Text>
      </View>

      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderOption, selectedGender === 'Male' && styles.selectedOption]}
          onPress={() => handleGenderSelect('Male')}
        >
          <Image source={require('../assets/SetUp/male.png')} style={styles.genderImage} />
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.genderOption, selectedGender === 'Female' && styles.selectedOption]}
          onPress={() => handleGenderSelect('Female')}
        >
          <Image source={require('../assets/SetUp/female.png')} style={styles.genderImage} />
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinuePress}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      <CustomAlert
        visible={alertVisible}
        onClose={handleCloseAlert}
        message="Please select a gender"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
    position: 'relative',
  },
  backButton: {
    marginTop: 30,
    marginBottom: 50,
  },
  backButtonText: {
    color: '#FD6639',
    fontSize: 18,
    top: 30,
    left: 10,
  },
  titleContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    top: 40,
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  genderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderOption: {
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 3,
    borderColor: 'transparent',
    borderRadius: 100,
    padding: 10,
  },
  selectedOption: {
    borderColor: '#FD6639',
  },
  genderImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  genderText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#FD6639',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 25,
    marginVertical: 20,
    width: '50%',
    alignSelf: 'center',
    marginBottom: 60,
  },
  continueButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
