import React, { useEffect, useState } from 'react';
import { View, Image, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { midnight } from '../../assets/themes';
import * as ImagePicker from 'expo-image-picker';
import { TextInput } from 'react-native-gesture-handler';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function CreateEvent() {
	// Navigation
	const route = useRoute();
	const navigation = useNavigation();
	const events = useSelector((state) => state.events);

	const [coverPhoto, setCoverPhoto] = useState('');
	const [title, setTitle] = useState('');
	const [info, setInfo] = useState('');
	const [time, setTime] = useState(new Date(Date.now()));
	const [date, setDate] = useState(new Date(Date.now()));
	const [location, setLocation] = useState('');
	// Theme
	const theme = midnight;
	const styles = useTheme();

	// Variables

	const [data, setData] = useState([]);
	// State

	async function pickImage() {
		try {
			let response = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
			});
			setCoverPhoto(response.uri);
			return null;
		} catch (error) {
			console.log('Error picking or manipulating image:', error);
			return null;
		}
	}

	useEffect(() => {
		setData(Object.values(events));
	}, []);

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => pickImage()}>
				<Image source={{ uri: coverPhoto }} style={styles.img} />
				{!coverPhoto && <Text style={styles.normalText}> Click here to add a cover photo</Text>}
			</TouchableOpacity>
			<View style={{ paddingTop: 15, paddingBottom: 30, borderColor: 'white' }}>
				<TextInput placeholderTextColor={'#F0FFFF'} style={styles.title} onChangeText={setTitle} value={title} placeholder='title' />
				<View style={[styles.info, { width: screenWidth }]}>
					<TextInput
						placeholderTextColor={'#F0FFFF'}
						style={styles.info}
						onChangeText={setInfo}
						value={info}
						placeholder='give your event some info'
					/>
				</View>

				<View style={styles.info}>
					<TextInput
						placeholderTextColor={'#F0FFFF'}
						style={styles.boldText}
						onChangeText={setTime}
						value={time}
						placeholder={'When day is this event going down?'}
					/>
				</View>

				<View style={styles.info}>
					<TextInput
						placeholderTextColor={'#F0FFFF'}
						style={styles.boldText}
						onChangeText={setDate}
						value={date}
						placeholder={'What time is this event going down?'}
					/>
				</View>
				<View style={[styles.info, { width: screenWidth * 0.9 }]}>
					<TextInput
						placeholderTextColor={'#F0FFFF'}
						style={styles.boldText}
						onChangeText={setLocation}
						value={location}
						placeholder={'Where is this event going down?'}
					/>
				</View>
				<TouchableOpacity onPress={() => navigation.navigate('Events', { theme: theme })}>
					<Text style={styles.match}> Publish Event</Text>
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
			color: 'white',
			padding: 15,
		},
		boldText: {
			fontWeight: 'bold',
			fontSize: 18,
			color: '#F0FFFF',
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

export default CreateEvent;
