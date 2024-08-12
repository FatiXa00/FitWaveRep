import React from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function Paginator({ scrollX }) {
  const dotPosition = Animated.divide(scrollX, width);

  return (
    <View style={styles.container}>
      {Array.from({ length: 3 }).map((_, i) => {
        const opacity = dotPosition.interpolate({
          inputRange: [i - 1, i, i + 1],
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',k
        });

        const scale = dotPosition.interpolate({
          inputRange: [i - 1, i, i + 1],
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={i.toString()}
            style={[styles.dot, { opacity, transform: [{ scale }] }]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 8,
  },
});
