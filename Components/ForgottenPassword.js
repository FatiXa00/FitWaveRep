import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ForgottenPassword() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.arrow}>{'\u003C'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Forgotten Password</Text>
      </View>
      <Text style={styles.subtitle}>Forgot Password?</Text>
      <Text style={styles.instruction}>Enter your email address</Text>
      <TextInput
        style={styles.input}
        placeholder="example@example.com"
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('SetPassword');}}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: '#141824',
      },
      header: {
        flexDirection: "row",
        alignItems: 'center',
      },
      backButton: {
        marginTop: 25,
    
      },
      arrow: {
        fontSize: 30,
        color: '#FD6639',
      },

      title: {
        marginTop:45,
        marginLeft:55,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FD6639',
        textAlign: 'center',
        marginVertical: 20,
      },

      subtitle: {
        marginTop:90,
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },
      instruction: {
        margin:10,
        marginTop:45,
        fontSize: 16,
        color: 'white',
        marginBottom: 10,
      },
      input: {
        marginLeft:5,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 50,
    
      },
      button: {
        backgroundColor: '#FD6639',
        paddingVertical: 12,
        paddingHorizontal:5,
        borderRadius: 25,
        marginVertical: 20,
        width:180,
        marginHorizontal:80,
    },
      buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
      },
    });
    
