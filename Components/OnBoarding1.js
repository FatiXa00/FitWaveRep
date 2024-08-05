import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Onboarding1() {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    // Navigate to the next screen, e.g., 'OnBoarding2'
    navigation.navigate('OnBoarding2');
  };

  return (
    <ImageBackground
      source={require('../assets/images/OnBoarding1.png')} // Path to your background image
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>Start Your Fitness Adventure</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Cover the entire screen with the image
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)', // Optional: overlay to darken the background
  },
  content: {
    marginTop:50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    backgroundColor: '#7E8385',
    shadowColor: '#7E8385',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'pink' //this is  TEST 
  },
  subtitle: {

    fontSize: 16,
    marginBottom: 20,
 
  subtitle: {
    fontSize: 18,
    marginBottom: 18,

    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent background
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Elevation for Android shadow
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
