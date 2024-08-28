import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PieChart = ({ burn, eaten }) => {
  const [goalCalories, setGoalCalories] = useState(2000); 

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

  const remaining = goalCalories - (burn + eaten);
  const burnPercentage = (burn / goalCalories) * 100;
  const eatenPercentage = (eaten / goalCalories) * 100;
  const remainingPercentage = (remaining / goalCalories) * 100;

  const burnStroke = (burnPercentage / 100) * 360;
  const eatenStroke = (eatenPercentage / 100) * 360;
  const remainingStroke = (remainingPercentage / 100) * 360;

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Text style={styles.burnText}>
          <Fontisto name="fire" size={24} />{'\n'}
          {burn}{'\n'}burn
        </Text>
        <View style={styles.circle}>
          <Svg height="160" width="160" viewBox="0 0 36 36">
            <Circle
              cx="18"
              cy="18"
              r="15.915"
              fill="none"
              stroke="#ddd"
              strokeWidth="3.5"
            />
            <Circle
              cx="18"
              cy="18"
              r="15.915"
              fill="none"
              stroke="#FFBB00" 
              strokeWidth="3.5"
              strokeDasharray={`${burnStroke} ${360 - burnStroke}`}
              strokeDashoffset="25"
              strokeLinecap="round"
            />
            <Circle
              cx="18"
              cy="18"
              r="15.915"
              fill="none"
              stroke="#00FF88" 
              strokeWidth="3.5"
              strokeDasharray={`${eatenStroke} ${360 - eatenStroke}`}
              strokeDashoffset={25 + burnStroke}
              strokeLinecap="round"
            />
          
          </Svg>
          <View style={styles.textContainer}>
            <Text style={styles.caloriesText}>{remaining.toFixed(2)}</Text>
            <Text style={styles.subText}>Kcal available</Text>
          </View>
        </View>
        <Text style={styles.eatenText}>
          <MaterialCommunityIcons name="silverware-fork-knife" size={24} />{'\n'}
          {eaten}{'\n'}eaten
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  circleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 15, 
  },
  burnText: {
    color: '#FFBB00',
    textAlign: 'center',
    fontSize: 16,
    width: 70, 
    right:15,
  },
  eatenText: {
    color: '#00FF88',
    textAlign: 'center',
    fontSize: 16,
    width: 70, 
    left:15,
  },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141824',
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  caloriesText: {
    fontSize: 24,
    color: '#FD6639',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 12,
    color: 'gray',
  },
});

/*<Circle
cx="18"
cy="18"
r="15.915"
fill="none"
stroke="#1E90FF"
strokeWidth="3.5"
strokeDasharray={`${remainingStroke} ${360 - remainingStroke}`}
strokeDashoffset={25 + burnStroke + eatenStroke}
strokeLinecap="round"
/>*/

export default PieChart;
