import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Home from './Home';
import FitHome from './FitHome';
import Settings from './Settings';
import CreateAccount from './CreateAccount';
import NutritionHome from './NutritionHome';
import AppoitmentHome from './AppointmentHome';
import Medicine from './Medecine';

import AddModal from './AddModal';
import Menu from './Menu';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconComponent;

            if (route.name === 'AppoitmentHome') {
              iconComponent = <FontAwesome5 name="stethoscope" size={ size + 3} color={color} />;
            } else if (route.name === 'Medicine') {
              iconComponent = <Fontisto name="pills" size={size + 3} color={color} />;
            } else if (route.name === 'NutritionHome') {
              iconComponent = <FontAwesome5 name="apple-alt" size={size + 3} color={color} />;
            } else if (route.name === 'FitHome') {
              iconComponent = <MaterialIcons name="fitness-center" size={size + 3} color={color} />;
            } else if (route.name === 'Home') {
              iconComponent = <FontAwesome5 name="th-large" size={size + 3} color={color} />;
            } else if (route.name === 'Menu') {
              iconComponent = <Octicons name="three-bars" size={size + 3} color={color} />;
            } else if (route.name === 'AddModal') {
              iconComponent = <Feather name="plus-circle" size={size + 10} color={color} onPress={toggleModal} />;
            }

            return iconComponent;
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#272A3B',
            height: 70,
            paddingBottom: 5,
            borderTopWidth: 0,
            shadowOpacity: 0.3,
            shadowRadius: 5,
            shadowOffset: { height: 3 },
            elevation: 5,
            position: 'absolute',
            bottom: 50,
            margin: 15,
            borderRadius: 25,
            paddingHorizontal: 10,
          },
          tabBarActiveTintColor: '#FD6639',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="FitHome" component={FitHome} />
        <Tab.Screen name="NutritionHome" component={NutritionHome} />
        <Tab.Screen name="AddModal" component={AddModal} />
        <Tab.Screen name="AppoitmentHome" component={AppoitmentHome} />
        <Tab.Screen name="Medicine" component={Medicine} />
        <Tab.Screen name="Menu" component={Menu} />
      </Tab.Navigator>

      <AddModal
        isVisible={isModalVisible}
        onClose={toggleModal}
      />
    </>
  );
}
