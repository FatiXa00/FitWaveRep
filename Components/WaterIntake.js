// WaterIntake.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Install this library for icons
import AsyncStorage from '@react-native-async-storage/async-storage';

const WaterIntake = () => {
  const [currentWaterIntake, setCurrentWaterIntake] = useState(0.9);
  const [waterIntakeGoal, setWaterIntakeGoal] = useState(1.4); // Default goal

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedGoal = await AsyncStorage.getItem('waterIntakeGoal');
        if (savedGoal !== null) {
          setWaterIntakeGoal(parseFloat(savedGoal));
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };

    loadSettings();
  }, []);

  const handleIncrement = () => {
    if (currentWaterIntake + 0.2 <= waterIntakeGoal) {
      setCurrentWaterIntake(currentWaterIntake + 0.2);
    }
  };

  const handleDecrement = () => {
    if (currentWaterIntake - 0.2 >= 0) {
      setCurrentWaterIntake(currentWaterIntake - 0.2);
    }
  };

  const percentage = Math.round((currentWaterIntake / waterIntakeGoal) * 100);
  const dropletCount = Math.round((currentWaterIntake / waterIntakeGoal) * 7);
  
  // Calculate the remaining recommended amount based on the water taken
  const remainingGoal = waterIntakeGoal - currentWaterIntake;
  const remainingPercentage = Math.round((remainingGoal / waterIntakeGoal) * 100);

  return (
    <View style={styles.container}>
      <View style={[styles.leftLine, { backgroundColor: '#007AFF' }]} />
      <View style={styles.contentContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.waterText}>
            Water <Text style={styles.waterTextColor}> {currentWaterIntake.toFixed(1)}L ({percentage}%)
          </Text></Text>
          <Text style={styles.recommendedText}>
            Recommended until now {remainingGoal.toFixed(1)}L ({remainingPercentage}%)
          </Text>
          <View style={styles.dropletContainer}>
            {[...Array(7)].map((_, index) => (
              <Icon
                key={index}
                name="water"
                size={20}
                color={index < dropletCount ? '#007AFF' : '#d3d3d3'} // Blue for filled droplets, gray for empty
                style={styles.dropletIcon}
              />
            ))}
          </View>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDecrement}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.waterAmountText}>{currentWaterIntake.toFixed(1)}L</Text>
          <TouchableOpacity style={styles.button} onPress={handleIncrement}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    backgroundColor: '#222435',
    height:'12%',
    top: 15,
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden', 
  },
  leftLine: {
    width: 10, 
    height: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, 
    justifyContent: 'space-between',
  },
  leftContainer: {
    flex: 1,
    left:10,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    right:8,
  },
  waterText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  waterTextColor: {
    color: 'white',
  },
  recommendedText: {
    color: '#d3d3d3',
    fontSize: 10,
    marginVertical: 5,
  },
  dropletContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dropletIcon: {
    marginHorizontal: 3,
  },
  button: {
    backgroundColor: '#FD6639',
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#141824',
    fontSize: 15,
    fontWeight: 'bold',
  },
  waterAmountText: {
    color: '#FD6639',
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default WaterIntake;
