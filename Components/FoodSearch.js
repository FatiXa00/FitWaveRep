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
      const response = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
        params: {
          query: query,
          api_key: 'veVaIqWcTQBfUokzpUrZZhBE70tpkCk1uMNB1OsV' 
        },
      });
      setResults(response.data.foods);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  const addToMeal = (item) => {
    if (handleAddMealItem) {
      handleAddMealItem(item); 
      navigation.goBack(); 
    }
  };

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
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => addToMeal(item)}>
            <View style={styles.resultContainer}>
              <View style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.description}</Text>
                <Text style={styles.itemAmount}>{item.foodNutrients[0]?.value} {item.foodNutrients[0]?.unitName}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.fdcId.toString()}
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
