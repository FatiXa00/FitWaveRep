import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const [waterIntakeGoal, setWaterIntakeGoal] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedGoal = await AsyncStorage.getItem('waterIntakeGoal');
        if (savedGoal !== null) {
          setWaterIntakeGoal(savedGoal);
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };
    loadSettings();
  }, []);

  const handleSelectGoal = async (goal) => {
    try {
      await AsyncStorage.setItem('waterIntakeGoal', goal);
      setWaterIntakeGoal(goal);
      setModalVisible(false);
      // Pass the updated goal to WaterIntake via navigation or state
      navigation.navigate('WaterIntake', { goal });
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  return (
    <ImageBackground
      source={require('../assets/images/BackgroundWater.jpeg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Water Goal</Text>
        <TouchableOpacity onPress={showModal} style={styles.button}>
          <Text style={styles.buttonText}>{waterIntakeGoal ? `${waterIntakeGoal} liters` : 'Select Goal'}</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Select Water Intake Goal</Text>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <Button
                  key={num}
                  title={`${num} liters`}
                  onPress={() => handleSelectGoal(`${num}`)}
                />
              ))}
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FD6639',
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Settings;
