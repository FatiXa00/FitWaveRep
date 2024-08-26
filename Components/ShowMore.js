import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const MyPlanScreen = () => {
  const [pillStatus, setPillStatus] = useState({});
  const [expandedPillId, setExpandedPillId] = useState(null); // Track expanded pill
  const [warningMessage, setWarningMessage] = useState('');

  const swipeableRefs = useRef({});

  const pillData = [
    { id: '1', name: 'Oxycodone', time: '10:00 AM', duration: '30 days', pillsPerDay: 1, timing: 'Before eating' },
    { id: '2', name: 'Naloxone', time: '04:00 PM', duration: '30 days', pillsPerDay: 1, timing: 'After eating' },
    { id: '3', name: '5-HTP', time: '10:00 PM', duration: '30 days', pillsPerDay: 2, timing: 'While eating', warning: 'You have two ampoules left' },
  ];

  useEffect(() => {
    updateWarningMessage();
  }, [pillStatus]);

  const handleMarkTaken = (id) => {
    setPillStatus(prevState => ({ ...prevState, [id]: 'taken' }));
    if (swipeableRefs.current[id]) {
      swipeableRefs.current[id].close();
    }
  };

  const handleMarkMissed = (id) => {
    setPillStatus(prevState => ({ ...prevState, [id]: 'missed' }));
    if (swipeableRefs.current[id]) {
      swipeableRefs.current[id].close();
    }
  };

  const toggleExpand = (id) => {
    setExpandedPillId(expandedPillId === id ? null : id);
  };

  const updateWarningMessage = () => {
    const pendingPills = pillData.filter(item => !pillStatus[item.id] || pillStatus[item.id] === 'missed');
    const remainingPills = pendingPills.length;

    if (remainingPills > 0) {
      setWarningMessage(`You have ${remainingPills} more pills to take today.`);
    } else {
      setWarningMessage('You have no pills left to take for today.');
    }
  };

  const renderPill = ({ item }) => {
    const isExpanded = expandedPillId === item.id;

    return (
      <View style={styles.pillWrapper}>
        <Swipeable
          ref={(ref) => { swipeableRefs.current[item.id] = ref; }}
          renderLeftActions={() => (
            <TouchableOpacity style={styles.leftAction} onPress={() => handleMarkTaken(item.id)}>
              <Ionicons name="checkmark" size={24} color="white" />
            </TouchableOpacity>
          )}
          renderRightActions={() => (
            <TouchableOpacity style={styles.rightAction} onPress={() => handleMarkMissed(item.id)}>
              <Ionicons name="trash" size={24} color="white" />
            </TouchableOpacity>
          )}
          onSwipeableWillOpen={() => {
            Object.keys(swipeableRefs.current).forEach(key => {
              if (swipeableRefs.current[key] && swipeableRefs.current[key] !== swipeableRefs.current[item.id]) {
                swipeableRefs.current[key].close();
              }
            });
          }}
        >
          <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.pillContainer}>
            <View style={styles.pillInfo}>
              <Ionicons name="medkit-outline" size={20} color="white" style={styles.pillIcon} />
              <View>
                <Text style={styles.pillName}>{item.name}</Text>
                <Text style={styles.pillDetails}>{item.time}</Text>
                {pillStatus[item.id] === 'taken' && (
                  <Text style={styles.pillMessageT}>You took your pill!</Text>
                )}
                {pillStatus[item.id] === 'missed' && (
                  <Text style={styles.pillMessageF}>You missed your pill.</Text>
                )}
              </View>
            </View>
            {!pillStatus[item.id] && <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color="white" />}
          </TouchableOpacity>

          {isExpanded && (
            <View style={styles.expandedContent}>
              <Text style={styles.expandedText}>Duration: {item.duration}</Text>
              <Text style={styles.expandedText}>Pills per day: {item.pillsPerDay}</Text>
              <Text style={styles.expandedText}>Timing: {item.timing}</Text>
               
            </View>
          )}
        </Swipeable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button and Date Selection */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateText}>Today</Text>
          <Ionicons name="chevron-down" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* Plan Progress */}
      <View style={styles.planProgressContainer}>
        <View>
          <Text style={styles.planTitle}>Your plan </Text>
          <Text style={styles.planTitle}>is almost done!</Text>
          <Text style={styles.progressSubtitle}>13% more than a week ago</Text>
        </View>
        <View style={styles.progressCircle}>
          <Text style={styles.progressText}>78%</Text>
        </View>
      </View>

      {/* Pill List and Warning Message */}
      <FlatList
        data={pillData}
        renderItem={renderPill}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.sectionTitle}>Morning</Text>}
      />

      {/* Warning Message */}
      <View style={styles.warningContainerBottom}>
        <Text style={styles.warningText}>{warningMessage}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  dateText: {
    color: 'white',
    fontSize: 16,
  },
  planProgressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#272A3B',
    borderRadius: 30,
    padding: 20,
    marginVertical: 20,
  },
  planTitle: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressSubtitle: {
    color: '#4CAF50',
    marginTop: 10,
  },
  sectionTitle: {
    color: '#9E9E9E',
    fontSize: 18,
    marginVertical: 10,
  },
  pillWrapper: {
    marginBottom: 20, // Space between pill containers
  },
  pillContainer: {
    backgroundColor: '#272A3B',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pillInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pillIcon: {
    marginRight: 10,
  },
  pillName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pillDetails: {
    color: '#9E9E9E',
    fontSize: 14,
  },
  pillMessageT: {
    color: '#4CAF50',
    fontSize: 14,
    marginTop: 5,
  },
  pillMessageF: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  expandedContent: {
    backgroundColor: '#1E1E2E',
    borderRadius: 10,
    padding: 15,
    marginTop: -10,
    marginBottom: 10,
  },
  expandedText: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#272A3B',
    borderRadius: 10,
    padding: 10,
  },
  warningIcon: {
    marginRight: 10,
  },
  warningText: {
    color: 'red',
    fontSize: 16,
  },
  warningContainerBottom: {
    backgroundColor: '#272A3B',
    borderRadius: 10,
    padding: 15,
    marginTop: 10, // Space between the list and the warning message
    bottom:50,
  },
  leftAction: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightAction: {
    backgroundColor: '#E57373',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyPlanScreen;
