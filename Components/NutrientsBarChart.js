import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NutrientsBarChart = () => {
  const leftData = [
    { label: 'Fiber', value: 60 },
    { label: 'Iron', value: 40 },
    { label: 'Calcium', value: 70 },
    { label: 'Vitamin A', value: 50 }
  ];

  const rightData = [
    { label: 'Vitamin C', value: 90 },
    { label: 'Potassium', value: 80 },
    { label: 'Folate', value: 30 },
    { label: 'B12', value: 20 }
  ];

  const renderBar = (item) => (
    <View key={item.label} style={styles.barContainer}>
      <Text style={styles.label}>{item.label}</Text>
      <View style={[styles.bar, { width: `${item.value}%`, backgroundColor: '#7E8385' }]} />
      <Text style={styles.value}>{item.value}%</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        {leftData.map(item => renderBar(item))}
      </View>
      <View style={styles.spacer} />  
      <View style={styles.column}>
        {rightData.map(item => renderBar(item))}
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    width: '85%',  
    top:-10,
    height:20,
  },
  spacer: {
    width: 25,  
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  barContainer: {
    bottom:15,

  },
  label: {
    color: 'white',
    marginBottom: 4,
  },
  bar: {
    height: 5,
    borderRadius: 8,
  },
  value: {
    color: 'white',
    textAlign: 'right',
    top:-30,
    left:15,
  },
});

export default NutrientsBarChart;
