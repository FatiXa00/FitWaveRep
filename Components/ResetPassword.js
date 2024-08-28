 import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SetPassword() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
     <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'<'} Back</Text>
      </TouchableOpacity>
        <Text style={styles.title}>Set Password</Text>
      </View>
      <View style={styles.div}>
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="**********"
        placeholderTextColor="#999"
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="**********"
        placeholderTextColor="#999"
      />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Logging');}}>
        <Text style={styles.buttonText}>Reset Password</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginTop: -20,
        marginLeft:1
        },
        
      backButtonText: {
        color: '#FD6639',
        fontSize: 18,
        top: -2,
        left:-10
      },
      
    title: {
        top: 50,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FD6639',
        textAlign: 'center',
        marginVertical: 20,
        alignSelf:'center',
        left :25,
    },

      div:{
        marginTop:100,
      },
      label: {
        margin:10,
        fontSize: 16,
        color: 'white',

      },
      input: {
        marginLeft:5,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 10,
      },
      button: {
        marginTop:50,
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
        fontSize: 16,
        fontWeight: 'bold',
      },
    });
