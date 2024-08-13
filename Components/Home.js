import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Calendar from './Calendar';
import { Calendar as FullScreenCalendar } from 'react-native-calendars';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);

  const handleDateChange = (day, month, year) => {
    // Ensure the date is set correctly with timezone consideration
    const newDate = new Date(Date.UTC(year, month, day));
    setSelectedDate(newDate);
  };
  
  

  const handleFullScreenDateChange = (day) => {
    const { dateString } = day;
    const [year, month, date] = dateString.split('-').map(Number);
    // Ensure the date is set correctly with timezone consideration
    const newDate = new Date(Date.UTC(year, month - 1, date));
    setSelectedDate(newDate);
    setModalVisible(false); 
  };
  
  
  const getFormattedDate = () => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = selectedDate.getDate();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayName = dayNames[selectedDate.getDay()];
    const monthName = monthNames[selectedDate.getMonth()];

    return { dayName, date, monthName };
  };

  const { dayName, date, monthName } = getFormattedDate();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <Text style={styles.dayText}>{dayName}</Text>
          <Text style={styles.dateText}>{`${date} ${monthName}`}</Text>
        </View>

        <View style={styles.iconRow}>
      
          <TouchableOpacity>
            <FontAwesome name="bell" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5 name="user-circle" size={25} color="white" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <FontAwesome5 name="calendar-alt" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Hi, Fati</Text>
        <Text style={styles.subText}>It's time to challenge your limits...</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateSelector}
      >
        <Calendar
          onDateChange={handleDateChange}
          selectedDate={selectedDate}
        />
      </ScrollView>
<ScrollView style ={styles.charts}>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>Consumed</Text>
          <Text style={styles.statValue}>420</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>Burned</Text>
          <Text style={styles.statValue}>210</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>Remaining</Text>
          <Text style={styles.statValue}>240</Text>
        </View>
      </View>

      <View style={styles.activityContainer}>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>Activity</Text>
          <Text style={styles.activitySubText}>Move</Text>
          <Text style={styles.activityValue}>87/100 CAL</Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>Daily Water Intake</Text>
          <Text style={styles.activityValue}>2L</Text>
        </View>
      </View>

      <View style={styles.currentStatusContainer}>
        <Text style={styles.currentStatusTitle}>Current Status</Text>
        <View style={styles.chart}>
          {/* Your chart component or custom SVG can go here */}
        </View>
        <View style={styles.statusDetails}>
          <Text style={styles.statusDetail}>BPM</Text>
          <Text style={styles.statusDetail}>KCAL</Text>
          <Text style={styles.statusDetail}>Weight</Text>
        </View>
      </View>
      </ScrollView>
      {/* Full-Screen Calendar Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <FullScreenCalendar
            onDayPress={handleFullScreenDateChange}
            markedDates={{
              [selectedDate.toISOString().split('T')[0]]: { selected: true, selectedColor: '#FD6639' },
            }}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    backgroundColor: '#1a1c2c',
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    top: 50,
  },
  dateContainer: {
    flexDirection: 'column',
  },
  dayText: {
    color: 'white',
    fontSize: 18,
  },
  dateText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  iconRow: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 8,
  },
  greetingContainer: {
    marginVertical: 16,
    top: 18,
  },
  greetingText: {
    color: '#FD6639',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subText: {
    color: '#aaa',
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  charts:{
    bottom:65,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statTitle: {
    color: '#aaa',
  },
  statValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  activityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  activityItem: {
    alignItems: 'center',
  },
  activityText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  activitySubText: {
    color: '#FD6639',
  },
  activityValue: {
    color: 'white',
    fontSize: 24,
  },
  currentStatusContainer: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#222435',
    borderRadius: 16,
  },
  currentStatusTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  chart: {
    height: 150,
    backgroundColor: '#FD6639',
    borderRadius: 8,
    marginBottom: 16,
  },
  statusDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusDetail: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#1a1c2c',
    justifyContent: 'center',
    padding: 16,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#FD6639',
    paddingVertical: 12,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Home;
