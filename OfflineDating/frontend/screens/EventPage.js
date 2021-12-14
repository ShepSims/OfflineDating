import React, { useEffect, useState } from 'react';
import { View, Image, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function EventPage() {
	// Navigation
	const navigation = useNavigation();

	// Theme
	const styles = useTheme();

	// Variables

	const [data, setData] = useState([]);
	// State

	const renderEvent = ({ item }) => (
		<View style={{ borderColor: 'white', borderWidth: 2, margin: 10 }}>
			<Image source={{ uri: item.coverPhoto }} style={styles.img} />

			<View style={{ paddingTop: 15, paddingBottom: 30, borderColor: 'white' }}>
				<Text style={styles.title}>{item.title}</Text>
				<View style={[styles.info, { width: screenWidth * 0.9 }]}>
					<Text style={styles.normalText}>{item.description}</Text>
				</View>

				<View style={[styles.info, { width: screenWidth * 0.9 }]}>
					<Text style={styles.normalText}>{item.location}</Text>
				</View>

				<View style={styles.dateTime}>
					<View style={styles.info}>
						<Text style={styles.boldText}>{item.date}</Text>
					</View>

					<View style={styles.info}>
						<Text style={styles.boldText}>{item.time}</Text>
					</View>
				</View>
			</View>
		</View>
	);
	useEffect(() => {
		setData([
			{
				ref: 0,
				title: 'Get HIIT on',
				description: 'Come get hiit on by the hottest singles in your area',
				date: moment(new Date(Date.now())).format('MMM Do, YYYY'),
				time: moment(new Date(Date.now())).format('hh:mm A'),
				location: 'PB Gym',
				coverPhoto:
					'https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/blogs/3762/images/DUDfOeTOqk6vh7L84WGw_group_fitness.jpg',
			},
			{
				ref: 1,
				title: 'Tramigo #001',
				description: 'The first Tramigo x Offline Dating collab',
				date: moment(new Date(Date.now())).format('MMM Do, YYYY'),
				time: moment(new Date(Date.now())).format('hh:mm A'),
				location: 'Sheps house',
				coverPhoto: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg',
			},
		]);
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
		},
		header: {},
		img: {
			width: '100%',
			height: 250,
		},
		info: {
			fontWeight: 'bold',
			padding: 5,
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
			textAlign: 'left',
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
