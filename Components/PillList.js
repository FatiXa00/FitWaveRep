import React from 'react';
import { View, FlatList } from 'react-native';

const pillData = [
  { id: '1', name: 'Aspirin', time: '08:00 AM' },
  { id: '2', name: 'Vitamin C', time: '12:00 PM' },
  { id: '3', name: 'Ibuprofen', time: '06:00 PM' },
];

const PillList = () => {
  const handleDelete = (pillId) => {
    console.log(`Delete pill with id: ${pillId}`);
    // Handle delete logic here
  };

  const handleTaken = (pillId) => {
    console.log(`Pill taken with id: ${pillId}`);
    // Handle pill taken logic here
  };

  return (
    <View>
      <FlatList
        data={pillData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PillItem
            pill={item}
            onDelete={() => handleDelete(item.id)}
            onTaken={() => handleTaken(item.id)}
          />
        )}
      />
    </View>
  );
};

export default PillList;
