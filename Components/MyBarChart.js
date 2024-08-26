// MyBarChart.js
import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const MyBarChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50, 40, 55, 60, 70, 80],
      },
    ],
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={screenWidth * 1.5} 
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: "#FD6639",
            backgroundGradientFrom: "#FD6639",
            backgroundGradientTo: "#FFA726",
            decimalPlaces: 2, 
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForBackgroundLines: {
              strokeDasharray: '',
            },
          }}
          style={{
            borderRadius: 16,
            marginRight: 0, 
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    width: screenWidth * 1.5, 
    alignItems: 'center',
  },
});

export default MyBarChart;
