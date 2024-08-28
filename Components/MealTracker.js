import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const MealTracker = () => {
  const [meal, setMeal] = useState('');
  const [mealList, setMealList] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  const fetchMealData = async () => {
    const apiKey = 'a1686d5082666cc09c8569a72ba977c6';
    const appId = '9f936287';

    try {
      const response = await fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': appId,
          'x-app-key': apiKey,
        },
        body: JSON.stringify({ query: meal }),
      });

      const data = await response.json();

      if (data.foods && data.foods.length > 0) {
        const mealData = data.foods[0];
        setMealList([...mealList, mealData]);
        setTotalCalories(totalCalories + mealData.nf_calories);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddMeal = () => {
    fetchMealData();
    setMeal('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Tracker</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter meal (e.g., 1 cup of rice)"
        value={meal}
        onChangeText={setMeal}
      />
      
      <Button title="Add Meal" onPress={handleAddMeal} />
      
      <Text style={styles.totalCalories}>Total Calories: {totalCalories.toFixed(2)}</Text>
      
      <FlatList
        data={mealList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.mealItem}>
            <Text>{item.food_name}</Text>
            <Text>{item.nf_calories.toFixed(2)} calories</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  totalCalories: {
    fontSize: 20,
    marginVertical: 16,
    textAlign: 'center',
  },
  mealItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default MealTracker;
