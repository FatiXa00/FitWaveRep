import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const MealSummary = () => {
  const [mealItems, setMealItems] = useState([]);
  const [mealName, setMealName] = useState('');
  const navigation = useNavigation();

  // This function will be triggered when navigating back from the search screen
  const handleAddMealItem = (item) => {
    setMealItems([...mealItems, item]);
  };

  // Function to handle validation and navigation
  const handleNavigateToSearch = () => {
    if (mealName.trim() === '') {
      Alert.alert('Required', 'Please enter a meal name.');
    } else {
      navigation.navigate('FoodSearch', { handleAddMealItem });
    }
  };

  // Function to handle "Next" button press with meal name validation
  const handleNext = () => {
    if (mealName.trim() === '') {
      Alert.alert('Required', 'Please enter a meal name.');
    } else if (mealItems.length === 0) {
      Alert.alert('Empty Meal', 'Please add at least one meal item.');
    } else {
      // Add your navigation or next steps here
      Alert.alert('Proceed', 'You can now proceed to the next step.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Create Meal</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => { /* Handle add action */ }}
        >
          <AntDesign name="" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* TextInput for the meal name */}
      <TextInput
        style={styles.mealNameInput}
        placeholder="Meal Name (Required)"
        placeholderTextColor="#777"
        value={mealName}
        onChangeText={setMealName}
      />

      <View style={styles.mealContainer}>
        {/* Button to add a new meal item */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleNavigateToSearch}
        >
          <Ionicons name="add-circle" size={24} color="#FD6639" />
          <Text style={styles.addButtonText}>Add Meal Item</Text>
        </TouchableOpacity>

        {/* Display the list of added meal items */}
        <FlatList
          data={mealItems}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.description}</Text>
              <Text style={styles.itemAmount}>{item.foodNutrients[0]?.value} {item.foodNutrients[0]?.unitName}</Text>
            </View>
          )}
          keyExtractor={(item) => item.fdcId.toString()}
        />
      </View>

      {/* Next button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    top: 60,
  },
  iconButton: {
    width: 50,
    height: 50,
    backgroundColor: '#222435',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    flex: 1,
    left: 15,
  },
  mealNameInput: {
    backgroundColor: '#222435',
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 20,
    top: 55,
  },
  mealContainer: {
    backgroundColor: '#222435',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    top: 55,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FD6639',
    fontSize: 16,
    marginLeft: 10,
  },
  itemContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  itemName: {
    color: '#fff',
    fontSize: 16,
  },
  itemAmount: {
    color: '#777',
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: '#FD6639',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 20,
    width: '50%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 60,
    right: 25,
  },
  nextButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MealSummary;
