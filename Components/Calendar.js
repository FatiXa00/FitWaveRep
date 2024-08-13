import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

// Get screen width for responsive design
const screenWidth = Dimensions.get('window').width;

// Function to create an array of days with their respective day of the week
const generateDays = (year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
    daysArray.push({ day, dayOfWeek });
  }

  return daysArray;
};

const Calendar = ({ onDateChange, selectedDate }) => {
    const year = selectedDate.getUTCFullYear(); // Use UTC to avoid timezone issues
    const month = selectedDate.getUTCMonth(); // Use UTC to avoid timezone issues
    const daysArray = generateDays(year, month);
  
    const [selectedDay, setSelectedDay] = useState(selectedDate.getUTCDate());
  
    useEffect(() => {
      setSelectedDay(selectedDate.getUTCDate());
    }, [selectedDate]);
  
    const handleDayPress = (day) => {
      setSelectedDay(day);
      onDateChange(day, month, year); // Notify parent of the date change
    };
  
    return (
        
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.calendar}>
          <View style={styles.row}>
            {daysArray.map(({ day, dayOfWeek }) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.day,
                  day === selectedDay && styles.selectedDay, // Highlight the selected day
                ]}
                onPress={() => handleDayPress(day)}
              >
                <Text style={[
                  styles.dayText,
                  day === selectedDay && styles.selectedDayText
                ]}>
                  {day}
                </Text>
                <Text style={[
                  styles.dayHeader,
                  day === selectedDay && styles.selectedDayText
                ]}>
                  {dayOfWeek}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1c2c',
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  calendar: {
    flexDirection: 'column',
    minWidth: screenWidth, // Ensure it covers the screen width
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Ensure days wrap to new lines
    justifyContent: 'space-between',
  },
  day: {
    width: 50,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: '#1a1c2c',
    paddingVertical: 5,
  },
  dayHeader: {
    color: '#FD6639',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  dayText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDay: {
    backgroundColor: '#FD6639', // Highlight background color
    borderColor: '#333', // Darker border for the selected day
  },
  selectedDayText: {
    color: '#ffffff', // Change text color for selected day
  },
});

export default Calendar;
