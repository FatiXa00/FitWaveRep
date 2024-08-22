import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Launch from './Components/Launch'; 
import Logging from './Components/Logging'; 
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
import SelectHeight from './Components/HeightSelection';
import SelectWeight from './Components/WeightPage';
import CreateDoctor2 from './Components/CreateDoctor2';
import BottomTabNavigator from './Components/BottomTabNavigator';
import Profile from './Components/Profile';
import Settings from './Components/Settings';
import Goal from './Components/Goal';
import AddModal from './Components/AddModal';
import PhysicalActivityLevel from './Components/PhysicalActivityLevel';
import Medicine from './Components/Medecine';
import ScanBarcodeScreen from './Components/ScanBarcodeScreen';
import Plan from './Components/Plan';
import Notif from './Components/Notif';
 const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Launch">
        <Stack.Screen
          name="Launch"
          component={Launch}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="OnBoarding1"
          component={Onboarding1}
          options={{ headerShown: false }} 
        />
         
        <Stack.Screen
          name="OnBoarding2"
          component={Onboarding2}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="OnBoarding3"
          component={Onboarding3}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Logging"
          component={Logging}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="CreateDoctor"
          component={CreateDoctor}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="CreateDoctor2"
          component={CreateDoctor2}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="ForgottenPassword"
          component={ForgottenPassword}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="SetPassword"
          component={SetPassword}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="SetUp"
          component={SetUp}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="GenderSelection"
          component={GenderSelection}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="HowOld"
          component={HowOld}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="WeightPage"
          component={SelectWeight}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="HeightSelection"
          component={SelectHeight}
          options={{ headerShown: false }} 
        />
           <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="AddModal"
          component={AddModal}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Goal"
          component={Goal}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="PhysicalActivityLevel"
          component={PhysicalActivityLevel}
          options={{ headerShown: false }} // Show header for Logging screen
        />
         <Stack.Screen
          name="Medicine"
          component={Medicine}
          options={{ headerShown: false }} 
        />
     <Stack.Screen
          name="ScanBarcodeScreen"
          component={ScanBarcodeScreen}
          options={{ headerShown: false }} 
        />
<Stack.Screen
          name="Plan"
          component={Plan}
          options={{ headerShown: false }} 
        />
<Stack.Screen
          name="Notif"
          component={Notif}
          options={{ headerShown: false }} 
        />
    
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
    alignItems: 'center',
    justifyContent: 'center',
  },
});