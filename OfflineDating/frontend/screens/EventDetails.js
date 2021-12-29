import React, { useEffect, useState } from 'react';
import { View, Image, Text, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { midnight } from '../../assets/themes';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function EventDetails() {
	// Navigation
	const route = useRoute();
	const navigation = useNavigation();
	const events = useSelector((state) => state.events);
	const item = events[route.params.id];

	// Theme
	const theme = midnight;
	const styles = useTheme();

	// Variables

	const [data, setData] = useState([]);
	// State

	useEffect(() => {
		setData(Object.values(events));
	}, []);

	return (
		<View style={styles.container}>
			<Image source={{ uri: item.coverPhoto }} style={styles.img} />
			<View style={{ paddingTop: 15, paddingBottom: 30, borderColor: 'white' }}>
				<Text style={styles.title}>{item.title}</Text>
				<View style={[styles.info, { width: screenWidth * 0.9 }]}>
					<Text style={styles.normalText}>{item.description}</Text>
				</View>

				<View style={styles.dateTime}>
					<View style={styles.info}>
						<Text style={styles.boldText}>{item.date}</Text>
					</View>

					<View style={styles.info}>
						<Text style={styles.boldText}>{item.time}</Text>
					</View>
				</View>
				<View style={[styles.info, { width: screenWidth * 0.9 }]}>
					<Text style={styles.normalText}>at {item.location}</Text>
				</View>
				<TouchableOpacity onPress={() => navigation.navigate('Match', { params: { theme: theme, event: item.id } })}>
					<Text style={styles.match}> Match Now!</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

function useTheme() {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'flex-start',
			backgroundColor: 'black',
		},
		dateTime: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center',
			paddingTop: 40,
		},
		header: {},
		img: {
			width: '100%',
			height: 250,
		},
		info: {
			fontWeight: 'bold',
			flexDirection: 'row',
			alignItems: 'center',
		},
		boldText: {
			fontWeight: 'bold',
			fontSize: 18,
			color: 'white',
			textAlign: 'left',
			marginLeft: 10,
		},
		normalText: {
			fontSize: 17,
			color: 'white',
			textAlign: 'center',
			marginLeft: 10,
		},
		match: {
			fontSize: 25,
			color: 'white',
			textAlign: 'center',
			marginTop: 50,
			borderColor: 'white',
			borderWidth: 2,
		},
		scroll: {
			backgroundColor: 'black',
			paddingBottom: screenHeight * 0.1,
		},
		title: {
			alignSelf: 'center',
			fontSize: 30,
			color: 'white',
			fontWeight: 'bold',
			textAlign: 'center',
			padding: 5,
		},
	});

	return styles;
}

export default EventDetails;
