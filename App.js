import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Launch from './Components/Launch'; // Ensure this path is correct
import Logging from './Components/Logging'; // Ensure you have a Logging screen
import Onboarding1 from './Components/OnBoarding1';
import Onboarding2 from './Components/OnBoarding2';
import Onboarding3 from './Components/OnBoarding3';
import CreateAccount from './Components/CreateAccount';
import CreateDoctor from './Components/CreateDoctor';
import ForgottenPassword from './Components/ForgottenPassword';
import SetPassword from './Components/SetPassword';
import ResetPassword from './Components/ResetPassword';
import SetUp from './Components/SetUp';
import GenderSelection from './Components/GenderSelection';
import HowOld from './Components/HowOld';
import WeightPage from './Components/WeightPage';
import SelectHeight from './Components/HeightSelection';
import SelectWeight from './Components/WeightPage';
import CreateDoctor2 from './Components/CreateDoctor2';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Launch">
        <Stack.Screen
          name="Launch"
          component={Launch}
          options={{ headerShown: false }} // Hide header for the Launch screen
        />
         <Stack.Screen
          name="OnBoarding1"
          component={Onboarding1}
          options={{ headerShown: false }} // Show header for Logging screen
        />
            <Stack.Screen
          name="OnBoarding2"
          component={Onboarding2}
          options={{ headerShown: false }} // Show header for Logging screen
        />
            <Stack.Screen
          name="OnBoarding3"
          component={Onboarding3}
          options={{ headerShown: false }} // Show header for Logging screen
        />
      
        <Stack.Screen
          name="Logging"
          component={Logging}
          options={{ headerShown: false }} // Show header for Logging screen
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{ headerShown: false }} // Show header for Logging screen
        />
        <Stack.Screen
          name="CreateDoctor"
          component={CreateDoctor}
          options={{ headerShown: false }} // Show header for Logging screen
        />
       <Stack.Screen
        name="CreateDoctor2"
        component={CreateDoctor2}
        options={{ headerShown: false }} // Show header for Logging screen
      />
        <Stack.Screen
          name="ForgottenPassword"
          component={ForgottenPassword}
          options={{ headerShown: false }} // Show header for Logging screen
        />
        <Stack.Screen
          name="SetPassword"
          component={SetPassword}
          options={{ headerShown: false }} // Show header for Logging screen
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false }} // Show header for Logging screen
        />
              <Stack.Screen
          name="SetUp"
          component={SetUp}
          options={{ headerShown: false }} // Show header for Logging screen
        />
               <Stack.Screen
          name="GenderSelection"
          component={GenderSelection}
          options={{ headerShown: false }} // Show header for Logging screen
        />
                  <Stack.Screen
          name="HowOld"
          component={HowOld}
          options={{ headerShown: false }} // Show header for Logging screen
        />
               <Stack.Screen
          name="WeightPage"
          component={SelectWeight}
          options={{ headerShown: false }} // Show header for Logging screen
        />
                 <Stack.Screen
          name="HeightSelection"
          component={SelectHeight}
          options={{ headerShown: false }} // Show header for Logging screen
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});