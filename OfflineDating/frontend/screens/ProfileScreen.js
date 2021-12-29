import React, { useEffect, useState, useCallback } from 'react';
import { TextInput, View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Text, ImageBackground, RefreshControl } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import MatchSquare from '../components/MatchSquare';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { storeCurrentUser } from '../../store/actions/currentUserActions';

/**
 * @param *
 * @returns A view where people can see buddie suggestions and meet with people they've never met
 */
const screenHeight = Math.round(Dimensions.get('window').height); // Gets the height of the device's screen
const screenWidth = Math.round(Dimensions.get('window').width);

const firstName = 'Shep';
const lastName = 'Sims';

function ProfileScreen() {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.currentUser);
	const [profilePic, setProfilePic] = useState({ uri: currentUser.profilePic });

	const [instagram, setInstagram] = useState(currentUser.instagram);
	const [phone, setPhone] = useState(currentUser.phone);
	const [name, setName] = useState(currentUser.name);
	const [saved, setSaved] = useState(true);

	const navigation = useNavigation();

	useEffect(() => {
		setSaved(false);
	}, [name, phone, instagram, profilePic]);

	useFocusEffect(
		useCallback(() => {
			setSaved(true);
		}, [])
	);

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
			{!saved && (
				<Text
					style={styles.save}
					onPress={() => {
						setSaved(true);
						let u = { ...currentUser };
						u.profilePic = profilePic.uri;
						u.name = console.log(u);
						dispatch(storeCurrentUser(u));
					}}
				>
					Save
				</Text>
			)}
			<ImageBackground source={profilePic} style={styles.img} imageStyle={styles.img}>
				<View style={styles.infoContainerPressed}>
					<Text style={styles.instagramText}>Instagram</Text>
					<TextInput style={styles.buttonText} onChangeText={setInstagram} value={instagram} placeholder='@shep_sims' />
					<Text style={styles.phoneText}>Phone</Text>
					<TextInput style={styles.phoneButton} onChangeText={setPhone} value={phone} placeholder='3049821999' keyboardType='numeric' />
					<View style={styles.blackLine} />
				</View>
				<TouchableOpacity style={styles.dismissButton} onPress={() => pickImage()}>
					<Text style={styles.normalText}> Change Profile Picture</Text>
				</TouchableOpacity>
			</ImageBackground>
			<TextInput style={styles.name} onChangeText={setName} value={name} placeholder='Shep Sims' />
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
		save: {
			color: 'white',
			fontSize: 15,
			alignContent: 'flex-end',
		},
		instagram: {
			position: 'absolute',
			color: '#F0FFFF',
			top: '20%',
		},
		instagramText: {
			position: 'absolute',
			color: '#F0FFFF',
			top: '16%',
		},
		dismissButton: {
			flexDirection: 'column',
			justifyContent: 'center',
			alignContent: 'center',
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
			position: 'absolute',
			color: '#F0FFFF',
			top: '20%',
		},
		phoneButton: {
			position: 'absolute',
			color: '#F0FFFF',
			height: 100,
			top: '28%',
		},
		phoneText: {
			position: 'absolute',
			color: '#F0FFFF',
			height: 100,
			top: '32%',
		},
		normalText: {
			color: 'white',
			fontSize: 15,
		},
	});

	return styles;
}

export default ProfileScreen;
