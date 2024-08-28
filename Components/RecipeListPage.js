// RecipeListPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';

const RecipeListPage = ({ navigation }) => {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMeals();
  }, []);

  useEffect(() => {
    filterMeals();
  }, [searchQuery, meals]);

  const fetchMeals = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'); 
      const data = await response.json();
      setMeals(data.meals);
      setFilteredMeals(data.meals);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  const filterMeals = () => {
    if (searchQuery === '') {
      setFilteredMeals(meals);
    } else {
      const filtered = meals.filter((meal) =>
        meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMeals(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recipes</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search recipes..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={filteredMeals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RecipeDetailPage', { recipeId: item.idMeal })}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.title}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#FFF',
    marginBottom: 16,
    backgroundColor: '#22252A',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22252A',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
});

export default RecipeListPage;
