import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Food = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Food</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => { /* Handle add action */ }}
        >
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MealSummary')}
        >
          <MaterialIcons name="no-meals" size={35} color="white" />
          <Text style={styles.buttonText}>Custom Meals</Text>
          <AntDesign name="down" size={20} color="gray" style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { /* Handle custom recipe */ }}
        >
          <MaterialCommunityIcons name="chef-hat" size={35} color="white" />
          <Text style={styles.buttonText}>Custom Recipe</Text>
          <AntDesign name="down" size={20} color="gray" style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { /* Handle custom food */ }}
        >
          <MaterialCommunityIcons name="food-apple-outline" size={35} color="white" />
          <Text style={styles.buttonText}>Custom Food</Text>
          <AntDesign name="down" size={20} color="gray" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
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
    textAlign: 'center',
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 80,
    borderRadius: 30,
    margin: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222435',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    height:90,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: 10,
    textAlignVertical: 'center',
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#222435',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  arrowIcon: {
    marginLeft: 'auto',
    height:15,
  },
});

export default Food;
