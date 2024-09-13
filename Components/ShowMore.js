import React, { useState, useRef, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc, collection, query, getDocs, where } from 'firebase/firestore';
import { firestore, auth } from './firebaseConfig';

const MyPlanScreen = () => {
  const navigation = useNavigation();
  const [pillData, setPillData] = useState([]);
  const [pillStatus, setPillStatus] = useState({});
  const [expandedPillId, setExpandedPillId] = useState(null);
  const [warningMessage, setWarningMessage] = useState('');
  const swipeableRefs = useRef({});
  const startTime = new Date().setHours(0, 0, 0, 0);
  const endTime = new Date().setHours(23, 59, 59, 999);

  
  useFocusEffect(
    React.useCallback(() => {
      fetchPillData();  
    }, [])
  );
  

  useEffect(() => {
    updateWarningMessage(pillData);
  }, [pillStatus, pillData]);

  const fetchPillData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const userId = user.uid;
      const q = query(collection(firestore, 'plans'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPillData(data);
      updateWarningMessage(data);
    } catch (error) {
      console.error('Error fetching pill data:', error);
    }
  };

  const handleMarkStatus = async (id, status) => {
    try {
      setPillStatus(prevState => ({ ...prevState, [id]: status }));
      
      const pillDocRef = doc(firestore, 'plans', id);
      await updateDoc(pillDocRef, { status });

      setPillData(prevData => prevData.filter(pill => pill.id !== id));

      if (swipeableRefs.current[id]) {
        swipeableRefs.current[id].close();
      }
      
    } catch (error) {
      console.error(`Error updating pill status to ${status}:`, error);
    }
  };

  const toggleExpand = (id) => {
    setExpandedPillId(expandedPillId === id ? null : id);
  };

  const updateWarningMessage = (data) => {
    const pendingPills = data.filter(item => !pillStatus[item.id] || pillStatus[item.id] === 'missed');
    const remainingPills = pendingPills.length;

    setWarningMessage(remainingPills > 0
      ? `You have ${remainingPills} more pills to take today.`
      : 'You have no pills left to take for today.'
    );
  };

  const filterPillsByTimeOfDay = (startTime, endTime) => {
    return pillData.filter(item => {
      if (!item.notifications || item.notifications.length === 0) {
        return false;
      }

      return item.notifications.some(notification => {
        if (!notification.time) {
          return false;
        }

        const [timeStr, period] = notification.time.split(' ');
        const [hour, minute] = timeStr.split(':').map(Number);
        let notificationHour = hour;
        if (period === 'PM' && hour < 12) notificationHour += 12;
        if (period === 'AM' && hour === 12) notificationHour = 0;

        const notificationTime = new Date();
        notificationTime.setHours(notificationHour, minute, 0, 0);
        const notificationTimestamp = notificationTime.getTime();

        return notificationTimestamp >= startTime && notificationTimestamp < endTime;
      });
    });
  };

  const renderPill = ({ item }) => {
    if (!item.pillsName || !item.notifications) {
      return null;
    }

    const isExpanded = expandedPillId === item.id;

    return (
      <View style={styles.pillWrapper}>
        <Swipeable
          ref={(ref) => { swipeableRefs.current[item.id] = ref; }}
          renderLeftActions={() => (
            <TouchableOpacity style={styles.leftAction} onPress={() => handleMarkStatus(item.id, 'taken')}>
              <Ionicons name="checkmark" size={24} color="white" />
            </TouchableOpacity>
          )}
          renderRightActions={() => (
            <TouchableOpacity style={styles.rightAction} onPress={() => handleMarkStatus(item.id, 'missed')}>
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
                <Text style={styles.pillName}>{item.pillsName}</Text>
                <Text style={styles.pillDetails}>{item.notifications.map(notification => notification.time).join(', ')}</Text>
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
              <Text style={styles.expandedText}>Duration: {item.duration} {item.durationUnit}</Text>
              <Text style={styles.expandedText}>Amount: {item.amount}</Text>
              <Text style={styles.expandedText}>Food: {item.foodPillsButton}</Text>
            </View>
          )}
        </Swipeable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateText}>Today</Text>
          <Ionicons name="chevron-down" size={16} color="white" />
        </TouchableOpacity>
      </View>
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

      <FlatList 
        data={filterPillsByTimeOfDay(startTime, endTime)}
        renderItem={renderPill}
        keyExtractor={item => item.id}
      />

      {warningMessage && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>{warningMessage}</Text>
        </View>
      )}
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
    marginBottom: 20, 
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
    marginTop: 10,
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