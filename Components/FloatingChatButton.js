import React, { useState, useRef } from 'react';
import {
  Animated,
  PanResponder,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FloatingChatButton = () => {
  const navigation = useNavigation();
  const position = useRef(new Animated.ValueXY()).current;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value
        });
      },
      onPanResponderMove: (_, gesture) => {
        const newX = gesture.dx;
        const newY = gesture.dy;
        position.setValue({ x: newX, y: newY });
      },
      onPanResponderRelease: () => {
        position.flattenOffset();
      }
    })
  ).current;

  const handlePress = () => {
    navigation.navigate('chatbot');
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: position.getTranslateTransform()
        }
      ]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
      >
        <Image 
          source={require('../assets/images/robot.png')}
          style={styles.robotImage}
        />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>?</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    zIndex: 999,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  robotImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 20,
    color: '#222435',

  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF5733',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FloatingChatButton;
