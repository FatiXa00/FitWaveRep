// StepIndicator.js
import React from 'react';
import StepIndicator from 'react-native-step-indicator';
import { StyleSheet, View } from 'react-native';

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#00f',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#00f',
  stepStrokeUnFinishedColor: '#bbb',
  stepIndicatorFinishedColor: '#00f',
  stepIndicatorUnFinishedColor: '#bbb',
  stepIndicatorCurrentColor: '#fff',
  stepIndicatorLabelFontSize: 15,
  currentStepLabelColor: '#00f',
  labelColor: '#999',
  labelSize: 13,
  currentStepLabelFontSize: 16,
};

const StepIndicatorComponent = ({ currentPage }) => {
  return (
    <View style={styles.container}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPage - 1} // Assuming currentPage is 1-based
        stepCount={3} // Total number of steps/pages
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    width: '80%',
  },
});

export default StepIndicatorComponent;
