import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  PanResponder,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  View,
  Easing
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const FloatingChatButton = () => {
    const navigation = useNavigation();
     const route = useRoute();
    const position = useRef(new Animated.ValueXY()).current;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const [isVisible, setIsVisible] = useState(true);
    const initialY = screenHeight / 2 - 30;


  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
        const currentRouteName = route.name;
      
     if (currentRouteName === 'chatbot') {
            setIsVisible(false)
        }
         else{
              setIsVisible(true);
         }
      });

    return unsubscribe;
  }, [navigation, route]);


     useEffect(() => {
        position.setValue({x: 0, y: initialY});
     }, []);


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
       onPanResponderMove: Animated.event(
          [
           null,
              {dx: position.x, dy: position.y},
          ],
             {useNativeDriver: false}
          ),
      onPanResponderRelease: (_, gesture) => {
          position.flattenOffset();

         let snapX;
            if(gesture.moveX > screenWidth / 2){
                snapX = screenWidth - 75;
            }else{
                snapX = 15
            }
          Animated.timing(position.x,{
              toValue: snapX,
              duration: 250,
               easing: Easing.out(Easing.ease),
                useNativeDriver: false,
          }).start()
      }
    })
  ).current;

    const handlePress = () => {
        navigation.navigate('chatbot');
    };

    if(!isVisible) return null;
  return (
    <Animated.View
      style={[
        styles.container,
        {
           transform: position.getTranslateTransform(),
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
     top: 0,
     left: 0,
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