import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Profile() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#FD6639" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>My Profile</Text>
    </View>
      <Text style={styles.text}>This is the profile page.</Text>
    </View>
  );
}

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
    text: {
        top:20,
        color: '#fff',
        fontSize: 18,
    },
});
