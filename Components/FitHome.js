import React, { useState, useRef} from 'react';
import { View, Text, StyleSheet,Dimensions,Animated,FlatList,TouchableOpacity } from 'react-native';


const { width } = Dimensions.get('window');

const pages = [
  { id: '1', title: 'Page 1' },
  { id: '2', title: 'Page 2' },
];

const FitHome = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentPage, setCurrentPage] = useState(0);

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
    <View style={styles.container}>
      <FlatList
        data={pages}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.page}>
            <Text style={styles.pageText}>{item.title}</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  page: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    margin: 5,
  },
  activeDot: {
    backgroundColor: 'black',
  },
});

export default FitHome;

