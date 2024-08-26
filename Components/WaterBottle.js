import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WaterBottle = () => {
  const totalSections = 6; 
  const [waterLevel, setWaterLevel] = useState(0); 
  const [waterIntakeGoal, setWaterIntakeGoal] = useState(2); 

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

  const addWater = () => {
    setWaterLevel((prev) => Math.min(prev + 0.5, waterIntakeGoal)); 
  };

  const removeWater = () => {
    setWaterLevel((prev) => Math.max(prev - 0.5, 0)); 
  };

  const renderBottleSections = () => {
    const sections = [];
    for (let i = totalSections - 1; i >= 0; i--) { // Reverse order
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
        {/* Bottle head */}
        <View style={styles.bottleHead} />
        {/* Bottle sections */}
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
