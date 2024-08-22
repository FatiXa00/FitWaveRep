import React, { useState, useRef, useEffect } from 'react';
import {
  TextInput,
  SafeAreaView,
  Animated,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ruler from './Ruler';

const { width } = Dimensions.get('screen');

const minWeightKg = 20;
const maxWeightKg = 200;
const minWeightLbs = 44; // 20 kg in lbs
const maxWeightLbs = 440; // 200 kg in lbs

const segmentWidth = 2;
const segmentSpacing = 20;
const snapSegment = segmentWidth + segmentSpacing;
const spacerWidth = (width - segmentWidth) / 2;

const indicatorWidth = 100;
const indicatorHeight = 80;

export default function SelectWeight() {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const textInputRef = useRef(null);

  const [initialWeight, setInitialWeight] = useState(minWeightKg);
  const [unit, setUnit] = useState('kg');
  const [selectedWeight, setSelectedWeight] = useState(minWeightKg);

  const getWeightRange = () => {
    return unit === 'kg'
      ? { min: minWeightKg, max: maxWeightKg }
      : { min: minWeightLbs, max: maxWeightLbs };
  };

  useEffect(() => {
    const loadStoredWeight = async () => {
      try {
        const storedWeight = await AsyncStorage.getItem('weightValue');
        if (storedWeight !== null) {
          setSelectedWeight(Number(storedWeight));
          setInitialWeight(Number(storedWeight));
        }
      } catch (error) {
        console.error('Failed to load weight from storage:', error);
      }
    };

    loadStoredWeight();
  }, []);

  useEffect(() => {
    const scrollToInitialWeight = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: (initialWeight - getWeightRange().min) * snapSegment - (width / 2 - segmentWidth / 2),
          y: 0,
          animated: true,
        });
      }
    };

    scrollToInitialWeight();
  }, [initialWeight, unit]);

  useEffect(() => {
    const updateWeight = ({ value }) => {
      const currentIndex = Math.round((value - snapSegment / 2) / snapSegment) + getWeightRange().min;
      if (textInputRef.current) {
        textInputRef.current.setNativeProps({
          text: `${currentIndex}`,
        });
      }
      setSelectedWeight(currentIndex);
    };

    const debouncedUpdateWeight = debounce(updateWeight, 5);

    scrollX.addListener(debouncedUpdateWeight);
    return () => scrollX.removeAllListeners();
  }, [scrollX, unit]);

  useEffect(() => {
    // Store the selected weight when it changes
    const storeWeightValue = async () => {
      try {
        await AsyncStorage.setItem('weightValue', selectedWeight.toString());
      } catch (error) {
        console.error('Failed to save weight to storage:', error);
      }
    };

    storeWeightValue();
  }, [selectedWeight]);

  const handleUnitChange = newUnit => {
    if (newUnit !== unit) {
      setInitialWeight(selectedWeight);
      setUnit(newUnit);

      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: (selectedWeight - getWeightRange().min) * snapSegment - (width / 2 - segmentWidth / 2),
            y: 0,
            animated: false,
          });
        }
      }, 100);
    }
  };

  const handleContinuePress = () => {
    console.log('Selected weight:', selectedWeight);
    navigation.navigate('HeightSelection', { selectedWeight });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{'<'} Back</Text>
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Select Your Weight</Text>
      </View>

      <View style={styles.unitButtonsContainer}>
        <TouchableOpacity
          style={[styles.unitButton, unit === 'kg' && styles.unitButtonSelected]}
          onPress={() => handleUnitChange('kg')}
        >
          <Text style={styles.unitButtonText}>kg</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.unitButton, unit === 'lbs' && styles.unitButtonSelected]}
          onPress={() => handleUnitChange('lbs')}
        >
          <Text style={styles.unitButtonText}>lbs</Text>
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        contentContainerStyle={styles.scrollViewContainerStyle}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={snapSegment}
        decelerationRate="fast"
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollX },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        <Ruler scrollX={scrollX} unit={unit} />
      </Animated.ScrollView>

      <View style={styles.indicatorWrapper}>
        <TextInput
          ref={textInputRef}
          style={styles.weightTextStyle}
          value={initialWeight.toString()}
          editable={false}
        />
        <Text style={styles.unitTextStyle}>{unit}</Text>
      </View>

      <View style={styles.arrowIndicator} />
      <TouchableOpacity style={styles.continueButton} onPress={handleContinuePress}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#141824',
    position: 'relative',
  },
  backButton: {
    marginTop: -20,
    marginLeft:2
    },
    
  backButtonText: {
    color: '#FD6639',
    fontSize: 18,
    top: 20,
    left:15
    
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    top:50,
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
    numberRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10, // Adjust to control space between numbers and ruler
  },
  numberContainer: {
    alignItems: 'center',
  },
  numberText: {
    fontSize: 14,
    color: '#FFFFFF', 
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  unitButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  unitButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    borderColor: '#FD6639',
    borderWidth: 1,
    borderRadius: 30,
    marginHorizontal: 10,
    
  },
  unitButtonSelected: {
    backgroundColor: '#FD6639',
  },
  unitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  indicatorWrapper: {
    position: 'absolute',
    left: (width - indicatorWidth) / 2,
    top: 250,
    alignItems: 'center',
    justifyContent: 'center',
    width: indicatorWidth,
  },
  segmentIndicator: {
    height: indicatorHeight,
    backgroundColor: '#FD6639',
  },
  ruler: {
    backgroundColor: '#FD6639',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: 100,
    alignSelf: 'center',
    marginBottom: 50,
  },
  segment: {
    width: segmentWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContainerStyle: {
    justifyContent: 'flex-end',
    left: 25,
  },
  label: {
    position: 'absolute',
    top: -45, 
    fontSize: 12,
    
  },
  spacerd: {
    backgroundColor: 'transparent',
  },
  weightTextStyle: {
    fontSize: 42,
    color: '#FFFFFF',
    textAlign: 'center',
    top:350,
    },
    unitTextStyle: {
    color: '#7E8385',
    fontSize: 18,
    top:320,
    left:50,
  },

  arrowIndicator: {
    position: 'absolute',
    width: 0,
    height: 0,
    left: width / 2 - 15,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 24,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#ffff',
    borderRadius: 5,
    bottom:290,
  },
  continueButton: {
    backgroundColor: '#FD6639',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 20,
    width: '50%',
    alignSelf: 'center',
    marginBottom: 60,
  },
  continueButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight:'bold'
  },

});
