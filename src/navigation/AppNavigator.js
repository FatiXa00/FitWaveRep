import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';

// Auth Screens
import Launch from '../screens/auth/Launch';
import Logging from '../screens/auth/Logging';
import CreateAccount from '../screens/auth/CreateAccount';
import ForgottenPassword from '../screens/auth/ForgottenPassword';
import SetPassword from '../screens/auth/SetPassword';
import ResetPassword from '../screens/auth/ResetPassword';

// Onboarding Screens
import Onboarding1 from '../screens/onboarding/Onboarding1';
import Onboarding2 from '../screens/onboarding/Onboarding2';
import Onboarding3 from '../screens/onboarding/Onboarding3';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Launch" component={Launch} />
        <Stack.Screen name="Logging" component={Logging} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="ForgottenPassword" component={ForgottenPassword} />
        <Stack.Screen name="SetPassword" component={SetPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} />
        <Stack.Screen name="Onboarding3" component={Onboarding3} />
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
