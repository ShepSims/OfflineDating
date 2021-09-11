import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../config/colors';

function ErrorMessage({ message }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 265,
        backgroundColor: colors.red,
        borderRadius: 7,
        alignItems: 'center',
    },
    text: {
        width: '100%',
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 2,
        textAlign: 'center',
    }
});

ErrorMessage.propTypes = {
    message: PropTypes.string,
};

export default ErrorMessage;