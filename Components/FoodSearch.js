import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const FoodSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]); 
  const navigation = useNavigation();
  const route = useRoute();
  const { handleAddMealItem } = route.params || {};

  const searchFood = async () => {
    try {
      const response = await axios.get('https://api.edamam.com/api/food-database/v2/parser', {
        params: {
          app_id: 'da101ed7',
          app_key: '6d9fb233c862a3f4354f742f91ff815d',
          ingr: query,
          nutritionType: 'logging',
        },
      });
      setResults(response.data.hints.map(hint => ({
        ...hint.food,
        foodId: hint.food.foodId || Math.random().toString() 
      })));
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  const addToMeal = (item) => {
    navigation.navigate('NutritionData', {
      foodItem: item,
      handleAddMealItem,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => addToMeal(item)}>
      <View style={styles.resultContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>{item.label}</Text>
          <Text style={styles.itemAmount}>{item.nutrients.ENERC_KCAL} kcal</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#777"
          onChangeText={setQuery}
          value={query}
        />
        <TouchableOpacity style={styles.iconButton} onPress={searchFood}>
          <Ionicons name="search" size={24} color="#FD6639" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanButton} onPress={() => navigation.navigate('ScanBarcodeScreen')}>
          <Ionicons name="scan-outline" size={24} color="#FD6639" />
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButtonActive}>
          <Text style={styles.filterButtonTextActive}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Custom</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsHeaderText}>Results</Text>
        <Text style={styles.bestMatchText}>Best Match</Text>
      </View>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.foodId ? item.foodId.toString() : Math.random().toString()} 
      />
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
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 15,
    top:35,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#222435',
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8 ,
  },
  iconButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#222435',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#222435',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    top:15,
  },
  filterButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#222435',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#fff',
  },
  filterButtonActive: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FD6639',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    top:5,
  },
  resultsHeaderText: {
    color: '#fff',
    fontSize: 16,
  },
  bestMatchText: {
    color: '#FD6639',
    fontSize: 16,
  },
  resultContainer:{
    backgroundColor: '#222435',
    top:18,
    borderRadius:8,
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
});

export default FoodSearch;
