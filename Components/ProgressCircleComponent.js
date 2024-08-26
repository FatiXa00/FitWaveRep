import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Circle as ProgressCircle } from 'react-native-progress';

const ProgressCircleComponent = ({ percentage, size, color }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <ProgressCircle
        progress={percentage / 100}
        size={size}
        thickness={15}
        color={color}
        unfilledColor="#e0e0e0"
        borderWidth={0} // Ensure there's no border
        formatText={() => null} // Disable internal text rendering
      >
        {/* Custom text */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>{`${percentage}%`}</Text>
        </View>
      </ProgressCircle>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute', // Position text absolutely in the center
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  text: {
    fontSize: 14, // Adjust size as needed
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProgressCircleComponent;