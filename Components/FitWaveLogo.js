import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function FitWaveLogo() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/FitLogo.png')} 
        style={styles.FitLogo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FitLogo: {
    width: 300,
    height: 150,
  },
});
