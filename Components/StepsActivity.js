import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressCircleComponent from './ProgressCircleComponent';

const StepsActivity = () => {
  const [steps, setSteps] = useState(87); 
  const [distance, setDistance] = useState(1.2); 
  const [calories, setCalories] = useState(87); 

  const goalCalories = 300;

  const percentage = (calories / goalCalories) * 100;

  return (
    <View style={styles.activityContainer}>
      <Text style={styles.activityTitle}>Today's Activity</Text>
      <View style={styles.circleRow}>
        <View style={styles.circleContainer}>
          <ProgressCircleComponent percentage={percentage} size={100} color="#FF6347" />
          <Text style={styles.circleLabel}>{`${calories}/${goalCalories} kcal`}</Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>{`Steps: ${steps}`}</Text>
          <Text style={styles.statsText}>{`Distance: ${distance} km`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#222435',
    borderRadius: 16,
    width: 360,
  },
  activityTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  circleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  circleContainer: {
    alignItems: 'center',
  },
  circleLabel: {
    color: 'white',
    marginTop: 8,
  },
  statsContainer: {
    justifyContent: 'center',
  },
  statsText: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 4,
  },
});

export default StepsActivity;
