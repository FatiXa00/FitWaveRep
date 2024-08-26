import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MealItem = ({ name, calories, recommendedCalories }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name} {calories} Kcal</Text>
            <Text style={styles.recommended}>Recommended {recommendedCalories} Kcal</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#141824',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    name: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    recommended: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    button: {
        backgroundColor: '#FD6639',
        padding: 10,
        borderRadius: 50,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default MealItem;
