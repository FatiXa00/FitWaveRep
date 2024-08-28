import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressCircleComponent from './ProgressCircleComponent'; 

const ActivityProgress = ({ caloriesBurned, steps, distance }) => {
  const totalProgress = Math.min(100, (caloriesBurned + steps + distance) / 3); 

  return (
    <View style={styles.container}>
      <View style={styles.metricsContainer}>
        <Text style={styles.title}>Activity</Text>
        <Text style={styles.metricText}>Move: <Text style={styles.metricTextValue}> {caloriesBurned} kcal</Text> </Text>
        <Text style={styles.metricText}>Steps: <Text style={styles.metricStepsValue}>{steps}</Text> </Text> 
        <Text style={styles.metricText}>Distance: <Text style={styles.metricStepsValue}>{distance} km</Text></Text>
      </View>
      <ProgressCircleComponent percentage={totalProgress} size={90} color="#EA4335" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222435',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: 205, 
    height: 170,
    marginVertical: 16,
    alignSelf: 'center',
    bottom:35,
    right:80,
  },
  metricsContainer: {
    flex: 1,
    marginRight: 16, 
  },
  title: {
    color: 'white',
    fontSize: 16, 
    fontWeight: 'bold',
    marginBottom: 8, 
  },
  metricText: {
    color: 'white',
    fontSize: 14, 
    marginBottom: 4,
    fontWeight: 'bold',

  },
  metricTextValue:{
    color: '#EA4335',
  },
  metricStepsValue:{
    color: '#6D6D6D',
  }
});

export default ActivityProgress;
