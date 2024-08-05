// Components/Logging.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Logging({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logging Screen</Text>
      <Button
        title="Go Back to Launch"
        onPress={() => navigation.goBack()} // Go back to the previous screen
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
