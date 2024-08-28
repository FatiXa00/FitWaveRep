import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text } from 'react-native';

const MyChartComponent = () => {
  const screenWidth = Dimensions.get("window").width;

  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4"],
    datasets: [
      {
        data: [78, 340, 120, 200]
      }
    ]
  };

  const chartConfig = {
    backgroundColor: "#1c2a38",
    backgroundGradientFrom: "#1c2a38",
    backgroundGradientTo: "#1c2a38",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  return (
    <View>
      <Text style={{ color: '#fff', textAlign: 'center', marginBottom: 16 }}>
        Current Status
      </Text>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  );
};

export default MyChartComponent;
