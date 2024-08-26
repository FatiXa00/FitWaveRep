 
 import React, { useState, useEffect } from 'react';
 import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
 import { useNavigation } from '@react-navigation/native';
 import CustomAlert from './CustomAlert';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 
 export default function PhysicalActivityLevel() {
   const navigation = useNavigation();
   const [selectedLevel, setSelectedLevel] = useState(null);
   const [alertVisible, setAlertVisible] = useState(false);
 
   useEffect(() => {
     const getStoredLevel = async () => {
       try {
         const storedLevel = await AsyncStorage.getItem('selectedLevel');
         if (storedLevel) {
           setSelectedLevel(storedLevel);
         }
       } catch (error) {
         console.error('Failed to fetch the level from storage:', error);
       }
     };
 
     getStoredLevel();
   }, []);
 
   const handleLevelSelection = async (level) => {
     setSelectedLevel(level);
     try {
       await AsyncStorage.setItem('selectedLevel', level);
     } catch (error) {
       console.error('Failed to save the level to storage:', error);
     }
   };
 
   const handleContinue = () => {
     if (selectedLevel) {
       console.log('Selected Level:', selectedLevel);
       navigation.navigate('Home', { level: selectedLevel });
     } else {
       setAlertVisible(true);
     }
   };
 
   const handleCloseAlert = () => {
     setAlertVisible(false);
   };
 
   return (
     <View style={styles.container}>
       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
         <Text style={styles.backButtonText}>{'<'} Back</Text>
       </TouchableOpacity>
       <Text style={styles.title}>Physical Activity Level</Text>
       <View style={styles.optionsContainer}>
         {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
           <TouchableOpacity
             key={level}
             style={[
               styles.optionButton,
               selectedLevel === level && styles.selectedOptionButton,
             ]}
             onPress={() => handleLevelSelection(level)}
           >
             <Text
               style={[
                 styles.optionText,
                 selectedLevel === level && styles.selectedOptionText,
               ]}
             >
               {level}
             </Text>
           </TouchableOpacity>
         ))}
       </View>
       <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
         <Text style={styles.continueButtonText}>Continue</Text>
       </TouchableOpacity>
       <CustomAlert
         visible={alertVisible}
         onClose={handleCloseAlert}
         message="Please select a Level"
       />
     </View>
   );
 }
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#141824',
     paddingHorizontal: 20,
     paddingTop: 50,
   },
   backButton: {
     position: 'absolute',
     top: 30,
     left: 20,
   },
   backButtonText: {
     color: '#FD6639',
     fontSize: 16,
   },
   title: {
     fontSize: 22,
     color: '#FFFFFF',
     textAlign: 'center',
     marginTop: 40,
     fontWeight: 'bold',
     top: 10,
   },
   optionsContainer: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
   },
   optionButton: {
     backgroundColor: '#2B2F3A',
     paddingVertical: 30,
     paddingHorizontal: 20,
     borderRadius: 60,
     marginVertical: 15,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-between',
     width: '100%',
     top: -80,
   },
   selectedOptionButton: {
     backgroundColor: '#FD6639',
   },
   optionText: {
     color: '#FFFFFF',
     fontSize: 17,
     textAlign: 'center',
     width: '100%',
   },
   selectedOptionText: {
     color: '#FFFFFF',
   },
   continueButton: {
     backgroundColor: '#FD6639',
     paddingVertical: 12,
     paddingHorizontal: 20,
     borderRadius: 25,
     marginVertical: 20,
     width: '50%',
     alignSelf: 'center',
     position: 'absolute',
     bottom: 60, // Adjust this to match the vertical position
   },
   continueButtonText: {
     color: '#ffffff',
     textAlign: 'center',
     fontSize: 16,
     fontWeight: 'bold',
   },
 });