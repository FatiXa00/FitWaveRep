import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ProgressBar from 'react-native-progress/Bar';

export default function WorkoutScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const exercises = [
    { name: 'Push Ups', time: 30, image: require('../assets/images/pushups.png') },
    { name: 'Squats', time: 45, image: require('../assets/images/squats.png') },
    { name: 'Plank', time: 60, image: require('../assets/images/plank.png') },
  ];

  const { workoutType = 'General Workout', difficulty = 'Beginner' } = route.params || {};
  
  const [currentExercise, setCurrentExercise] = useState(0);
  const [timer, setTimer] = useState(exercises[0].time);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (timer > 0 && !isPaused) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, isPaused]);

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise((prev) => prev + 1);
      setTimer(exercises[currentExercise + 1].time);
    } else {
      navigation.goBack(); 
    }
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.workoutTitle}>{workoutType}</Text>
      <Text style={styles.difficultyText}>Difficulty: {difficulty}</Text>

      <View style={styles.exerciseContainer}>
        <Image 
          source={exercises[currentExercise].image} 
          style={styles.exerciseImage}
          resizeMode="contain" 
        />
        <Text style={styles.exerciseName}>{exercises[currentExercise].name}</Text>
        <Text style={styles.timerText}>{timer} seconds</Text>
        <ProgressBar 
          progress={(exercises[currentExercise].time - timer) / exercises[currentExercise].time}
          width={300}
          color="#FD6639"
          borderWidth={0}
          style={styles.progressBar}
        />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={handlePauseResume}>
          <Text style={styles.controlButtonText}>{isPaused ? 'Resume' : 'Pause'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={handleNextExercise}>
          <Text style={styles.controlButtonText}>
            {currentExercise < exercises.length - 1 ? 'Next Exercise' : 'Finish'}
          </Text>
          <Icon name="arrow-right" size={16} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  workoutTitle: {
    color: '#FD6639',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  difficultyText: {
    color: '#A9A9A9',
    fontSize: 18,
    marginBottom: 20,
  },
  exerciseContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  exerciseImage: {
    width: 200, 
    height: 150, 
    marginBottom: 20,
  },
  exerciseName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timerText: {
    color: '#A9A9A9',
    fontSize: 18,
    marginBottom: 10,
  },
  progressBar: {
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD6639',
    paddingVertical: 12,
    width: '45%',
    borderRadius: 10,
    marginTop: 10,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  icon: {
    marginLeft: 10,
  },
});
