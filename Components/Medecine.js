import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Medicine() {
  const navigation = useNavigation();

  const reviewData = [
    { id: '1', name: 'Oxycodone', time: '10:00 AM · Taken' },
    { id: '2', name: 'Naloxone', time: '04:00 PM · Skipped' },
    { id: '3', name: 'Oxycodone', time: '10:00 AM · Missed' },
    { id: '4', name: 'Doliprane', time: '04:00 PM · Skipped' },
    { id: '5', name: 'Naloxone', time: '04:00 PM · Skipped' },
    { id: '6', name: 'Naloxone', time: '04:00 PM · Skipped' },
  ];

  const handleReviewPress = (item) => {
    // Navigate to Detail screen with the selected review
    navigation.navigate('Detail', { review: item });
  };

  const renderReviewItem = ({ item }) => (
    <TouchableOpacity style={styles.reviewItem} onPress={() => handleReviewPress(item)}>
      <View>
        <Text style={styles.reviewItemText}>{item.name}</Text>
        <Text style={styles.reviewItemSubText}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#AAAAAA"
        />
      </View>

      {/* Greeting Section */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>
          Hello, <Text style={styles.highlightedText}>Fati</Text>
        </Text>
      </View>

      {/* Plan Overview */}
      <View style={styles.planContainer}>
        <Text style={styles.planTitle}>Your plan</Text>
        <Text style={styles.planTitle}>for today</Text>
        <Text style={styles.planDetails}>1 of 4 completed</Text>
        <TouchableOpacity>
          <Text style={styles.showMore}>Show More</Text>
        </TouchableOpacity>
      </View>

      {/* Image in Foreground */}
      <Image
        source={require('../assets/images/flamenco-uploading.png')}
        style={styles.greetingImage}
      />

      {/* Daily Review */}
      <View style={styles.dailyReviewContainer}>
        <Text style={styles.dailyReviewTitle}>Daily Review</Text>
        <TouchableOpacity style={styles.addPlanButton}onPress={() => {navigation.navigate('Plan');}}>
          <Text style={styles.addPlanButtonText}>Add Plan</Text>
        </TouchableOpacity>
      </View>

      {/* Review List */}
      <FlatList contentContainerStyle={{ paddingBottom: 200 }}
        data={reviewData}
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
    zIndex: 3, // Ensure it stays above the yellow box
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
    zIndex: 1, // Ensure the yellow box stays in the background
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
    top: 160, // Adjust to position the image in front of the yellow box
    zIndex: 2, // Place the image in the foreground
  },
  dailyReviewContainer: {
    marginTop: 20, // Adjust this to provide space for the image overlap
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
    flex: 1, // Allow list to take available space
  },
  reviewItem: {
    backgroundColor: '#1F2430',
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewItemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  reviewItemSubText: {
    color: '#AAAAAA',
    fontSize: 12,
    marginTop: 5,
  },
});
