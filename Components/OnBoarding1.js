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
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional: overlay to darken the background
    paddingVertical: 100, // Increased padding to make the button larger
    paddingHorizontal: 100, // Increased padding to make the button larger
    
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
 
  subtitle: {
    fontSize: 18,
    marginBottom: 18,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Transparent background
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent border
    //shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // Elevation for Android shadow
    paddingVertical: 10, // Increased padding to make the button larger
    paddingHorizontal: 70, // Increased padding to make the button larger
    borderRadius: 100, // Keep the borderRadius proportional to the button size
  
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
