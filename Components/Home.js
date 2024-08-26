import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, TouchableOpacity, Modal, Dimensions, Animated, FlatList } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Calendar from './Calendar';
import { Calendar as FullScreenCalendar } from 'react-native-calendars';
import MyBarChart from './MyBarChart';
import ProgressCircleComponent from './ProgressCircleComponent';
import EnergyBarChart from './EnergyBarChart';
import NutrientsBarChart from './NutrientsBarChart';
import GoalCalories from './GoalCalories'; // Import the GoalCalories component
import ActivityProgress from './ActivityProgress'; // Import the new component
import WaterBottle from './WaterBottle'; // Assuming you have this component

const { width } = Dimensions.get('window');

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [goalCaloriesVisible, setGoalCaloriesVisible] = useState(false); // State for GoalCalories modal
  const [modalVisible, setModalVisible] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentPage, setCurrentPage] = useState(0);

  const handleDateChange = (day, month, year) => {
    const newDate = new Date(Date.UTC(year, month, day));
    setSelectedDate(newDate);
  };

  const handleFullScreenDateChange = (day) => {
    const { dateString } = day;
    const [year, month, date] = dateString.split('-').map(Number);
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

  const pages = [
    { id: '1', component: (
        <View style={styles.circlesContainer}>
          <View style={styles.circleRow}>
            <View style={styles.circleContainer}>
              <ProgressCircleComponent percentage={75} size={100} color="#FD6639" />
              <Text style={styles.circleLabel}>Consumed</Text>
            </View>
            <View style={styles.circleContainer}>
              <ProgressCircleComponent percentage={50} size={100} color="#3498db" />
              <Text style={styles.circleLabel}>Burned</Text>
            </View>
            <View style={styles.circleContainer}>
              <ProgressCircleComponent percentage={60} size={100} color="#2ecc71" />
              <Text style={styles.circleLabel}>Remaining</Text>
            </View>
          </View>
        </View>
    )},
    { id: '2', component: (
      <View style={styles.pageContainer}>
          <Text style={styles.currentStatusTitle}></Text>  
          <EnergyBarChart />
        </View>
     
    )
},
{ 
  id: '3', 
  component: (
    <View style={styles.pageNContainer}>
      <Text style={styles.currentStatusTitle}></Text>  
      <NutrientsBarChart />
    </View>
  )
}
];

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false } 
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentPage(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

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
          <TouchableOpacity onPress={() => setGoalCaloriesVisible(true)}style={styles.icon} >
            <FontAwesome5 name="fire" size={25} color="white" />
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

      <View style={styles.paginationContainer}>
        <FlatList
          data={pages}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ width, flex: 1 }}>
              {item.component}
            </View>
          )}
          onScroll={onScroll}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />

        <View style={styles.pagination}>
        {pages.map((_, index) => (
            <TouchableOpacity
            key={index}
            style={[styles.dot, currentPage === index && styles.activeDot]}
            onPress={() => {
                scrollX.flattenOffset();
                scrollX.setValue(index * width);
            }}
            />
        ))}
        </View>

      </View>

      <View>
        <ActivityProgress
          caloriesBurned={450}
          steps={8000}
          distance={5}
        />
        <WaterBottle />

      </View>

      <View style={styles.currentStatusContainer}>
        <Text style={styles.currentStatusTitle}>Current Status</Text>
        <MyBarChart />
      </View>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
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
        </View>
      </Modal>


      <GoalCalories
        visible={goalCaloriesVisible}
        onClose={() => setGoalCaloriesVisible(false)}
      />
      
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
    justifyContent: 'space-between',
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
  paginationContainer: {
    marginVertical: 16,
    bottom:20,
  },
  pageContainer: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#222435',
    borderRadius: 16,
    width:350, 
    right:28,
 },
 pageNContainer:{
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#222435',
    borderRadius: 16,
    width:360, 
    right:60,
    flex:1,
 },

 activityProgressContainer: {
  backgroundColor: '#222435',
  padding: 16,
  borderRadius: 12,
  alignItems: 'center',
  marginVertical: 16,
  marginHorizontal: 8,
  width: '90%',
},


waterIntakeContainer: {
  backgroundColor: '#222435', // Match activity container background
  padding: 16,
  borderRadius: 12,
  alignItems: 'center',
  marginVertical: 16,
  marginHorizontal: 8,
  width: '40%', // Adjust width as needed
},
waterIntakeLabel: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 8,
},
waterIntakeValue: {
  color: '#FD6639',
  fontSize: 20,
},

  circlesContainer: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#222435',
    borderRadius: 16,
    width:360,
  },
  circleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  circleContainer: {
    alignItems: 'center',
  },
  circleLabel: {
    color: 'white',
    marginTop: 8,
  },
  currentStatusContainer: {
    padding: 16,
    backgroundColor: '#222435',
    borderRadius: 16,  
    bottom:25,
},
  currentStatusTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
    padding: 20,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FD6639',
    fontSize: 16,
  },
  
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FD6639',
  },
});

export default Home;
