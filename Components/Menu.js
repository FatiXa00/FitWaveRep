import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Menu = ({ navigation }) => {
  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  const handleLogout = () => {
    Alert.alert('Logged Out', 'You have been logged out.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.menuItem}>
        <Icon name="user" size={24} color="#FD6639" />
        <TouchableOpacity onPress={() => handleNavigation('Profile')}>
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuItem}>
        <Icon name="cogs" size={24} color="#FD6639" />
        <TouchableOpacity onPress={() => handleNavigation('Settings')}>
          <Text style={styles.menuText}>App Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuItem}>
        <Icon name="bell" size={24} color="#FD6639" />
        <TouchableOpacity onPress={() => handleNavigation('Notifications')}>
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuItem}>
        <Icon name="info-circle" size={24} color="#FD6639" />
        <TouchableOpacity onPress={() => handleNavigation('About')}>
          <Text style={styles.menuText}>About</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuItem}>
        <Icon name="sign-out" size={24} color="#FD6639" />
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 18,
    marginLeft: 15,
    color: '#333',
  },
});

export default Menu;
