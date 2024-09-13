import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';


export default function AppointmentHome() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule an Appointment</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
    padding: 50,
 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'white',
    alignItems: 'center',
  },
  
});
