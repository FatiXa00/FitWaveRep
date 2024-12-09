import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const WaterBottle = () => {
  const totalSections = 6;
  const [waterLevel, setWaterLevel] = useState(0);
  const [waterIntakeGoal, setWaterIntakeGoal] = useState(2); 

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const auth = getAuth();
        const firestore = getFirestore();
        const user = auth.currentUser;

        if (user) {
          const userRef = doc(firestore, 'users', user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.waterIntakeGoal) {
              setWaterIntakeGoal(userData.waterIntakeGoal);
            }
          } else {
            console.log('No such document!');
          }
        } else {
          Alert.alert('Error', 'User not authenticated.');
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };
    loadSettings();
  }, []);

  const addWater = () => {
    setWaterLevel((prev) => Math.min(prev + 0.5, waterIntakeGoal));
  };

  const removeWater = () => {
    setWaterLevel((prev) => Math.max(prev - 0.5, 0));
  };

  const saveGoalToFirestore = async (goal) => {
    try {
      const auth = getAuth();
      const firestore = getFirestore();
      const user = auth.currentUser;

      if (user) {
        const userRef = doc(firestore, 'users', user.uid);
        await setDoc(userRef, { waterIntakeGoal: goal }, { merge: true });
      } else {
        Alert.alert('Error', 'User not authenticated.');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      Alert.alert('Error', 'Failed to save the water intake goal. Please try again.');
    }
  };

  const handleGoalChange = (newGoal) => {
    setWaterIntakeGoal(newGoal);
    saveGoalToFirestore(newGoal);
  };

  const renderBottleSections = () => {
    const sections = [];
    for (let i = totalSections - 1; i >= 0; i--) {
      sections.push(
        <View
          key={i}
          style={[
            styles.bottleSection,
            i < (waterLevel / waterIntakeGoal) * totalSections ? styles.filledSection : styles.emptySection,
          ]}
        />
      );
    }
    return sections;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Water Intake</Text>
      <View style={styles.bottleContainer}>
        <View style={styles.bottleHead} />
        {renderBottleSections()}
        <Text style={styles.waterLevelText}>{waterLevel.toFixed(1)}L / {waterIntakeGoal}L</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={removeWater} style={styles.button}>
          <FontAwesome name="minus" size={11} color="#272A3B" />
        </TouchableOpacity>
        <TouchableOpacity onPress={addWater} style={styles.button}>
          <FontAwesome name="plus" size={11} color="#272A3B" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222435',
    padding: 10,
    borderRadius: 12,
    margin: 10,
    width: 160,
    height: 170,
    top:-29,
    position: 'absolute',
    left: 201,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
    top:40,
    fontWeight: 'bold',
  },
  bottleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    top:20,
  },
  bottleHead: {
    width: 40,
    height: 15,
    backgroundColor: '#8D8D8D',
    marginBottom: 2,
    borderRadius: 5,
  },
  bottleSection: {
    width: 50,
    height: 8,
    marginBottom: 2,
    borderRadius: 5,
  },
  filledSection: {
    backgroundColor: '#FD6639',
  },
  emptySection: {
    backgroundColor: '#4F4F4F',
  },
  waterLevelText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 8,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    bottom:90,
  },
  button: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#FD6639',
    marginVertical: 10,
  },
});

export default WaterBottle;
