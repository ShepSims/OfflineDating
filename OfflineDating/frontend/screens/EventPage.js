import React, { useEffect, useState } from 'react';
import { View, Image, Text, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { midnight } from '../../assets/themes';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function EventPage() {
	// Navigation
	const navigation = useNavigation();
	const events = useSelector((state) => state.events);
	const currentUser = useSelector((state) => state.currentUser);

	// Theme
	const theme = midnight;
	const styles = useTheme();

	// Variables

	const [data, setData] = useState([]);
	// State

	const renderEvent = ({ item }) => (
		<View style={{ borderColor: 'white', borderWidth: 2, margin: 10 }}>
			<TouchableOpacity onPress={() => navigation.navigate('Event Details', { theme: theme, id: item.id })}>
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
				</View>
			</TouchableOpacity>
		</View>
	);
	useEffect(() => {
		setData(Object.values(events));
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				renderItem={renderEvent}
				keyExtractor={(event) => event.ref.toString()}
				contentContainerStyle={styles.scroll}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			/>
			{currentUser.role == 'owner' && (
				<Text style={styles.addEvent} onPress={() => navigation.navigate('CreateEvent')}>
					Add Event
				</Text>
			)}
		</View>
	);
}

function useTheme() {
	const styles = StyleSheet.create({
		addEvent: {
			fontSize: 17,
			color: 'white',
			textAlign: 'center',
			padding: 20,
		},
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

export default EventPage;
