import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MenuProvider } from 'react-native-popup-menu';

// Import components
import Launch from './Components/Launch'; 
import Logging from './Components/Logging'; 
import Onboarding1 from './Components/OnBoarding1';
import Onboarding2 from './Components/OnBoarding2';
import Onboarding3 from './Components/OnBoarding3';
import CreateAccount from './Components/CreateAccount';
import CreateDoctor from './Components/CreateDoctor';
import CreateDoctor2 from './Components/CreateDoctor2';
import ForgottenPassword from './Components/ForgottenPassword';
import SetPassword from './Components/SetPassword';
import ResetPassword from './Components/ResetPassword';
import SetUp from './Components/SetUp';
import GenderSelection from './Components/GenderSelection';
import HowOld from './Components/HowOld';
import SelectHeight from './Components/HeightSelection';
import SelectWeight from './Components/WeightPage';
import BottomTabNavigator from './Components/BottomTabNavigator';
import AddModal from './Components/AddModal';
import Settings from './Components/Settings';
import Goal from './Components/Goal';
import PhysicalActivityLevel from './Components/PhysicalActivityLevel';
import GoalCalories from './Components/GoalCalories';
import AdjustWater from './Components/AdjustWater';
import ScanBarcodeScreen from './Components/ScanBarcodeScreen';
import Plan from './Components/Plan';
import Food from './Components/Food';
import FoodSearch from './Components/FoodSearch';
import MealSummary from './Components/MealSummary';
import ShowMore from './Components/ShowMore';
import FoodSuggestionPage from './Components/FoodSuggestionPage';
import RecipeListPage from './Components/RecipeListPage';
import RecipeDetailPage from './Components/RecipeDetailPage';
import MealTracker from './Components/MealTracker';
import NutritionalSummary from './Components/NutritionalSummary';
import Ruler from './Components/Ruler';
import Medicine from './Components/Medecine';
import NutritionalData from './Components/NutritionData';
import Profile from './Components/Profile';
import Favorite from './Components/Favorite';
import PaymentMethod from './Components/PaymentMethod';
import PrivacyPolicy from './Components/PrivacyPolicy';
import SettingsPage from './Components/SettingsPage';
import Help from './Components/Help';
import WorkoutScreen from './Components/WorkoutScreen';
import Home from './Components/Home';
import WaterIntake from './Components/WaterIntake';


const Stack = createStackNavigator();

export default function App() {

  return ( 
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Launch">
          <Stack.Screen name="Launch" component={Launch} options={{ headerShown: false }} />
          <Stack.Screen name="OnBoarding1" component={Onboarding1} options={{ headerShown: false }} />
          <Stack.Screen name="OnBoarding2" component={Onboarding2} options={{ headerShown: false }} />
          <Stack.Screen name="OnBoarding3" component={Onboarding3} options={{ headerShown: false }} />
          <Stack.Screen name="Logging" component={Logging} options={{ headerShown: false }} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerShown: false }} />
          <Stack.Screen name="CreateDoctor" component={CreateDoctor} options={{ headerShown: false }} />
          <Stack.Screen name="CreateDoctor2" component={CreateDoctor2} options={{ headerShown: false }} />
          <Stack.Screen name="Ruler" component={Ruler} options={{ headerShown: false }} />
          <Stack.Screen name="ForgottenPassword" component={ForgottenPassword} options={{ headerShown: false }} />
          <Stack.Screen name="SetPassword" component={SetPassword} options={{ headerShown: false }} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
          <Stack.Screen name="SetUp" component={SetUp} options={{ headerShown: false }} />
          <Stack.Screen name="GenderSelection" component={GenderSelection} options={{ headerShown: false }} />
          <Stack.Screen name="HowOld" component={HowOld} options={{ headerShown: false }} />
          <Stack.Screen name="WeightPage" component={SelectWeight} options={{ headerShown: false }} />
          <Stack.Screen name="HeightSelection" component={SelectHeight} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="AddModal" component={AddModal} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
          <Stack.Screen name="Goal" component={Goal} options={{ headerShown: false }} />
          <Stack.Screen name="PhysicalActivityLevel" component={PhysicalActivityLevel} options={{ headerShown: false }} />
          <Stack.Screen name="GoalCalories" component={GoalCalories} options={{ headerShown: false }} />
          <Stack.Screen name="AdjustWater" component={AdjustWater} options={{ headerShown: false }} />
          <Stack.Screen name="Medicine" component={Medicine} options={{ headerShown: false }} />
          <Stack.Screen name="ScanBarcodeScreen" component={ScanBarcodeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Plan" component={Plan} options={{ headerShown: false }} />
          <Stack.Screen name="Food" component={Food} options={{ headerShown: false }} />
          <Stack.Screen name="FoodSearch" component={FoodSearch} options={{ headerShown: false }} />
          <Stack.Screen name="MealSummary" component={MealSummary} options={{ headerShown: false }} />
          <Stack.Screen name="ShowMore" component={ShowMore} options={{ headerShown: false }} />
          <Stack.Screen name="FoodSuggestionPage" component={FoodSuggestionPage} options={{ headerShown: false }} />
          <Stack.Screen name="RecipeListPage" component={RecipeListPage} options={{ headerShown: false }} />
          <Stack.Screen name="RecipeDetailPage" component={RecipeDetailPage} options={{ headerShown: false }} />
          <Stack.Screen name="MealTracker" component={MealTracker} options={{ headerShown: false }} />
          <Stack.Screen name="NutritionalSummary" component={NutritionalSummary} options={{ headerShown: false }} />
          <Stack.Screen name="NutritionData" component={NutritionalData} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name="Favorite" component={Favorite} options={{ headerShown: false }} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethod} options={{ headerShown: false }} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
          <Stack.Screen name="SettingsPage" component={SettingsPage} options={{ headerShown: false }} />
          <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} />
          <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MyHome" component={Home}  options={{ headerShown: false }} />
          <Stack.Screen name="WaterIntake" component={WaterIntake} options={{ headerShown: false }} />

        </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  </MenuProvider>
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
