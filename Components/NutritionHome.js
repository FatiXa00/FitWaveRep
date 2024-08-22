import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { Calendar as FullScreenCalendar } from 'react-native-calendars';
import GoalCalories from './GoalCalories';
import { useNavigation } from '@react-navigation/native';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PieChart from './PieChart';

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setShowCalendarModal(true)}
        >
          <Text><AntDesign name="calendar" size={24} color="white" /></Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
        <TouchableOpacity style={styles.iconButton}onPress={() => {navigation.navigate('BirthdayPage');}}>
          <Text><Entypo name="dots-three-horizontal" size={24} color="white" /></Text>
        </TouchableOpacity>
      </View>

      <View style={styles.circleContainer}>
    <PieChart
    burn={100}
    eaten={200}
    />
    </View>
<Text style={styles.goalText}>{goalCalories.toFixed(2)}Kcal Goal</Text>

      <View style={styles.waterContainer}>
        <Text style={styles.waterText}>Water 0.9L (75%)</Text>
        <Text style={styles.subWaterText}>Recommended until now 1.4L</Text>
        <View style={styles.waterSliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1.4}
            value={0.9}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#4C4C4C"
            thumbTintColor="#007AFF"
          />
          <Text style={styles.waterLabelText}>0.0L</Text>
          <Text style={styles.waterLabelText}>0.2L</Text>
        </View>
      </View>

      <View style={styles.mealContainer}>
        <MealItem label="Breakfast" kcal="306" recommendedKcal="447" color="#00FF88" />
        <MealItem label="Lunch" kcal="-" recommendedKcal="547" color="#FFBB00" />
        <MealItem label="Dinner" kcal="-" recommendedKcal="547" color="#007AFF" />
        <MealItem label="Snack" kcal="-" recommendedKcal="447" color="#FF4F4F" />
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

const MealItem = ({ label, kcal, recommendedKcal, color }) => {
  return (
    <View style={[styles.mealItem, { borderColor: color }]}>
      <Text style={[styles.mealLabel, { color }]}>{label} {kcal} Kcal</Text>
      <Text style={styles.recommendedText}>Recommended {recommendedKcal} Kcal</Text>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
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
    marginBottom: 20,
    top:30,
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
  burnText: {
    color: '#FFBB00',
    fontSize: 16,
    textAlign: 'center',
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 10,
    borderColor: '#FD6639',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#22252A',
  },
  caloriesText: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  subText: {
    color: '#FFF',
    fontSize: 14,
  },
  eatenText: {
    color: '#00FF88',
    fontSize: 16,
    textAlign: 'center',
  },
  goalText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  waterContainer: {
    marginTop: 20,
    backgroundColor: '#1C1E25',
    borderRadius: 10,
    padding: 15,
  },
  waterText: {
    color: '#007AFF',
    fontSize: 16,
  },
  subWaterText: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
  },
  waterSliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  slider: {
    flex: 1,
    height: 20,
  },
  waterLabelText: {
    color: '#007AFF',
    fontSize: 14,
    width: 50,
    textAlign: 'center',
  },
  mealContainer: {
    marginTop: 20,
  },
  mealItem: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  mealLabel: {
    fontSize: 18,
  },
  recommendedText: {
    fontSize: 14,
    color: '#FFF',
  },
  addButton: {
    backgroundColor: '#FD6639',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
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
