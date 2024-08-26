import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign'; // For additional icons

const AddModal = ({ isVisible, onClose }) => {
  const ScanButton = () => {
    navigation.navigate('ScanBarcodeScreen');};
    const AddPlanButton = () => {
      navigation.navigate('Plan');};
  const navigation = useNavigation(); // Use the hook to access navigation

  return (
    
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome5 name="apple-alt" size={40} color="#FD6639" />
              <Text style={styles.iconLabel}>Nutrition</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={AddPlanButton}>
              <Fontisto name="pills" size={40} color="#FD6639" />
              <Text style={styles.iconLabel}>Medicine</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="fitness-center" size={40} color="#FD6639" />
              <Text style={styles.iconLabel}>Fitness</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.iconButton} onPress={ScanButton}>
              <AntDesign name="camera" size={40} color="#FD6639" />
              <Text style={styles.iconLabel}>Scan Food</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
              <MaterialIcons name="local-drink" size={40} color="#FD6639" />
              <Text style={styles.iconLabel}>Water Intake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}onPress={() => navigation.navigate('ChatBot')}>
              <FontAwesome5 name="user-md" size={40} color="#FD6639" />
              <Text style={styles.iconLabel}>Biometric</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#272A3B',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    height: 250,
  },
  title: {
    color: '#FD6639',
    fontSize: 18,
    marginBottom: 15,
  },
  iconContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15, // Space between rows
  },
  iconButton: {
    alignItems: 'center',
  },
  iconLabel: {
    color: 'white',
    marginTop: 5,
  },
});

export default AddModal;
