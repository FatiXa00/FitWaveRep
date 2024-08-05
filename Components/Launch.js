import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FitWaveLogo from './FitWaveLogo'; // Ensure this path is correct

export default function Launch() {
  const navigation = useNavigation();

  useEffect(() => {
    // Set a timer to navigate to the 'Logging' screen after 3 seconds
    const timer = setTimeout(() => {
      navigation.navigate('OnBoarding1');
    }, 3000); // 3000 milliseconds = 3 seconds

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);

  // Handle navigation on screen touch
  const handlePress = () => {
    navigation.navigate('OnBoarding1');
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <FitWaveLogo />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
