// RecipeDetailPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const RecipeDetailPage = ({ route, navigation }) => {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipeDetail();
  }, []);

  const fetchRecipeDetail = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const data = await response.json();
      setRecipe(data.meals[0]);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{recipe.strMeal}</Text>
      <Text style={styles.subtitle}>Category: {recipe.strCategory}</Text>
      <Text style={styles.subtitle}>Cuisine: {recipe.strArea}</Text>
      <Text style={styles.sectionTitle}>Ingredients</Text>
      <Text style={styles.text}>
        {Object.keys(recipe)
          .filter((key) => key.startsWith('strIngredient') && recipe[key])
          .map((key) => `${recipe[key]} - ${recipe[`strMeasure${key.slice(13)}`]}`)
          .join('\n')}
      </Text>
      <Text style={styles.sectionTitle}>Instructions</Text>
      <Text style={styles.text}>{recipe.strInstructions}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtitle: {
    color: '#AAA',
    fontSize: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    color: '#FD6639',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    color: '#FFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FD6639',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default RecipeDetailPage;
