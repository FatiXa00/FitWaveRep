// SetUp.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SetUp() {
  const navigation = useNavigation();

  const handleButtonPress = async () => {
    try {
      await AsyncStorage.setItem('setupCompleted', 'true');
      navigation.navigate('GenderSelection');
    } catch (error) {
      console.error('Error saving setup status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/SetUp/SetUp1.png')}
        style={styles.setUpImage}
      />
      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Consistency Is {'\n'}
          the Key To Progress. {'\n'}
          Don't Give Up!
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
  },
  setUpImage: {
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  subtitle: {
    fontSize: 35,
    textAlign: 'center',
    color: '#FD6639',
    marginBottom: 130,
  },
  button: {
    backgroundColor: '#FD6639',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 25,
    marginVertical: 20,
    width: '50%',
    alignSelf: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
