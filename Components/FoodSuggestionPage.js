import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FoodSuggestionPage = ({ navigation }) => {
  const [breakfastMeals, setBreakfastMeals] = useState([]);
  const [lunchMeals, setLunchMeals] = useState([]);
  const [dinnerMeals, setDinnerMeals] = useState([]);
  const [dessertMeals, setDessertMeals] = useState([]);

  useEffect(() => {
    fetchMeals('Breakfast', setBreakfastMeals);
    fetchMeals('Seafood', setLunchMeals); 
    fetchMeals('Beef', setDinnerMeals);
    fetchMeals('Dessert', setDessertMeals);
  }, []);

  const fetchMeals = async (category, setMealState) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      setMealState(data.meals);
    } catch (error) {
      console.error(`Error fetching ${category} meals:`, error);
    }
  };

  const viewRecipe = (mealId) => {
    navigation.navigate('RecipeDetailPage', { recipeId: mealId });
  };

  const renderMealSection = (title, meals) => (
    <View style={styles.mealSection}>
      <Text style={styles.sectionHeader}>{title}</Text>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.mealCard} onPress={() => viewRecipe(item.idMeal)}>
            <Image source={{ uri: item.strMealThumb }} style={styles.mealImage} />
            <Text style={styles.mealTitle}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.header}>Discover Delicious Meals</Text>
      {renderMealSection('🍳 Breakfast', breakfastMeals)}
      {renderMealSection('🥗 Lunch', lunchMeals)}
      {renderMealSection('🍖 Dinner', dinnerMeals)}
      {renderMealSection('🍰 Dessert', dessertMeals)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
    padding: 20,
  },
  backButton: {
    marginBottom: 50,
    top: 40,
  },
  header: {
    color: '#FD6639',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 1,
  },
  mealSection: {
    marginBottom: 30,
  },
  sectionHeader: {
    color: '#FF8C69',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingLeft: 10,
  },
  mealCard: {
    backgroundColor: '#222435',
    borderRadius: 15,
    padding: 10,
    marginRight: 15,
    alignItems: 'center',
    width: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 8,
  },
  mealImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginBottom: 10,
  },
  mealTitle: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default FoodSuggestionPage;
