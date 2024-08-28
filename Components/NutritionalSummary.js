import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const NutritionalSummary = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { mealItems } = route.params || {};

  if (!mealItems || mealItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No meal items received.</Text>
      </View>
    );
  }

  const calculateNutrients = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    mealItems.forEach(item => {
      item.foodNutrients.forEach(nutrient => {
        const value = nutrient.value || 0; 
        switch (nutrient.nutrientName) {
          case 'Energy':
            totalCalories += value;
            break;
          case 'Protein':
            totalProtein += value;
            break;
          case 'Carbohydrate, by difference':
            totalCarbs += value;
            break;
          case 'Total lipid (fat)':
            totalFat += value;
            break;
          default:
            console.warn(`Unrecognized nutrient: ${nutrient.nutrientName}`);
            break;
        }
      });
    });

    return { totalCalories, totalProtein, totalCarbs, totalFat };
  };

  const { totalCalories, totalProtein, totalCarbs, totalFat } = calculateNutrients();

  const handleConfirm = () => {
    navigation.navigate('NutritionHome', {
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutritional Summary</Text>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.label}>Total Calories:</Text>
          <Text style={styles.value}>{totalCalories.toFixed(2)} kcal</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.label}>Total Protein:</Text>
          <Text style={styles.value}>{totalProtein.toFixed(2)} g</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.label}>Total Carbohydrates:</Text>
          <Text style={styles.value}>{totalCarbs.toFixed(2)} g</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.label}>Total Fat:</Text>
          <Text style={styles.value}>{totalFat.toFixed(2)} g</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#141824',
    padding: 20,
  },
  title: {
    color: '#FD6639',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  summaryContainer: {
    backgroundColor: '#222435',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  summaryItem: {
    marginBottom: 10,
  },
  label: {
    color: '#777',
    fontSize: 16,
  },
  value: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#FD6639',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NutritionalSummary;
