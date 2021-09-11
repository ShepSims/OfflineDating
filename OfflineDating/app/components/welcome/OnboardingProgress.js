import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from '../../assets/icons/TramigoIcon';
import colors from '../../config/colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function OnboardingProgress({ step, stepsCompleted, backgroundColor }) {
    return (
        <View style={styles.container}>
            <View style={[styles.step, { backgroundColor: step >= 1 && stepsCompleted > 0 ? colors.white : 'transparent' }]}>
                <Icon name={'check-mark'} size={15} color={backgroundColor} />
            </View>

            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />

            <View style={[styles.step, { backgroundColor: step >= 2 && stepsCompleted > 1 ? colors.white : 'transparent' }]}>
                <Icon name={'check-mark'} size={15} color={backgroundColor} />
            </View>

            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />

            <View style={[styles.step, { backgroundColor: step >= 3 && stepsCompleted > 2 ? colors.white : 'transparent' }]}>
                <Icon name={'check-mark'} size={15} color={backgroundColor} />
            </View>

            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />

            <View style={[styles.step, { backgroundColor: step >= 4 && stepsCompleted > 3 ? colors.white : 'transparent' }]}>
                <Icon name={'check-mark'} size={15} color={backgroundColor} />
            </View>

            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />

            <View style={[styles.step, { backgroundColor: step >= 5 && stepsCompleted > 4 ? colors.white : 'transparent' }]}>
                <Icon name={'check-mark'} size={15} color={backgroundColor} />
            </View>

            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />

            <View style={[styles.step, { backgroundColor: step >= 6 && stepsCompleted > 5 ? colors.white : 'transparent' }]}>
                <Icon name={'check-mark'} size={15} color={backgroundColor} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        position: 'absolute',
        top: screenHeight * .05,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dot: {
        backgroundColor: colors.white,
        borderRadius: 999,
        width: 5,
        height: 5,
    },
    step: {
        borderWidth: 2,
        borderColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
        width: 30,
        height: 30,
    },
});

export default OnboardingProgress;