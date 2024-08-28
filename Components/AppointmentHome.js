import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates'; 
import { TimePickerModal } from 'react-native-paper-dates'; 

export default function AppointmentHome() {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [description, setDescription] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const handleDateConfirm = (date) => {
    setDate(date.toDateString());
    setDatePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    setTime(time.toTimeString().split(' ')[0]);
    setTimePickerVisible(false);
  };

  const handleSubmit = () => {
    if (!date || !time || !description) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    // Handle appointment submission
    Alert.alert('Appointment Scheduled', `Date: ${date}\nTime: ${time}\nDescription: ${description}`);
    // Clear form
    setDate(null);
    setTime(null);
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule an Appointment</Text>

      <TouchableOpacity style={styles.input} onPress={() => setDatePickerVisible(true)}>
        <Text style={styles.inputText}>{date ? date : 'Select Date'}</Text>
      </TouchableOpacity>

      <DatePickerModal
        mode="single"
        visible={datePickerVisible}
        date={date ? new Date(date) : new Date()}
        onConfirm={handleDateConfirm}
        onDismiss={() => setDatePickerVisible(false)}
      />

      <TouchableOpacity style={styles.input} onPress={() => setTimePickerVisible(true)}>
        <Text style={styles.inputText}>{time ? time : 'Select Time'}</Text>
      </TouchableOpacity>

      <TimePickerModal
        visible={timePickerVisible}
        time={time ? new Date(`1970-01-01T${time}:00Z`) : new Date()}
        onConfirm={handleTimeConfirm}
        onDismiss={() => setTimePickerVisible(false)}
      />

      <TextInput
        style={styles.textArea}
        placeholder="Description"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => { }}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 15,
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 20,
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
