import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

const MealSummary = () => {
  const [mealItems, setMealItems] = useState([]);
  const [mealName, setMealName] = useState('');
  const [expandedItemId, setExpandedItemId] = useState(null);
  const navigation = useNavigation();

  const handleAddMealItem = (item) => {
    setMealItems([...mealItems, item]);
  };

  const handleNavigateToSearch = () => {
    if (mealName.trim() === '') {
      Alert.alert('Required', 'Please enter a meal name.');
    } else {
      navigation.navigate('FoodSearch', { handleAddMealItem });
    }
  };

  const handleNext = () => {
    if (mealName.trim() === '') {
      Alert.alert('Required', 'Please enter a meal name.');
    } else if (mealItems.length === 0) {
      Alert.alert('Empty Meal', 'Please add at least one meal item.');
    } else {
      navigation.navigate('NutritionalSummary', { mealItems });
    }
  };

  const handleDelete = (itemToDelete) => {
    setMealItems(mealItems.filter(item => item.fdcId !== itemToDelete.fdcId));
  };

  const toggleExpand = (itemId) => {
    setExpandedItemId(expandedItemId === itemId ? null : itemId);
  };

  const renderItem = ({ item }) => (
    <Swipeable
      onSwipeableRightOpen={() => handleDelete(item)}
      renderRightActions={() => (
        <View style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Deleting...</Text>
        </View>
      )}
    >
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => toggleExpand(item.fdcId)}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemName}>{item.description}</Text>
            <AntDesign name="down" size={20} color="gray" style={styles.arrowIcon} />

          </View>
        </TouchableOpacity>
        {expandedItemId === item.fdcId && (
          <View style={styles.nutrientList}>
            {item.foodNutrients.map(nutrient => (
              <Text key={nutrient.nutrientName} style={styles.nutrientText}>
                {nutrient.nutrientName}: {nutrient.value} {nutrient.unitName}
              </Text>
            ))}
          </View>
        )}
      </View>
    </Swipeable>
  );

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
          onPress={() => { }}
        >
          <AntDesign name="" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.mealNameInput}
        placeholder="Meal Name (Required)"
        placeholderTextColor="#777"
        value={mealName}
        onChangeText={setMealName}
      />

      <View style={styles.mealContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleNavigateToSearch}
        >
          <Ionicons name="add-circle" size={24} color="#FD6639" />
          <Text style={styles.addButtonText}>Add Meal Item</Text>
        </TouchableOpacity>

        <FlatList
          data={mealItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.fdcId.toString()}
        />
      </View>

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
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    color: '#fff',
    fontSize: 16,
  },
  nutrientList: {
    marginTop: 10,
  },
  nutrientText: {
    color: '#777',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#FF4D4D',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5,
    width: 80,
    height: 35,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
