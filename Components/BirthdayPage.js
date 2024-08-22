import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import Lottie from 'lottie-react-native';

const BirthdayPage = () => {
  const [showKisses, setShowKisses] = useState(false);
  const [animationOpacity] = useState(new Animated.Value(1)); 

  const handleButtonClick = () => {
    setShowKisses(true);

    setTimeout(() => {
      Animated.timing(animationOpacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setShowKisses(false); 
        animationOpacity.setValue(1); 
      });
    }, 2000); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}> 
        <Image
          source={require('../assets/images/TopImage.jpg')} 
          style={styles.topImage}
          resizeMode="cover"
        />
      </View>
      {showKisses && (
        <Animated.View style={[styles.kissesAnimation, { opacity: animationOpacity }]}>
          <Lottie
            source={require('../assets/BirthdayKiss.json')} 
            autoPlay
            loop={false}
            style={styles.kissesAnimation}
          />
          <Text style={styles.ohibokText}>Ohibok</Text> 
        </Animated.View>
      )}
      <Text style={styles.greeting}>Happy Birthday, Aymentiiiiiiii! 🎉</Text>
      <Text style={styles.message}>
        May your day be filled with joy, laughter, and endless love. You're my favorite person in the world 🫶🏻🩵
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
        <Text style={styles.buttonText}>Sending You Hugs & Kisses 😘😍</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA', 
    padding: 20,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100, 
    overflow: 'hidden', 
    borderWidth: 5, 
    borderColor: '#FF4081', 
    marginBottom: 20,
  },
  topImage: {
    width: '100%',
    height: '100%',
  },
  kissesAnimation: {
    position: 'absolute',
    top: -10,
    left: 10,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  ohibokText: {
    color: '#FF4081',
    fontSize: 48, 
    fontWeight: 'bold',
    position: 'absolute',
    top: '70%', 
    textAlign: 'center',
  },
  greeting: {
    color: '#0288D1',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    color: '#03A9F4',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#B3E5FC', 
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BirthdayPage;
