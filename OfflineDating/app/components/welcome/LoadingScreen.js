import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { wait } from '../../config/functions';
import PropTypes from 'prop-types';
import Icon from '../../assets/icons/TramigoIcon';
import colors from '../../config/colors';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function LoadingScreen({ name }) {
	const [text, setText] = useState('Sit tight while we load your world.');

	const loadingMessages = [
		'Getting your personalized activity suggestions',
		"Taking a bubble bath in Pooh's honey",
		'Adding activity data',
		"Sitting on the Pope's big pointy hat",
		'Getting your trip suggestions',
		"Stealing Santa's Sleigh",
		"Extracting Austin Powers' Mojo",
		'Adding trip data',
		'Calculating the average windspeed velocity of an unladen European swallow',
		'Adding other user data',
		'Bending Space-Time so that the upcoming weekend will be longer',
		'Testing your patience',
		'Locating your Tramigos',
		'Dividing by zero',
		'Making rock sculptures with Sir Joe the Man',
		'Completing the Pokédex',
		"Throwing off the Emperor's groove",
		'Using the Infinity Gauntlet to cut the loading time in half',
		'Powering up the Master Sword',
		'Loading your travel map',
		'Securing the Krabby Patty Secret Formula',
	];

	function updateText() {
		if (loadingMessages.length > 1) {
			let m = loadingMessages.splice(Math.floor(Math.random() * loadingMessages.length), 1);
			setText(m);
			wait(2000).then(() => updateText());
		}
	}

	useFocusEffect(
		useCallback(() => {
			updateText();
		}, [])
	);

	return (
		<View style={styles.container}>
			<Icon name={'tramigo-full-logo'} color={colors.orange} size={90} />
			<ActivityIndicator size='large' color={colors.green} style={styles.loading} />
			<Text style={styles.welcome}>Welcome back, {name}!</Text>
			<Text style={styles.text}>{text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		zIndex: 999,
		position: 'absolute',
		width: screenWidth,
		height: screenHeight * 1.1,
		backgroundColor: colors.teal,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loading: {
		paddingVertical: 50,
	},
	logo: {
		width: 250,
		height: 84,
	},
	welcome: {
		width: screenWidth * 0.9,
		paddingBottom: 10,
		fontSize: 20,
		textAlign: 'center',
		color: colors.white,
		fontWeight: 'bold',
	},
	text: {
		width: screenWidth * 0.9,
		fontSize: 16,
		textAlign: 'center',
		color: colors.white,
	},
});

LoadingScreen.propTypes = {
	name: PropTypes.string,
};

export default LoadingScreen;
