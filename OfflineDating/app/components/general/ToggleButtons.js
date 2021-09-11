import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function ToggleButtons({ toggleArray, buttonNames, onPress1, onPress2, onPress3, positionAbsolute, spaceAbove, spaceBelow }) {
    // Theme
    const theme = useSelector((state) => state.currentUser.theme);
    const styles = useTheme(theme);

    // State
    const [toggle, setToggle] = useState(toggleArray);

    // Variables
    const numButtons = toggleArray.length;
    const buttonWidth = numButtons === 2 ? '50%' : '33.3%';
    const position = positionAbsolute ? 'absolute' : 'relative';
    const marginTop = spaceAbove ? spaceAbove : 0;
    const marginBottom = spaceBelow ? spaceBelow : 0;

    function switchToggle(button) {
        if (toggle[button] == false) {
            let tempArr = [];
            for (let i = 0; i < numButtons; i++) { tempArr[i] = false; }
            tempArr[button] = true;
            setToggle(tempArr);
        }
    }

    return (
        <View style={[styles.container, { position: position, marginTop: marginTop, marginBottom: marginBottom }]}>
            <View style={styles.rowbuttons}>
                <TouchableOpacity
                    style={[toggle[0] ? styles.currentButton : styles.buttonElements, { width: buttonWidth }]}
                    onPress={() => {
                        switchToggle(0);
                        onPress1 ? onPress1() : console.log("onPress1");
                    }}
                >
                    <Text style={styles.buttonText} numberOfLines={2}>{buttonNames[0]}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[toggle[1] ? styles.currentButton : styles.buttonElements, { width: buttonWidth }]}
                    onPress={() => {
                        switchToggle(1);
                        onPress2 ? onPress2() : console.log("onPress2");
                    }}
                >
                    <Text style={styles.buttonText} numberOfLines={2}>{buttonNames[1]}</Text>
                </TouchableOpacity>

                {
                    numButtons > 2 &&
                    <TouchableOpacity
                        style={[toggle[2] ? styles.currentButton : styles.buttonElements, { width: buttonWidth }]}
                        onPress={() => {
                            switchToggle(2);
                            onPress3 ? onPress3() : console.log("onPress3");
                        }}
                    >
                        <Text style={styles.buttonText} numberOfLines={2}>{buttonNames[2]}</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}

function useTheme(theme) {
    const styles = StyleSheet.create({
        buttonElements: {
            width: '33.3%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
        },
        buttonText: {
            fontSize: 20,
            color: theme.colors.white,
        },
        container: {
            width: screenWidth,
            position: 'absolute',
            alignItems: 'center',
            zIndex: 99,
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 5, },
            shadowColor: theme.colors.black,
            shadowOpacity: 0.5,
        },
        currentButton: {
            height: '100%',
            width: '33.3%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.accent1_light,
            borderRadius: 999,
            paddingLeft: 10,
            paddingRight: 10,
        },
        rowbuttons: {
            zIndex: 100,
            height: 40,
            flexDirection: 'row',
            width: '95%',
            justifyContent: 'space-evenly',
            backgroundColor: theme.colors.accent1,
            borderRadius: 100,
        },
    });

    return styles;
}

ToggleButtons.propTypes = {
    toggleArray: PropTypes.arrayOf(PropTypes.bool).isRequired,
    buttonNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    onPress1: PropTypes.func,
    onPress2: PropTypes.func,
    onPress3: PropTypes.func,
    positionAbsolute: PropTypes.bool,
    spaceAbove: PropTypes.number,
}

export default ToggleButtons;