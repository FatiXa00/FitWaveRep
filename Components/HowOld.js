import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';

export default function HowOld() {
  const navigation = useNavigation();
  const [age, setAge] = useState(18); // Default age

  const handleConfirmPress = () => {
    // Handle the confirmation action
    alert(`You selected age ${age}`);
    // navigation.navigate('NextScreen'); // Replace 'NextScreen' with your next screen's name
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'<'} Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>How Old Are You?</Text>

      <View style={styles.sliderContainer}>
        <Text style={styles.ageText}>Age: {age}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={age}
          onValueChange={(value) => setAge(Math.round(value))}
          minimumTrackTintColor="#FD6639"
          maximumTrackTintColor="#FFFFFF"
          thumbTintColor="#FD6639"
        />
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleConfirmPress}>
        <Text style={styles. continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141824',
        padding: 20,
      },
      backButton: {
        marginTop: 30,
        marginBottom: 50,
      },
      backButtonText: {
        color: '#FD6639',
        fontSize: 18,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 40,
      },
  sliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    marginTop: 20,
  },
  ageText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  continueButton: {
    marginTop:445,
    backgroundColor: '#FD6639',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 25,
    marginVertical: 20,
    width:'50%',
    alignSelf:'center',
  
  },
  continueButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});