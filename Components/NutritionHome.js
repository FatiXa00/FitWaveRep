// NutritionHome.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { Calendar as FullScreenCalendar } from 'react-native-calendars';
import GoalCalories from './GoalCalories';
import { useNavigation } from '@react-navigation/native';
import WaterIntake from './WaterIntake';
import PieChart from './PieChart';
import MealItem from './MealItem'; // Import MealItem component

const NutritionHome = () => {
  const [date, setDate] = useState(new Date());
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showGoalCaloriesModal, setShowGoalCaloriesModal] = useState(false);
  const [goalCalories, setGoalCalories] = useState(0);

  const navigation = useNavigation();

  const handleFullScreenDateChange = (day) => {
    const { dateString } = day;
    const [year, month, dayOfMonth] = dateString.split('-').map(Number);
    const newDate = new Date(Date.UTC(year, month - 1, dayOfMonth));
    setDate(newDate);
    setShowCalendarModal(false);
  };

  useEffect(() => {
    const fetchGoalCalories = async () => {
      try {
        const storedGoalCalories = await AsyncStorage.getItem('goalCalories');
        if (storedGoalCalories) {
          setGoalCalories(parseFloat(storedGoalCalories));
        }
      } catch (error) {
        console.error('Error fetching goal calories:', error);
      }
    };

    fetchGoalCalories();
  }, []);

  const handleGoalCaloriesUpdate = (newGoalCalories) => {
    setGoalCalories(newGoalCalories);
    AsyncStorage.setItem('goalCalories', newGoalCalories.toString()).catch((error) => {
      console.error('Error saving goal calories:', error);
    });
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 200 }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setShowCalendarModal(true)}
        >
          <Text><AntDesign name="calendar" size={24} color="white" /></Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
        <TouchableOpacity style={styles.iconButton} onPress={() => { navigation.navigate('BirthdayPage'); }}>
          <Text><Entypo name="dots-three-horizontal" size={24} color="white" /></Text>
        </TouchableOpacity>
      </View>

      <View style={styles.circleContainer}>
        <PieChart
          burn={306}
          eaten={500}
        />
      </View>
      <Text style={styles.goalText}>{goalCalories.toFixed(2)} Kcal Goal</Text>

      <WaterIntake />

      <View style={styles.mealContainer}>
      <View style={styles.dailyTextContainer}>
          <Text style={styles.dailyText}>Daily Meals</Text>
          <TouchableOpacity style={styles.EditIcon}>
            <AntDesign name="edit" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <MealItem label="Breakfast" kcal="306" recommendedKcal="447" color="#FF6F61" />
        <MealItem label="Lunch" kcal="-" recommendedKcal="547" color="#6B5B95" />
        <MealItem label="Dinner" kcal="-" recommendedKcal="547" color="#88B04B" />
        <MealItem label="Snack" kcal="-" recommendedKcal="447" color="#F7CAC9" />
      </View>

      <Modal
        visible={showCalendarModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCalendarModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <FullScreenCalendar
              onDayPress={handleFullScreenDateChange}
              markedDates={{
                [date.toISOString().split('T')[0]]: { selected: true, selectedColor: '#FD6639' },
              }}
            />
            <TouchableOpacity
              onPress={() => setShowCalendarModal(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        animationType="slide"
        visible={showGoalCaloriesModal}
        onRequestClose={() => setShowGoalCaloriesModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Your Goal Calories</Text>
            <GoalCalories
              currentGoalCalories={goalCalories}
              onGoalCaloriesUpdate={handleGoalCaloriesUpdate}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowGoalCaloriesModal(false)}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
    padding: 30,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top:25,
  },
  iconButton: {
    padding: 10,
  },
  dateText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  goalText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  mealContainer: {
    marginTop: 50,
  },
  dailyTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dailyText: {
    color: 'white',
    fontSize: 18,
    margin: 5,
    bottom: 8,
  },
  EditIcon: {
    backgroundColor: '#222435',
    padding: 10,
    borderRadius: 8,
    bottom:8,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
    padding: 20,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FD6639',
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: '#22252A',
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalCloseButton: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default NutritionHome;
