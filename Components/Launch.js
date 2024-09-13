import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FitWaveLogo from './FitWaveLogo'; 
import { getAuth } from 'firebase/auth';

export default function Launch() {
  const navigation = useNavigation();
/*
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('OnBoarding1');
    }, 3000); 
    return () => clearTimeout(timer);
  }, [navigation]);*/

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
