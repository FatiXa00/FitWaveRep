import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MealItem = ({ label, kcal, recommendedKcal, color }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={[styles.leftLine, { backgroundColor: color }]} />
      <View style={styles.mealContent}>
        <Text style={[styles.mealLabel, { color: color }]}>
          {label} <Text style={styles.mealLabelColor}>{kcal} Kcal</Text>
        </Text>
        <Text style={styles.recommendedText}>Recommended {recommendedKcal} Kcal</Text>
        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Food')}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#222435',
    overflow: 'hidden',
  },
  leftLine: {
    width: 10,
    height: '100%',
  },
  mealContent: {
    flex: 1,
    padding: 15,
  },
  mealLabel: {
    fontSize: 18,
    color: '#FFF',
  },
  mealLabelColor: {
    color: 'white',
    fontSize: 16,
  },
  recommendedText: {
    fontSize: 12,
    color: 'gray',
  },
  rightContainer: {
    alignItems: 'flex-end',
    marginTop: -10,
  },
  addButton: {
    backgroundColor: '#FD6639',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  addButtonText: {
    color: '#222435',
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MealItem;
