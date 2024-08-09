import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  Animated,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('screen');

const minHeightCm = 50;
const maxHeightCm = 250;
const segmentHeight = 2;
const segmentSpacing = 20;
const snapSegment = segmentHeight + segmentSpacing;
const rulerHeight = (maxHeightCm - minHeightCm) * snapSegment;

const data = [...Array(maxHeightCm - minHeightCm + 1).keys()].map(i => i + minHeightCm);

const Ruler = ({ scrollY }) => (
  <View style={styles.ruler}>
    {data.map(i => {
      const inputRange = [
        (i - 1) * snapSegment,
        i * snapSegment,
        (i + 1) * snapSegment,
      ];

      const scale = scrollY.interpolate({
        inputRange,
        outputRange: [0.8, 1.5, 0.8],
        extrapolate: 'clamp',
      });

      const color = scrollY.interpolate({
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
              transform: [{ scale }],
            },
          ]}
        >
          <Text style={[styles.number, { color }]}>
            {i}
          </Text>
        </Animated.View>
      );
    })}
  </View>
);

export default function SelectHeight() {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [initialHeight, setInitialHeight] = useState(170); // Default to a valid height

  useEffect(() => {
    const scrollToInitialHeight = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: (initialHeight - minHeightCm) * snapSegment - (height / 2 - segmentHeight / 2),
          animated: true,
        });
      }
    };

    scrollToInitialHeight();
  }, [initialHeight]);

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      const currentIndex = Math.round((value - snapSegment / 2) / snapSegment) + minHeightCm;
      setInitialHeight(currentIndex); // Update state with new height
    });

    return () => {
      scrollY.removeListener(listenerId); // Clean up listener
    };
  }, [scrollY]);

  const handleContinuePress = () => {
    navigation.navigate('NextScreen'); // Replace with the next screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{'<'} Back</Text>
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Select Your Height</Text>
      </View>

      <Animated.ScrollView
        ref={scrollViewRef}
        vertical
        contentContainerStyle={styles.scrollViewContainerStyle}
        bounces={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={snapSegment}
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
        <Ruler scrollY={scrollY} />
      </Animated.ScrollView>

      <View style={styles.indicatorWrapper}>
        <Text style={styles.heightTextStyle}>
          {initialHeight} cm
        </Text>
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
    marginLeft: 20,
  },
  backButtonText: {
    color: '#FD6639',
    fontSize: 18,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  indicatorWrapper: {
    position: 'absolute',
    left: (Dimensions.get('window').width - 100) / 2,
    top: height / 2 - 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  segmentIndicator: {
    width: 100,
    backgroundColor: '#FD6639',
    height: 2,
  },
  ruler: {
    backgroundColor: '#FD6639',
    width: '30%',
    height: rulerHeight,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    borderRadius:15,
    height:400,
    top:55,
  },
  segment: {
    height: segmentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContainerStyle: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  heightTextStyle: {
    fontSize: 42,
    color: '#FFFFFF',
    marginTop: 80,
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
  number: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});
