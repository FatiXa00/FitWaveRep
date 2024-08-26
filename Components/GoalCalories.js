import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GoalCalories = ({ visible, onClose }) => {
  const [goalCalories, setGoalCalories] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weight = await AsyncStorage.getItem('weightValue');
        const height = await AsyncStorage.getItem('heightValue');
        const age = await AsyncStorage.getItem('selectedAge');
        const gender = await AsyncStorage.getItem('selectedGender');
        const activityLevel = await AsyncStorage.getItem('selectedLevel');
        const goal = await AsyncStorage.getItem('selectedGoal');

        if (weight && height && age && gender && activityLevel && goal) {
          const weightNum = parseFloat(weight);
          const heightNum = parseFloat(height);
          const ageNum = parseInt(age);
          const activityMultiplier = getActivityMultiplier(activityLevel);

          const bmr = calculateBMR(weightNum, heightNum, ageNum, gender);
          const tdee = bmr * activityMultiplier;
          const calculatedGoalCalories = calculateGoalCalories(tdee, goal);

          setGoalCalories(calculatedGoalCalories);
          // Save the goal calories to AsyncStorage
          await AsyncStorage.setItem('goalCalories', calculatedGoalCalories.toString());
        } else {
          console.error('One or more data items are missing');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getActivityMultiplier = (level) => {
    const activityMultipliers = {
      Sedentary: 1.2,
      LightlyActive: 1.375,
      ModeratelyActive: 1.55,
      VeryActive: 1.725,
      SuperActive: 1.9,
    };
    return activityMultipliers[level] || 1.2;
  };

  const calculateBMR = (weight, height, age, gender) => {
    if (gender === 'Male') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender === 'Female') {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    return 0;
  };

  const calculateGoalCalories = (tdee, goal) => {
    switch (goal) {
      case 'Lose Weight':
        return tdee - 500;
      case 'Gain Weight':
        return tdee + 500;
      case 'Maintain Weight':
        return tdee;
      default:
        return tdee;
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose(); // Close the modal
    }
  };
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Your Goal Calories</Text>
          {goalCalories !== null ? (
            <Text style={styles.result}>{goalCalories.toFixed(2)} Calories/day</Text>
          ) : (
            <Text style={styles.loading}>Calculating...</Text>
          )}
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#141824',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  result: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  loading: {
    fontSize: 18,
    color: '#FD6639',
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#FD6639',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default GoalCalories;
