import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function Button({ label, color, labelColor, size, onPress, style }) {
    // Theme
    const theme = useSelector((state) => state.currentUser.theme);
    const styles = useTheme(theme);

    // Variables
    var width;
    const SMALL = screenWidth * 0.60;
    const MEDIUM = screenWidth * 0.70;
    const LARGE = screenWidth * 0.80;
    const X_LARGE = screenWidth * 0.90;

    if (size == 'large') width = LARGE;
    else if (size == 'medium') width = MEDIUM;
    else if (size == 'small') width = SMALL;
    else width = X_LARGE;

    return (
        <View style={[styles.container, style ? { position: style.position, bottom: style.bottom, top: style.top } : {}]}>
            <TouchableOpacity
                onPress={onPress}
                style={[
                    styles.button,
                    {
                        ...style,
                        position: 'relative',
                        top: 0,
                        bottom: 0,
                        backgroundColor: color ? color : theme.colors.accent1,
                        width: width,
                    }]}
            >
                <Text style={[styles.label, { color: labelColor ? labelColor : theme.colors.white }]}>
                    {label}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

function useTheme(theme) {
    const styles = StyleSheet.create({
        button: {
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 999,
        },
        container: {
            width: screenWidth,
            alignItems: 'center',
            justifyContent: 'center',
        },
        label: {
            fontSize: 25,
        },
    });

    return styles;
}

Button.propTypes = {
    label: PropTypes.string,
    color: PropTypes.string,
    labelColor: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'x-large']),
    onPress: PropTypes.func,
}

export default Button;