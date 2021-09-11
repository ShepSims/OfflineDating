import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Pressable, Modal, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';
import RadioForm from 'react-native-simple-radio-button';
import Icon from '../../assets/icons/TramigoIcon';
import places from '../../config/places';
import colors from '../../config/colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function SelectPlacesModal({ onChangeMapValues }) {
    // Array that stores the buttons that should currently be on the screen
    let temp = Array(places.length).fill(0);
    const [mapValues, setMapValues] = useState(temp);
    const [btnsOnScreen, setBtnsOnScreen] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    // Array that stores a set of radio buttons with values from radio_props for each country/state/province
    const radioButtons = [];

    // Array that stores options for each place's radio buttons
    const radio_props = [
        { label: 'Never Been', value: 0 },
        { label: 'Been There', value: 1 },
    ];

    // Updates
    function updateMapValues(value, index) {
        let temp = Object.assign(mapValues);
        temp[index] = value;
        setMapValues(temp);
    }

    // Loading RadioButtons component for each place into radioButtons array
    for (let i = 0; i < places.length; i++) {
        radioButtons[i] = (
            <View style={styles.btnsContainer} key={i}>
                <View style={styles.btnContainer}>
                    <Text style={styles.btnName}>{places[i].name}</Text>
                    <RadioForm
                        radio_props={radio_props}
                        initial={mapValues[i]}
                        formHorizontal={true}
                        labelHorizontal={false}
                        buttonColor={colors.orange}
                        labelColor={colors.black}
                        selectedButtonColor={colors.orange}
                        animation={true}
                        onPress={(value) => updateMapValues(value, i)}
                    />
                </View>
            </View>
        );
    }

    // when the picker changes region, load radio buttons for that region to screen
    function loadPlaces(value) {
        let temp = [];
        for (let i = value.start; i <= value.end; i++) {
            temp[i] = radioButtons[i];
        }
        setBtnsOnScreen(temp);
    }

    return (
        <>
            <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.selectPlacesBtn}>
                <Text style={{ fontSize: 18, color: colors.gray }}>Select some places</Text>
            </TouchableOpacity>
            <Modal animationType={"slide"} transparent={true} visible={isVisible}>
                <View style={styles.modalView}>
                    {/* Region Picker and Place Radio Buttons */}
                    <View style={styles.sectionContainer}>
                        <Pressable style={styles.modalClose} onPress={() => {
                            setIsVisible(false);
                            onChangeMapValues(mapValues);
                        }}>
                            <Icon name={'x'} color={colors.black} size={20} />
                        </Pressable>
                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                onValueChange={(value) => loadPlaces(value)}
                                style={pickerSelectStyles}
                                useNativeAndroidPickerStyle={false}
                                placeholder={{
                                    label: 'Select a region:',
                                    value: 0,
                                    color: colors.black,
                                }}
                                textInputProps={{
                                    color: colors.gray,
                                }}
                                items={[
                                    { label: 'USA (West)', value: { start: 0, end: 10 } },
                                    { label: 'USA (Midwest)', value: { start: 11, end: 22 } },
                                    { label: 'USA (Southwest)', value: { start: 23, end: 26 } },
                                    { label: 'USA (Southeast)', value: { start: 27, end: 38 } },
                                    { label: 'USA (Northeast)', value: { start: 39, end: 50 } },
                                    { label: 'Canada and Greenland', value: { start: 51, end: 64 } },
                                    { label: 'Central America', value: { start: 65, end: 72 } },
                                    { label: 'Caribbean', value: { start: 73, end: 78 } },
                                    { label: 'South America', value: { start: 79, end: 91 } },
                                    { label: 'Northern Europe', value: { start: 92, end: 104 } },
                                    { label: 'Southern Europe', value: { start: 105, end: 116 } },
                                    { label: 'Eastern Europe', value: { start: 117, end: 127 } },
                                    { label: 'Western Europe', value: { start: 128, end: 133 } },
                                    { label: 'North Africa', value: { start: 134, end: 140 } },
                                    { label: 'South Africa', value: { start: 141, end: 150 } },
                                    { label: 'Central Africa', value: { start: 151, end: 158 } },
                                    { label: 'East Africa', value: { start: 159, end: 169 } },
                                    { label: 'West Africa', value: { start: 170, end: 183 } },
                                    { label: 'Middle East', value: { start: 184, end: 201 } },
                                    { label: 'Central Asia', value: { start: 202, end: 206 } },
                                    { label: 'East Asia', value: { start: 207, end: 212 } },
                                    { label: 'South Asia', value: { start: 213, end: 219 } },
                                    { label: 'Southeast Asia', value: { start: 220, end: 229 } },
                                    { label: 'Australia', value: { start: 230, end: 238 } },
                                    { label: 'Oceania', value: { start: 239, end: 244 } },
                                    { label: 'Antarctica', value: { start: 245, end: 245 } },
                                ]}
                            />
                        </View>
                        <ScrollView
                            style={styles.scroll}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                            {btnsOnScreen}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        height: 75,
        alignItems: 'center',
    },
    btnsContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    btnName: {
        width: '45%',
        paddingLeft: 15,
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.black,
    },
    modalClose: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    modalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    pickerContainer: {
        width: '80%',
        height: 50,
        marginTop: 20,
    },
    scroll: {
        flex: 1,
    },
    sectionContainer: {
        height: screenHeight * 0.92,
        width: screenWidth * 0.9,
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 25,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
    },
    selectPlacesBtn: {
        backgroundColor: colors.white,
        width: screenWidth * 0.6,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 4,
        color: colors.black,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputIOSContainer: {
        width: '100%',
        paddingTop: 10,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 0.5,
        borderColor: colors.gray,
        borderRadius: 8,
        color: colors.black,
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: colors.white
    },
});

SelectPlacesModal.propTypes = {
    onChangeMapValues: PropTypes.func,
};

export default SelectPlacesModal;