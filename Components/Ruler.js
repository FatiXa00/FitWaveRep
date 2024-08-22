import React from 'react';
import { View, Animated, StyleSheet, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('screen');

const minWeightKg = 20;
const maxWeightKg = 200;
const minWeightLbs = Math.round(20 * 2.20462);
const maxWeightLbs = Math.round(200 * 2.20462);

const segmentWidth = 2;
const segmentSpacing = 20;
const snapSegment = segmentWidth + segmentSpacing;
const spacerWidth = (width - segmentWidth) / 2;

const Ruler = ({ scrollX, unit }) => {
  const dataKg = [...Array(maxWeightKg - minWeightKg + 1).keys()].map(i => i + minWeightKg);
  const dataLbs = [...Array(maxWeightLbs - minWeightLbs + 1).keys()].map(i => i + minWeightLbs);

  const data = unit === 'kg' ? dataKg : dataLbs;

  return (
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
          >
            <Animated.Text style={[styles.label, { color }]}>
              {i}
            </Animated.Text>
          </Animated.View>
        );
      })}
      <View style={{ width: spacerWidth }} />
    </View>
  );
};

const styles = StyleSheet.create({
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
  label: {
    position: 'absolute',
    top: -45,
    fontSize: 12,
  },
});

export default Ruler;
