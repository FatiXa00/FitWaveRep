import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EnergyBarChart = () => {
  const energyData = [
    { label: 'Energy', value: 20 },
    { label: 'Protein', value: 50 },
    { label: 'Net Carbs', value: 30 },
    { label: 'Fats', value: 30 },
  ];

  return (
    <View style={styles.container}>
      {energyData.map((item, index) => (
        <View key={index} style={styles.barContainer}>
          <Text style={styles.label}>{item.label}</Text>
          <View style={[styles.bar, { width: `${item.value}%`, backgroundColor: '#7E8385' }]} />
          <Text style={styles.value}>{item.value}%</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    width: '85%',  
    height:'auto',

  },
  
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    top:-12,

  
  },
  label: {
    color: 'white',
    width: 80,
  },
  bar: {
    height: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
  },
  value: {
    color: 'white',
    textAlign: 'right',
  },
});

export default EnergyBarChart;
