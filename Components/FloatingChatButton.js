import React, { useRef } from 'react';
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
  const position = useRef(new Animated.ValueXY({ x: 20, y: Dimensions.get('window').height - 150 })).current; // Default position
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        });
        position.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        position.flattenOffset();

        // Snapping logic
        const targetX = gesture.moveX < screenWidth / 2 ? 20 : screenWidth - 80; // Snap to left or right
        const targetY = Math.min(
          Math.max(position.y._value, 20), // Prevent going off-screen at the top
          screenHeight - 80 // Prevent going off-screen at the bottom
        );

        Animated.spring(position, {
          toValue: { x: targetX - 30, y: targetY },
          useNativeDriver: false,
        }).start();
      },
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
          transform: position.getTranslateTransform(),
        },
      ]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity style={styles.button} onPress={handlePress}>
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
