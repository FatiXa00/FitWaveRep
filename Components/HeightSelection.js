import React, { useState, useRef, handleContinuePress,useEffect } from 'react';
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

const { height } = Dimensions.get('screen');


const minHeightCm = 100;
const maxHeightCm = 250;

const segmentWidth = 2;
const segmentSpacing = 20;
const snapSegment = segmentWidth + segmentSpacing;
const spacerHeight = (height - segmentWidth) / 2;

const rulerHeightCm = spacerHeight * 2 + (maxHeightCm - minHeightCm) * snapSegment;

const indicatorWidth = 200;
const indicatorHeight = 80;

const VerticalRuler = ({ scrollY }) => {
  const dataCm = [...Array(maxHeightCm - minHeightCm + 1).keys()].map(i => i + minHeightCm);

  return (
    <View style={styles.ruler}>
      <View style={{ height: spacerHeight - 40 }} />
      {dataCm.map(i => {
        const inputRange = [
          (i - 1) * snapSegment,
          i * snapSegment,
          (i + 1) * snapSegment,
        ];

        const color = scrollY.interpolate({
          inputRange,
          outputRange: ['#999', '#FFFFFF', '#999'],
          extrapolate: 'clamp',
        });

        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [0.8, 1.5, 0.8],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={i}
            style={[
              styles.segment,
              {
                backgroundColor: color,
                width: i % 10 === 0 ? 40 : 20,
                marginBottom: segmentSpacing,
                transform: [{ scale }],
              },
            ]}
          >
            <Animated.Text style={[styles.label, { color }]}>
              {i}
            </Animated.Text>
          </Animated.View>
        );
      })}
      <View style={{ height: spacerHeight }} />
    </View>
  );
};

export default function SelectHeight() {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const textInputRef = useRef(null);

  const [initialHeight, setInitialHeight] = useState(170);

  useEffect(() => {
    const scrollToInitialHeight = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: (initialHeight - minHeightCm) * snapSegment - spacerHeight,
          x: 0,
          animated: true,
        });
      }
    };
    

    scrollToInitialHeight();
  }, [initialHeight]);
  const handleContinuePress = () => {
    navigation.navigate('Goal'); // Replace 'NextScreen' with the next screen in your navigation flow
  };
    
  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const currentIndex = Math.round(value / snapSegment) + minHeightCm;
      if (textInputRef.current) {
        textInputRef.current.setNativeProps({
          text: `${currentIndex}`,
        });
      }
    });
  }, [scrollY]);

  // Move the handleContinuePress function inside the component
   
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
        <VerticalRuler scrollY={scrollY} />
      </Animated.ScrollView>

      <View style={styles.indicatorWrapper}>
        <TextInput
          ref={textInputRef}
          style={styles.heightTextStyle}
          value={initialHeight.toString()}
          editable={false}
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
  indicatorWrapper: {
    position: 'absolute',
    left: 50,
    top: (height - indicatorHeight) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: indicatorHeight,
  },
  segmentIndicator: {
    width: indicatorWidth,
    backgroundColor: '#FD6639',
  },
  ruler: {
    backgroundColor: '#FD6639',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    width: 120,
    alignSelf: 'center',
    marginTop: 50,
  },
  segment: {
    height: segmentWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: segmentSpacing / 2,
  },
  scrollViewContainerStyle: {
    justifyContent: 'flex-end',
    left: 40,
    bottom: 230,
  },
  label: {
    position: 'absolute',
    left: -50,
    fontSize: 13,
    color: 'white',
  },
  heightTextStyle: {
    fontSize: 42,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  unitTextStyle: {
    color: '#7E8385',
    fontSize: 18,
    top: 10,
  },
  arrowIndicator: {
    position: 'absolute',
    width: 0,
    height: 0,
    top: height / 2 - 15,
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
  },
  continueButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
;
