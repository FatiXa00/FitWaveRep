import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from './firebaseConfig'; // Ensure paths are correct
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Settings() {
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const [profileImage, setProfileImage] = useState('https://i.sstatic.net/dr5qp.jpg'); 
  const [fullName, setFullName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(firestore, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setProfileImage(userData.profileImage || 'https://i.sstatic.net/dr5qp.jpg');
            setFullName(userData.fullName || '');
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to load user data');
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
     
      await auth.signOut();
    
      navigation.navigate('Logging'); 
    } catch (error) {
      Alert.alert('Error', 'Failed to log out');
    }
  };

  const showLogoutConfirm = () => setIsLogoutVisible(true);
  const hideLogoutConfirm = () => setIsLogoutVisible(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newProfileImage = result.assets[0].uri;
      setProfileImage(newProfileImage);
      
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = doc(firestore, 'users', user.uid);
          await setDoc(userRef, { profileImage: newProfileImage }, { merge: true });
        } catch (error) {
          Alert.alert('Error', 'Failed to update profile image');
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#FD6639" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.profileName}>{fullName}</Text>
      </View>
      <View style={styles.menuSection}>
        <MenuItem icon="user" label="Profile" />
        <MenuItem icon="heart" label="Favorite" />
        <MenuItem icon="credit-card" label="Payment Method" />
        <MenuItem icon="lock" label="Privacy Policy" />
        <MenuItem icon="cog" label="Settings" />
        <MenuItem icon="question-circle" label="Help" />
        <MenuItem icon="sign-out-alt" label="Logout" onPress={showLogoutConfirm} />
      </View>
      <Modal
        visible={isLogoutVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={hideLogoutConfirm}
      >
        <View style={styles.modalBackground}>
          <View style={styles.logoutConfirm}>
            <Text style={styles.logoutText}>Are you sure you want to log out?</Text>
            <View style={styles.logoutButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={hideLogoutConfirm}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Yes, Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const MenuItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <Icon name={icon} size={20} color="#FD6639" />
      <Text style={styles.menuItemText}>{label}</Text>
    </View>
    <Icon name="chevron-right" size={20} color="#FD6639" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    top: 25,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: '#FD6639',
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 60,
    top:20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FD6639',
  },
  profileName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  menuSection: {
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2E2F34',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 18,
    color: '#fff',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logoutConfirm: {
    padding: 20,
    backgroundColor: '#222435',
    borderRadius: 20,
    height:220,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    top:20,
    margin:15,
  },
  logoutButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin:15,
    top:25,
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#FD6639',
    marginRight: 10,
    borderRadius: 20,
  },
  cancelText: {
    color: '#FD6639',
    fontSize: 16,
  },
  logoutButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FD6639',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight:'bold',
  },
});
