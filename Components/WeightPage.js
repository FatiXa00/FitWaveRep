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

const { width } = Dimensions.get('screen');

const minWeightKg = 20;
const maxWeightKg = 400;
const segmentWidth = 2;
const segmentSpacing = 20;
const snapSegment = segmentWidth + segmentSpacing;
const spacerWidth = (width - segmentWidth) / 2;
const rulerWidth = spacerWidth * 2 + (maxWeightKg - minWeightKg) * snapSegment;
const indicatorWidth = 100;
const indicatorHeight = 80;

const kgToLbs = kg => kg * 2.20462;
const lbsToKg = lbs => lbs / 2.20462;

const data = [...Array(maxWeightKg - minWeightKg + 1).keys()].map(i => i + minWeightKg);

const Ruler = ({ scrollX }) => (
  <View style={styles.ruler}>
    <View style={{ width: spacerWidth }} />
    {data.map(i => {
      const inputRange = [
        (i - 1) * snapSegment,
        i * snapSegment,
        (i + 1) * snapSegment,
      ];

      const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.8, 1.5, 0.8],
        extrapolate: 'clamp',
      });

      const color = scrollX.interpolate({
        inputRange,
        outputRange: ['#999', '#FFFFFF', '#999'],
        extrapolate: 'clamp',
      });

      return (
        <Animated.View
          key={i}
          style={[
            styles.segment,
            {
              backgroundColor: color,
              height: i % 10 === 0 ? 40 : 20,
              marginRight: i === data.length - 1 ? 0 : segmentSpacing,
              transform: [{ scale }],
            },
          ]}
        />
      );
    })}
    <View style={{ width: spacerWidth }} />
  </View>
);

export default function SelectWeight() {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const textInputRef = useRef(null);

  const [initialWeight, setInitialWeight] = useState(70); // Default to a valid weight
  const [unit, setUnit] = useState('kg');

  const convertWeight = (weight, fromUnit, toUnit) => {
    if (fromUnit === 'kg' && toUnit === 'lbs') {
      return kgToLbs(weight);
    } else if (fromUnit === 'lbs' && toUnit === 'kg') {
      return lbsToKg(weight);
    }
    return weight;
  };

  useEffect(() => {
    const scrollToInitialWeight = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: (initialWeight - minWeightKg) * snapSegment - (width / 2 - segmentWidth / 2),
          y: 0,
          animated: true,
        });
      }
    };

    scrollToInitialWeight();
  }, [initialWeight]);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const currentIndex = Math.round((value - snapSegment / 2) / snapSegment) + minWeightKg;
      if (textInputRef.current) {
        textInputRef.current.setNativeProps({
          text: `${currentIndex}`,
        });
      }
    });
  }, [scrollX]);

  const handleUnitChange = newUnit => {
    if (newUnit !== unit) {
      const currentWeight = parseFloat(textInputRef.current._lastNativeText || initialWeight);
      const convertedWeight = convertWeight(currentWeight, unit, newUnit);
      setInitialWeight(Math.round(convertedWeight));
      setUnit(newUnit);

      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: (Math.round(convertedWeight) - minWeightKg) * snapSegment - (width / 2 - segmentWidth / 2),
            y: 0,
            animated: true,
          });
        }
      }, 100);
    }
  };

  const handleContinuePress = () => {
    navigation.navigate('HeightSelection'); 
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
        <Ruler scrollX={scrollX} />
      </Animated.ScrollView>

      <View style={styles.indicatorWrapper}>
        <TextInput
          ref={textInputRef}
          style={styles.weightTextStyle}
          value={initialWeight.toString()} // Use value instead of defaultValue
          editable={false}
        />
        <Text style={styles.unitTextStyle}>{unit}</Text>
        <View style={[styles.segment, styles.segmentIndicator]} />
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinuePress}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#141824',
    position: 'relative',
  },
  backButton: {
    marginTop: 30,
  },
  backButtonText: {
    color: '#FD6639',
    fontSize: 18,
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
    paddingVertical: 15, // Increased padding for better touch area
    paddingHorizontal: 30, // Increased padding for better touch area
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
    width: rulerWidth,
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
  weightTextStyle: {
    fontSize: 42,
    color: '#FFFFFF',
    marginTop: 80,
  },
  unitTextStyle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: 10,
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
    fontWeight: 'bold',
  },
});