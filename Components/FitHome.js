import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function FitHome() {
  const [showAllExercises, setShowAllExercises] = useState(false);
  const navigation = useNavigation();

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  const allExercises = [
    "Push Ups", "Running", "Yoga Pose", "Squats", "Plank", "Lunges", "Burpees",
    "Crunches", "Mountain Climbers", "Jumping Jacks", "High Knees", "Tricep Dips",
    "Bicycle Crunches", "Leg Raises", "Side Plank", "Russian Twists", "Glute Bridges",
    "Wall Sit", "Flutter Kicks", "Skaters", "Hip Thrusts"
  ];


  const displayedExercises = showAllExercises ? allExercises : allExercises.slice(0, 10);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={styles.greeting}>Hi, Fati</Text>
          <Text style={styles.subGreeting}>What do you Workout today?</Text>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity>
            <FontAwesome name="search" size={22} color="#FD6639" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="bell" size={22} color="#FD6639" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('Settings')}>
            <FontAwesome5 name="user-circle" size={22} color="#FD6639" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.startContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.startText}>Start practicing {'\n'} your workout!</Text>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Start</Text>
            <Icon name="arrow-right" size={16} color="#fff" style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../assets/images/backgroundFitHome.png')}
          style={styles.workoutImage}
        />
      </View>

      <View style={styles.categoriesHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesSection}>
        <CategoryItem name="Cardio" icon="running" />
        <CategoryItem name="Strength" icon="dumbbell" />
        <CategoryItem name="Yoga" icon="spa" />
        <CategoryItem name="Swimming" icon="swimmer" />
        <CategoryItem name="Cycling" icon="bicycle" />
        <CategoryItem name="Boxing" icon="boxing-glove" />
        <CategoryItem name="Tennis" icon="table-tennis" />
        <CategoryItem name="Football" icon="football-ball" />
        <CategoryItem name="Basketball" icon="basketball-ball" />
        <CategoryItem name="Baseball" icon="baseball-ball" />
        <CategoryItem name="Volleyball" icon="volleyball-ball" />
        <CategoryItem name="Golf" icon="golf-ball" />
        <CategoryItem name="Rowing" icon="water" />
        <CategoryItem name="Martial Arts" icon="hand-rock" />
        <CategoryItem name="Climbing" icon="mountain" />
        <CategoryItem name="CrossFit" icon="heartbeat" />
        <CategoryItem name="Pilates" icon="leaf" />
        <CategoryItem name="Dancing" icon="music" />
        <CategoryItem name="Skiing" icon="skiing" />
        <CategoryItem name="Snowboarding" icon="snowboarding" />
      </ScrollView>

      <View style={styles.ExercicesHeader}>
        <Text style={styles.sectionTitle}>Daily Exercises</Text>
        <TouchableOpacity onPress={() => setShowAllExercises(!showAllExercises)}>
          <Text style={styles.seeAllText}>{showAllExercises ? 'Show Less' : 'See All'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.dailyExercisesSection} contentContainerStyle={{ paddingBottom: 200 }}>
        {displayedExercises.map((exercise, index) => (
          <ExerciseItem key={index} name={exercise} />
        ))}
      </ScrollView>
    </View>
  );
}

const CategoryItem = ({ name, icon }) => (
  <View style={styles.categoryItem}>
    <TouchableOpacity>
      <Icon name={icon} size={25} color="#FD6639" />
    </TouchableOpacity>
    <Text style={styles.categoryName}>{name}</Text>
  </View>
);

const ExerciseItem = ({ name }) => (
  <TouchableOpacity style={styles.exerciseItem}>
    <Text style={styles.exerciseName}>{name}</Text>
    <Icon name="chevron-right" size={20} color="#FD6639" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    top: 20,
  },
  headerContainer: {
    flexDirection: 'column',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginHorizontal: 8,
  },
  greeting: {
    color: '#FD6639',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subGreeting: {
    color: '#A9A9A9',
    fontSize: 16,
  },
  startContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    backgroundColor: '#222435',
    padding: 15,
    borderRadius: 25,
    top: 25,
    marginBottom: 55,
  },
  textContainer: {
    flex: 1,
    marginRight: 20,
    margin: 10,
  },
  startText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  workoutImage: {
    width: 120,
    height: 130,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    width: 120,
    borderRadius: 10,
    marginTop: 10,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  arrowIcon: {
    marginLeft: 10,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoriesSection: {
    marginBottom: 15,
    height: 180,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#FD6639',
    fontSize: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryName: {
    color: '#fff',
    marginTop: 5,
  },
  ExercicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dailyExercisesSection: {
    marginBottom: 100,
  },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2E2F34',
  },
  exerciseName: {
    color: '#fff',
    fontSize: 18,
  },
});
