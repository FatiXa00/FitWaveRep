import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const FoodSearch = () => {
  const data = [
    { id: '1', name: 'Banana, Fresh', amount: '100g - 100.0g' },
    { id: '2', name: 'Raw Egg', amount: '1 large - 50g' },
    { id: '3', name: 'Oat Milk', amount: '1 cup - 160g' },
    { id: '4', name: 'Bread, White', amount: '1g' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemAmount}>{item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#777"
          />
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>🔍</Text>
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
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    marginRight: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: '#1f2730',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  iconButton: {
    marginLeft: 10,
  },
  iconText: {
    color: '#FD6639',
    fontSize: 18,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#1f2730',
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
  },
  resultsHeaderText: {
    color: '#fff',
    fontSize: 18,
  },
  bestMatchText: {
    color: '#FD6639',
    fontSize: 16,
  },
  list: {
    backgroundColor: '#1f2730',
    borderRadius: 10,
    paddingVertical: 10,
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
