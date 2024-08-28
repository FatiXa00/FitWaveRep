import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import Slider from '@react-native-community/slider';

const CalorieTracker = () => {
    const progressData = {
        data: [0.75], 
    };

    const mealData = [
        { name: "Breakfast", calories: 306, recommended: 447 },
        { name: "Lunch", calories: 306, recommended: 447 },
        { name: "Dinner", calories: 306, recommended: 447 },
        { name: "Snack", calories: 306, recommended: 447 }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.date}>2 May, Monday</Text>
                <ProgressChart
                    data={progressData}
                    width={Dimensions.get('window').width - 40}
                    height={200}
                    strokeWidth={16}
                    radius={32}
                    chartConfig={chartConfig}
                    hideLegend={true}
                    style={styles.chart}
                />
                <Text style={styles.calories}>1645</Text>
                <Text style={styles.subtext}>Kcal available</Text>
                <View style={styles.stats}>
                    <StatItem label="burn" value="690" />
                    <StatItem label="eaten" value="536" />
                </View>
            </View>

            <View style={styles.waterContainer}>
                <Text style={styles.waterText}>Water 0.9L (75%)</Text>
                <Text style={styles.waterSubText}>Recommended until now 1.4L</Text>
                <View style={styles.waterSliderContainer}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={2}
                        minimumTrackTintColor="#307ecc"
                        maximumTrackTintColor="#000000"
                        thumbTintColor="#FD6639"
                    />
                    <Text style={styles.waterAmount}>0.9L</Text>
                </View>
                <View style={styles.waterButtons}>
                    <WaterButton label="-" />
                    <WaterButton label="+" />
                </View>
            </View>

            {/* Daily Meals */}
            <View style={styles.mealsContainer}>
                {mealData.map((meal, index) => (
                    <MealItem
                        key={index}
                        name={meal.name}
                        calories={meal.calories}
                        recommended={meal.recommended}
                    />
                ))}
            </View>
        </View>
    );
};

const StatItem = ({ label, value }) => (
    <View style={styles.statItem}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

const WaterButton = ({ label }) => (
    <TouchableOpacity style={styles.waterButton}>
        <Text>{label}</Text>
    </TouchableOpacity>
);

const MealItem = ({ name, calories, recommended }) => (
    <View style={styles.mealItem}>
        <Text style={styles.mealName}>{name} {calories} Kcal</Text>
        <Text style={styles.mealSubText}>Recommended {recommended} Kcal</Text>
        <TouchableOpacity style={styles.addMealButton}>
            <Text style={styles.addMealButtonText}>+</Text>
        </TouchableOpacity>
    </View>
);

const chartConfig = {
    backgroundColor: '#141824',
    backgroundGradientFrom: '#141824',
    backgroundGradientTo: '#141824',
    color: (opacity = 1) => `rgba(253, 102, 57, ${opacity})`,
    strokeWidth: 2,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141824',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    date: {
        color: '#FFFFFF',
        fontSize: 18,
        marginBottom: 10,
    },
    chart: {
        marginVertical: 20,
    },
    calories: {
        color: '#FD6639',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: -80,
    },
    subtext: {
        color: '#FFFFFF',
        fontSize: 16,
        marginTop: 5,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 20,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    statLabel: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    waterContainer: {
        backgroundColor: '#1F2933',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    waterText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    waterSubText: {
        color: '#7C838A',
        fontSize: 14,
        marginBottom: 10,
    },
    waterSliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    waterAmount: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    slider: {
        width: 200,
        height: 40,
    },
    waterButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    waterButton: {
        backgroundColor: '#FD6639',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mealsContainer: {
        backgroundColor: '#1F2933',
        padding: 15,
        borderRadius: 10,
    },
    mealItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    mealName: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    mealSubText: {
        color: '#7C838A',
        fontSize: 14,
    },
    addMealButton: {
        backgroundColor: '#FD6639',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addMealButtonText: {
        color: '#FFFFFF',
        fontSize: 24,
    },
});

export default CalorieTracker;
