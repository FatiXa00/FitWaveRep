import {React,useRef} from 'react';
import { View, Image, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Paginator from './Paginator'; 

const { width } = Dimensions.get('window'); 

export default function Onboarding3() {
  const navigation = useNavigation();

  const scrollX = useRef(new Animated.Value(0)).current;

  const handleButtonPress = () => {
    navigation.navigate('Logging');
  };

  return (
    <ImageBackground
      source={require('../assets/images/OnBoarding3.png')}
      style={styles.background}
    >

      <View style={styles.overlay}>
        <View style={styles.content}>
          <Image source={require('../assets/icons/IconBoarding3.png')} style={styles.icon} />
          <Text style={styles.subtitle}>Book Your Medical Appointments to Stay Healthy</Text>

        </View>

        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', 
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
  },
  content: {
    width: '100%', 
    maxWidth: 500, 
    height: 150, 
    marginTop: 20, 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30, 
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
    marginTop: 30, 
    backgroundColor: 'rgba(255, 255, 255, 0.15)', 
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, 
    paddingVertical: 10,
    paddingHorizontal: 70, 
    borderRadius: 100, 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginBottom: 10, 
    width: 40,
    height: 40,
  },
});
