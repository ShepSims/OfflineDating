import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Text, ImageBackground, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MatchSquare from '../components/MatchSquare';
import * as ImagePicker from 'expo-image-picker';

/**
 * @param *
 * @returns A view where people can see buddie suggestions and meet with people they've never met
 */
const screenHeight = Math.round(Dimensions.get('window').height); // Gets the height of the device's screen
const screenWidth = Math.round(Dimensions.get('window').width);

const firstName = 'Shep';
const lastName = 'Sims';

function ProfileScreen() {
	const [profilePic, setProfilePic] = useState({ uri: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg' });

	const [instagram, setInstagram] = useState('shep_sims');
	const [phone, setPhone] = useState(3049821999);

	const navigation = useNavigation();

	// Theme
	const styles = useTheme();
	// Opens up the native image picker and allows the user to select from their own photos
	async function pickImage() {
		try {
			let response = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
			});

			setProfilePic(response);
			return null;
		} catch (error) {
			console.log('Error picking or manipulating image:', error);
			return null;
		}
	}

	return (
		<View style={styles.container}>
			<ImageBackground source={profilePic} style={styles.img} imageStyle={styles.img}>
				<View style={styles.infoContainerPressed}>
					<TouchableOpacity style={styles.instagram} onPress={() => Linking.openURL('instagram://user?username=shep_sims')}>
						<Text style={styles.buttonText}> {'instagram - ' + '@shep_sims'}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.phoneButton} onPress={() => openLink('sms:&addresses=3049821999&body=My sms text')}>
						<Text style={styles.buttonText}> {'phone - ' + phone}</Text>
					</TouchableOpacity>
					<View style={styles.blackLine} />
					<TouchableOpacity style={styles.dismissButton} onPress={() => pickImage()}>
						<Text style={styles.buttonText}> Change Profile Picture</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
			<Text style={styles.name}>{firstName + ' ' + lastName}</Text>
		</View>
	);
}

function useTheme() {
	const styles = StyleSheet.create({
		column: {
			width: '45%',
		},
		container: {
			flex: 1,
			width: '100%',
			alignItems: 'center',
			justifyContent: 'center',
		},
		scroll: {
			zIndex: 0,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#000000',
			paddingTop: '2%',
			paddingBottom: '5%',
			alignItems: 'center',
			justifyContent: 'center',
			width: screenWidth,
		},
		img: {
			width: screenWidth / 1.1,
			height: screenHeight / 1.5,
			alignItems: 'center',
			justifyContent: 'flex-end',
		},
		infoContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			width: '100%',
			height: 45,
			backgroundColor: 'rgba(0, 0, 0,0.45)',
		},
		infoContainerPressed: {
			flexDirection: 'column',
			alignItems: 'center',
			width: '100%',
			height: '100%',
			backgroundColor: 'rgba(0, 0, 0,0.45)',
		},
		text: {
			flexDirection: 'row',
			position: 'absolute',
			color: '#F0FFFF',
			fontWeight: 'bold',
			fontSize: 25,
			left: 15,
		},
		matchButton: {
			position: 'absolute',
			color: '#F0FFFF',
			height: 100,
			top: '25%',
		},
		name: {
			color: 'white',
			fontSize: 30,
			padding: 25,
		},
		instagram: {
			position: 'absolute',
			color: '#F0FFFF',
			top: '20%',
		},
		dismissButton: {
			flexDirection: 'column',
			position: 'absolute',
			color: '#000000',
			bottom: '25%',
		},
		blackLine: {
			borderBottomColor: 'black',
			borderBottomWidth: 1,
			width: '100%',
			textAlign: 'center',
			fontSize: 25,
			top: '50%',
			color: '#F0FFFF',
		},
		buttonText: {
			fontSize: 18,
			color: '#F0FFFF',
		},
		phoneButton: {
			position: 'absolute',
			color: '#F0FFFF',
			height: 100,
			top: '28%',
		},
	});

	return styles;
}

export default ProfileScreen;
