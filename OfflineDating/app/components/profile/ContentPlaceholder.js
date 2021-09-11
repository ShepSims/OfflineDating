import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../../assets/icons/TramigoIcon';
import colors from '../../config/colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function ContentPlaceholder({ iconName, text }) {
    return (
        <View style={styles.container}>
            <Icon name={iconName} size={50} color={colors.green} style={styles.icon} />
            <Text>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: screenHeight * .45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginBottom: 30,
    }
});

ContentPlaceholder.propTypes = {
    iconName: PropTypes.string,
    text: PropTypes.string,
};

export default ContentPlaceholder;