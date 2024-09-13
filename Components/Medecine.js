import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, FlatList, Alert } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { auth, firestore } from './firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';

export default function Medicine() {
  const navigation = useNavigation();
  const route = useRoute();
  const [fullName, setFullName] = useState('');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch data
  const fetchData = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setFullName(userDoc.data().fullName || '');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load user data');
      }

      try {
        const plansQuery = query(
          collection(firestore, 'plans'),
          where('userId', '==', user.uid)
        );
        const plansSnapshot = await getDocs(plansQuery);
        const plansList = plansSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          status: doc.data().status || 'pending',
        }));
        setPlans(plansList);
      } catch (error) {
        Alert.alert('Error', 'Failed to load plans');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Error', 'User is not authenticated.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData(); 
    }, [])
  );

  const handleMarkAsMissed = async (planId) => {
    try {
      const planRef = doc(firestore, 'plans', planId);
      await updateDoc(planRef, { status: 'missed' });
      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan.id === planId ? { ...plan, status: 'missed' } : plan
        )
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to mark plan as missed');
    }
  };

  const handleMarkAsTaken = async (planId) => {
    try {
      const planRef = doc(firestore, 'plans', planId);
      await updateDoc(planRef, { status: 'taken' });
      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan.id === planId ? { ...plan, status: 'taken' } : plan
        )
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to mark plan as taken');
    }
  };

const renderReviewItem = ({ item }) => {
    const status = item.status || 'pending';
    const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

    // Helper function to parse time and return a Date object for today
    const parseTime = (timeString) => {
        // Today's date
        const today = new Date();
        // Create a new Date object with today's date and the provided time
        const timeParts = timeString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/);
        
        if (timeParts) {
            const hours = parseInt(timeParts[1], 10);
            const minutes = parseInt(timeParts[2], 10);
            const period = timeParts[3];

            let hours24 = hours;

            if (period === 'PM' && hours < 12) hours24 += 12;
            if (period === 'AM' && hours === 12) hours24 = 0;

            // Set hours and minutes on today's date
            today.setHours(hours24);
            today.setMinutes(minutes);
            today.setSeconds(0);
            today.setMilliseconds(0);

            return today;
        }

        return null; // Return null if time is invalid
    };

    // Extract and format notification times
    const notificationTimes = item.notifications.map(notification => {
        const date = parseTime(notification.time);

        if (!date) {
            console.error('Invalid time:', notification.time);
            return 'Invalid time'; // Fallback text
        }

        // Format the time part only
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Adjust as needed
    }).join(', ');

    return (
        <TouchableOpacity
            style={styles.reviewItem}
            onPress={() => navigation.navigate('Detail', { review: item })}
        >
            <View style={styles.reviewItemLeft}>
                <Text style={styles.reviewItemText}>{item.pillsName}</Text>
                <Text style={styles.reviewItemSubText}>
                    {notificationTimes} . {formattedStatus}
                </Text>
            </View>
            <View style={styles.reviewItemRight}>
                {status === 'pending' && (
                    <View style={styles.actionButtons}>
                        <TouchableOpacity onPress={() => handleMarkAsMissed(item.id)}>
                            <Text style={styles.actionButton}>Mark as Missed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleMarkAsTaken(item.id)}>
                            <Text style={styles.actionButton}>Mark as Taken</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};


  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const filteredPlans = plans.filter(plan => plan.status !== 'pending');

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#AAAAAA"
        />
      </View>

      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>
          Hello, <Text style={styles.highlightedText}>{fullName}</Text>
        </Text>
      </View>

      <View style={styles.planContainer}>
        <Text style={styles.planTitle}>Your plan</Text>
        <Text style={styles.planTitle}>for today</Text>
        <Text style={styles.planDetails}>{filteredPlans.length} medications planned</Text>
        <TouchableOpacity onPress={() => { navigation.navigate('ShowMore'); }}>
          <Text style={styles.showMore}>Show More</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require('../assets/images/flamenco-uploading.png')}
        style={styles.greetingImage}
      />

      <View style={styles.dailyReviewContainer}>
        <Text style={styles.dailyReviewTitle}>Daily Review</Text>
        <TouchableOpacity style={styles.addPlanButton} onPress={() => { navigation.navigate('Plan'); }}>
          <Text style={styles.addPlanButtonText}>Add Plan</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={{ paddingBottom: 200 }}
        data={filteredPlans}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id}
        style={styles.reviewList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#1F2430',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    color: '#FFFFFF',
  },
  greetingContainer: {
    marginTop: 20,
    zIndex: 3,
  },
  greetingText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  highlightedText: {
    color: '#FD6639',
    fontSize: 28,
    fontWeight: 'bold',
  },
  planContainer: {
    backgroundColor: '#F7E7B1',
    padding: 40,
    borderRadius: 20,
    marginTop: 20,
    zIndex: 1,
  },
  planTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: -10,
  },
  planDetails: {
    color: '#333333',
    marginTop: 5,
    marginLeft: -10,
  },
  showMore: {
    color: '#FD6639',
    marginTop: 10,
    fontSize: 12,
    marginLeft: -10,
  },
  greetingImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
    top: 160,
    zIndex: 2,
  },
  dailyReviewContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dailyReviewTitle: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  addPlanButton: {
    backgroundColor: '#FD6639',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addPlanButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewList: {
    marginTop: 10,
    flex: 1,
  },
  reviewItem: {
    backgroundColor: '#1F2430',
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewItemLeft: {
    flex: 1,
  },
  reviewItemText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewItemSubText: {
    color: '#AAAAAA',
    fontSize: 12,
    marginTop: 5,
  },
  reviewItemRight: {
    alignItems: 'flex-end',
  },

});
