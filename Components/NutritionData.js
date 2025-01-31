import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const NutritionInfo = () => {
  const route = useRoute();
  const { foodItem, handleAddMealItem } = route.params || {};
  const [quantity, setQuantity] = useState('');
  const [measurementType, setMeasurementType] = useState('grams');
  const [nutrients, setNutrients] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (!foodItem) {
      navigation.goBack();
    } else {
      fetchNutritionalData(foodItem.foodId);
    }
  }, [foodItem, navigation]);

  const fetchNutritionalData = async (foodId) => {
    try {
      const response = await axios.post(`https://api.edamam.com/api/food-database/v2/nutrients`, {
        ingredients: [{ quantity: 100, measure: 'g', foodId: foodId }],
      }, {
        params: {
          app_id: 'da101ed7',
          app_key: '6d9fb233c862a3f4354f742f91ff815d',
        },
      });
      setNutrients(response.data.totalNutrients);
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
    }
  };

  const measurementConversions = {
    grams: 1, 
    milliliters: 1,
    cups: 237, 
    ounces: 28.35, 
    tablespoons: 15, 
    teaspoons: 5, 
  };

  const calculateNutrients = (nutrients) => {
    const factor = (parseFloat(quantity) || 0) * (measurementConversions[measurementType] / 100);

    return {
      calories: nutrients?.ENERC_KCAL?.quantity ? nutrients.ENERC_KCAL.quantity * factor : 0,
      protein: nutrients?.PROCNT?.quantity ? nutrients.PROCNT.quantity * factor : 0,
      fat: nutrients?.FAT?.quantity ? nutrients.FAT.quantity * factor : 0,
      carbs: nutrients?.CHOCDF?.quantity ? nutrients.CHOCDF.quantity * factor : 0,
      fiber: nutrients?.FIBTG?.quantity ? nutrients.FIBTG.quantity * factor : 0,
      sugar: nutrients?.SUGAR?.quantity ? nutrients.SUGAR.quantity * factor : 0,
      sodium: nutrients?.NA?.quantity ? nutrients.NA.quantity * factor : 0,
      cholesterol: nutrients?.CHOLE?.quantity ? nutrients.CHOLE.quantity * factor : 0,
      calcium: nutrients?.CA?.quantity ? nutrients.CA.quantity * factor : 0,
      iron: nutrients?.FE?.quantity ? nutrients.FE.quantity * factor : 0,
      potassium: nutrients?.K?.quantity ? nutrients.K.quantity * factor : 0,
      vitaminC: nutrients?.VITC?.quantity ? nutrients.VITC.quantity * factor : 0,
      vitaminD: nutrients?.VITD?.quantity ? nutrients.VITD.quantity * factor : 0,
      vitaminE: nutrients?.TOCPHA?.quantity ? nutrients.TOCPHA.quantity * factor : 0,
      vitaminK: nutrients?.VITK1?.quantity ? nutrients.VITK1.quantity * factor : 0,
      folate: nutrients?.FOLDFE?.quantity ? nutrients.FOLDFE.quantity * factor : 0,
      magnesium: nutrients?.MG?.quantity ? nutrients.MG.quantity * factor : 0,
      zinc: nutrients?.ZN?.quantity ? nutrients.ZN.quantity * factor : 0,
    };
  };

  const addToMeal = () => {
    const calculatedNutrients = calculateNutrients(nutrients);
    if (handleAddMealItem) {
      handleAddMealItem({
        description: foodItem.label,
        fdcId: foodItem.foodId,
        foodNutrients: calculatedNutrients,
        quantity: parseFloat(quantity) || 0,
        measurementType,
      });
    
      navigation.navigate('MealSummary'); 
    }
  };

  return (
    <ScrollView style={styles.container}contentContainerStyle={{ paddingBottom: 100 }}>
      {foodItem && nutrients && (
        <View style={styles.content}>
          <Text style={styles.foodName}>{foodItem.label}</Text>
          <Text style={styles.nutrientTitle}>Nutritional Information per {quantity} {measurementType}</Text>

          <View style={styles.nutrientSection}>
            {Object.entries(calculateNutrients(nutrients)).map(([key, value]) => (
              <View key={key} style={styles.nutrientContainer}>
                <Text style={styles.nutrientLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                <Text style={styles.nutrientValue}>{value.toFixed(1)} {key === 'calories' ? 'kcal' : 'g'}</Text>
              </View>
            ))}
          </View>

          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            placeholder="Enter Quantity"
            placeholderTextColor="grey"  
            value={quantity}
            onChangeText={(value) => setQuantity(value)}
          />


          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Choose Measurement</Text>
            <Picker
              selectedValue={measurementType}
              style={styles.picker}
              onValueChange={(itemValue) => setMeasurementType(itemValue)}
            >
              <Picker.Item label="Grams (g)" value="grams" color='white' />
              <Picker.Item label="Milliliters (ml)" value="milliliters" color='white'/>
              <Picker.Item label="Cups" value="cups" color='white'/>
              <Picker.Item label="Ounces (oz)" value="ounces" color='white'/>
              <Picker.Item label="Tablespoons (tbsp)" value="tablespoons" color='white'/>
              <Picker.Item label="Teaspoons (tsp)" value="teaspoons" color='white' />
            </Picker>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={addToMeal}>
            <Text style={styles.addButtonText}>ADD TO RECIPE</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
    padding: 20,
  },
  content: {
    flex: 1,
    top:40,
  },
  foodName: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nutrientTitle: {
    fontSize: 16,
    color: '#A1A1A1',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  nutrientSection: {
    marginBottom: 20,
  },
  nutrientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomColor: '#222435',
    borderBottomWidth: 1,
  },
  nutrientLabel: {
    color: '#A1A1A1',
    fontSize: 14,
  },
  nutrientValue: {
    color: '#fff',
    fontSize: 14,
  },
  quantityInput: {
    backgroundColor: '#222435',
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  label :{
    color:'white',
  },
  pickerContainer: {
    backgroundColor: '#222435',
    borderRadius: 10,
    marginVertical: 10,
  },
  pickerLabel: {
    color: 'white',
    paddingHorizontal: 10,
    paddingTop: 10,
    fontSize: 14,
  },
  picker: {
    color: 'white',
  },
  addButton: {
    backgroundColor: '#FD6639',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: { 
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NutritionInfo;
