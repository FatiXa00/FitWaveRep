import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const WaterTracker = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Water 0.9L (75%)</Text>
            <View style={styles.buttonsContainer}>
                <Button title="+" onPress={() => {}} />
                <Text style={styles.amount}>0.2L</Text>
                <Button title="-" onPress={() => {}} />
            </View>
            <Text style={styles.recommended}>Recommended until now 1.4L</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#141824',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    amount: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    recommended: {
        color: '#FFFFFF',
        fontSize: 12,
    },
});

export default WaterTracker;
