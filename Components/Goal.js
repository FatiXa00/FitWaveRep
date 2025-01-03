import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from './CustomAlert';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

export default function Goal() {
  const navigation = useNavigation();
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const fetchStoredGoal = async () => {
      try {
        const auth = getAuth();
        const firestore = getFirestore();
        const user = auth.currentUser;

        if (user) {
          const userRef = doc(firestore, 'users', user.uid); 
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.selectedGoal) {
              setSelectedGoal(userData.selectedGoal);
            }
          }
        } else {
          Alert.alert('Error', 'User not authenticated.');
        }
      } catch (error) {
        console.error('Failed to fetch the goal from Firestore:', error);
      }
    };

    fetchStoredGoal();
  }, []);

  const handleGoalSelection = async (goal) => {
    setSelectedGoal(goal);
    try {
      const auth = getAuth();
      const firestore = getFirestore();
      const user = auth.currentUser;

      if (user) {
        const userRef = doc(firestore, 'users', user.uid); // Reference to the user's document
        await setDoc(userRef, { selectedGoal: goal }, { merge: true });
      } else {
        Alert.alert('Error', 'User not authenticated.');
      }
    } catch (error) {
      console.error('Failed to save the goal to Firestore:', error);
    }
  };

  const handleContinue = () => {
    if (selectedGoal) {
      console.log('Selected goal:', selectedGoal);
      navigation.navigate('PhysicalActivityLevel', { level: selectedGoal });
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
      <Text style={styles.title}>What Is Your Goal?</Text>
      <View style={styles.optionsContainer}>
        {['Lose Weight', 'Gain Weight', 'Muscle Mass Gain', 'Maintain Weight'].map((goal) => (
          <TouchableOpacity
            key={goal}
            style={[
              styles.optionButton,
              selectedGoal === goal && styles.selectedOptionButton,
            ]}
            onPress={() => handleGoalSelection(goal)}
          >
            <Text
              style={[
                styles.optionText,
                selectedGoal === goal && styles.selectedOptionText,
              ]}
            >
              {goal}
            </Text>
            <View style={selectedGoal === goal ? styles.selectedCircle : styles.circle} />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      <CustomAlert
        visible={alertVisible}
        onClose={handleCloseAlert}
        message="Please select a Goal"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  backButtonText: {
    color: '#FD6639',
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 40,
    fontWeight: 'bold',
    top: 10,
  },
  optionsContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#2B2F3A',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  selectedOptionButton: {
    backgroundColor: '#2B2F3A',
    borderColor: '#FD6639',
    borderWidth: 1.5,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  selectedOptionText: {
    color: '#FD6639',
  },
  circle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  selectedCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FD6639',
    backgroundColor: '#FD6639',
  },
  continueButton: {
    backgroundColor: '#FD6639',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 20,
    width: '50%',
    alignSelf: 'center',
    marginBottom: 80,
    bottom: 5,
  },
  continueButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
