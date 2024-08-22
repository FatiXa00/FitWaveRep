import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Animated,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('screen');

const minHeightCm = 100;
const maxHeightCm = 250;

const segmentHeight = 2;
const segmentSpacing = 10; 
const snapSegment = segmentHeight + segmentSpacing;
const spacerHeight = 60; 

const VerticalRuler = () => {
  const dataCm = [...Array(maxHeightCm - minHeightCm + 1).keys()].map(i => i + minHeightCm);

  return (
    <View style={styles.ruler}>
      <View style={{ height: spacerHeight }} />
      {dataCm.map(i => (
        <View
          key={i}
          style={[
            styles.segment,
            {
              width: i % 10 === 0 ? 40 : 20,
              marginBottom: segmentSpacing,
            },
          ]}
        />
      ))}
      <View style={{ height: spacerHeight }} />
    </View>
  );
};

export default function SelectHeight() {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const isInitialMount = useRef(true); // Track initial mount

  const [heightValue, setHeightValue] = useState(minHeightCm);

  useEffect(() => {
    // Load stored height when component mounts
    const loadStoredHeight = async () => {
      try {
        const storedHeight = await AsyncStorage.getItem('heightValue');
        if (storedHeight !== null) {
          setHeightValue(Number(storedHeight));
        }
      } catch (error) {
        console.error('Failed to load height from storage:', error);
      }
    };

    loadStoredHeight();
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      // Scroll to initial height only on the first mount
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: (heightValue - minHeightCm) * snapSegment - spacerHeight,
          x: 0,
          animated: false, // No animation for initial mount
        });
      }
      isInitialMount.current = false;
    }
  }, [heightValue]);

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      const currentIndex = Math.round(value / snapSegment) + minHeightCm;
      setHeightValue(currentIndex);
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY]);


  useEffect(() => {
    // Store the heightValue when it changes
    const storeHeightValue = async () => {
      try {
        await AsyncStorage.setItem('heightValue', heightValue.toString());
      } catch (error) {
        console.error('Failed to save height to storage:', error);
      }
    };

    storeHeightValue();
  }, [heightValue]);

  const handleContinuePress = () => {
    console.log('Selected height:', heightValue);
    navigation.navigate('Goal', { height: heightValue });
  };

  const handleHeightChange = (text) => {
    const newHeight = parseInt(text, 10);
    if (!isNaN(newHeight) && newHeight >= minHeightCm && newHeight <= maxHeightCm) {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: (newHeight - minHeightCm) * snapSegment - spacerHeight,
          x: 0,
          animated: true,
        });
      }
      setHeightValue(newHeight);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{'<'} Back</Text>
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Select Your Height</Text>
      </View>

      <View style={styles.rulerContainer}>
        <Animated.ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollViewContainerStyle}
          bounces={false}
          showsVerticalScrollIndicator={false}
          snapToInterval={snapSegment} 
          decelerationRate="fast" 
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: scrollY },
                },
              },
            ],
            { useNativeDriver: true }
          )}
        >
          <VerticalRuler />
        </Animated.ScrollView>
      </View>

      <View style={styles.indicatorWrapper}>
        <TextInput
          style={styles.heightTextStyle}
          value={heightValue.toString()}
          onChangeText={handleHeightChange}
          keyboardType="numeric"
        />
        <Text style={styles.unitTextStyle}>cm</Text>
      </View>

      <View style={styles.arrowIndicator} />
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
    marginTop: -20,
    marginLeft: 2,
  },
  backButtonText: {
    color: '#FD6639',
    fontSize: 18,
    top: 20,
    left: 15,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rulerContainer: {
    marginTop: 55,
    height: 400,
    margin: 15,
    bottom: -30,
  },
  indicatorWrapper: {
    position: 'absolute',
    left: 50,
    top: 410,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  ruler: {
    backgroundColor: '#FD6639',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    width: 120,
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 35,
    marginBottom: 220,
    bottom: -50,
  },
  segment: {
    height: segmentHeight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: segmentSpacing / 2,
    backgroundColor: '#000', // Default color
  },
  scrollViewContainerStyle: {
    justifyContent: 'flex-end',
    left: 40,
    top: 100,
  },
  heightTextStyle: {
    fontSize: 42,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  unitTextStyle: {
    color: '#7E8385',
    fontSize: 18,
  },
  arrowIndicator: {
    position: 'absolute',
    width: 0,
    height: 0,
    top: height / 2,
    right: 50,
    borderTopWidth: 15,
    borderBottomWidth: 15,
    borderRightWidth: 24,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#FFFFFF',
    borderRadius: 5,
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
    top: 50,
  },
  continueButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
