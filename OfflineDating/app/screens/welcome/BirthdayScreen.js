import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '../../components/general/DateTimePicker';
import OnboardingProgress from '../../components/welcome/OnboardingProgress';
import Icon from '../../assets/icons/TramigoIcon';
import colors from '../../config/colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function BirthdayScreen(props) {
    // Navigation
    const navigation = useNavigation();
    const route = useRoute();

    // Constants
    const today = new Date(Date.now());
    const maxBday = new Date(today.getFullYear() - 13, 11, 31);
    const minBday = new Date(today.getFullYear() - 115, 0, 1);

    // State
    const [date, setDate] = useState(today);
    const [showDatePicker, setShowDatePicker] = useState(false);

    return (
        <View style={styles.container}>
            <OnboardingProgress step={3} stepsCompleted={date == today ? 2 : 3} backgroundColor={colors.green} />

            <Icon name={'cake'} size={85} color={colors.white} style={styles.icon} />
            <Text style={styles.intro}>When is your birthday?{'\n'}(Only you can see this.)</Text>

            <DateTimePicker
                value={date}
                mode={'date'}
                dateFormat={'standard'}
                maxDate={maxBday}
                minDate={minBday}
                display={Platform.OS === 'ios' ? 'compact' : 'default'}
                is24Hour={true}
                onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || date;
                    setDate(selectedDate);
                    setShowDatePicker(false);
                }}
                showPicker={showDatePicker}
                onPressShow={() => setShowDatePicker(true)}
                style={{ width: screenWidth * 0.4 }}
                buttonStyle={{
                    container: {
                        width: screenWidth * 0.75,
                        height: 40,
                        backgroundColor: colors.white,
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                    },
                    text: {
                        color: colors.black,
                        fontSize: 18,
                    },
                }}
            />

            <TouchableOpacity
                onPress={() => navigation.navigate('Work', {
                    birthday: date.toString(),
                    country: route.params.country,
                    places: route.params.places,
                    profilePic: route.params.profilePic
                })}
                style={styles.nextButton}
                disabled={date == today}
            >
                <Text style={styles.nextButtonLabel}>Next</Text>
                <Icon name={'half-arrow-right'} size={15} color={colors.white} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    birthday: {
        color: colors.black,
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 10,
        marginBottom: 30,
    },
    container: {
        height: screenHeight,
        width: screenWidth,
        backgroundColor: colors.green,
        alignItems: 'center',
    },
    icon: {
        marginTop: screenHeight * .33,
        marginBottom: 30,
    },
    intro: {
        fontSize: 25,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    nextButton: {
        position: 'absolute',
        bottom: 25,
        right: 25,
        height: 40,
        borderWidth: 1,
        borderColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderRadius: 999,
    },
    nextButtonLabel: {
        color: colors.white,
        fontSize: 18,
        paddingRight: 5
    },
})

export default BirthdayScreen;