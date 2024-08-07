import React from 'react';
import { View, Image, Text, StyleSheet, ImageBackground, TouchableOpacity,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window'); // Get the screen width for responsive design

export default function Onboarding2() {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate('OnBoarding3');
  };

  return (
    <ImageBackground
      source={require('../assets/images/OnBoarding2.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Image source={require('../assets/icons/IconBoarding2.png')} style={styles.icon} />
          <Text style={styles.subtitle}>Find the Perfect Nutrition Plan for Your Lifestyle</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay
  },
  content: {
    width: '100%', // Adjust width to 80% of the screen width
    maxWidth: 500, // Max width constraint
    height: 150, // Fixed height to prevent resizing
    marginTop: 20, // Adjust marginTop to fit your design
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30, // Adjust padding to fit your design
    backgroundColor: '#7E8385',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 30, // Adjust marginTop to fit your design
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Transparent background
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent border
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // Elevation for Android shadow
    paddingVertical: 10, // Padding to make the button larger
    paddingHorizontal: 70, // Padding to make the button larger
    borderRadius: 100, // Keep the borderRadius proportional to the button size
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginBottom: 10, // Adjust marginBottom to move the icon up
    width: 40,
    height: 40,
  },
});
