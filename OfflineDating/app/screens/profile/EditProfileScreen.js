import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile, updateExperience } from '../../../redux/actions/currentUserActions';
import { experience, calculateLevel } from '../../../config/experience';
import { RNS3 } from 'react-native-aws3';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import RNPickerSelect from 'react-native-picker-select';
import RadioForm from 'react-native-simple-radio-button';
import TopNavBar from '../../../components/general/TopNavBar';
import EditableProfileSection from '../../../components/profile/EditableProfileSection';
import Button from '../../../components/general/Button';
import images from '../../../config/images';
import places from '../../../config/places';
import countries from '../../../config/countries';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { customUpdateUser } from '../../../../../src/graphql/customQueries';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

// The mapValues array is an array that stores the values used to determine the colors that will be loaded onto the TravelMapScreen.
// This array should be uploaded to the database when the "Done" button is pressed
// Values can only be 0 or 1: 0 = Never Been, 1 = Want to Go, and 2 = Been There
var mapValues = [];

function EditProfileScreen(props) {
	// Navigation
	const navigation = useNavigation();

	// Redux
	const dispatch = useDispatch();
	const updateCurrentUser = (profileInfo) => dispatch(editProfile(profileInfo));
	const currentUser = Object.assign(useSelector((state) => state.currentUser));

	// Theme
	const theme = currentUser.theme;
	const styles = useTheme(theme);

	// State
	const [profilePic, setProfilePic] = useState('');
	const [bio, setBio] = useState('');
	const [birthday, setBirthday] = useState(new Date(Date.now()));
	const [location, setLocation] = useState('');
	const [work, setWork] = useState('');
	const [school, setSchool] = useState('');
	const [btnsOnScreen, setBtnsOnScreen] = useState([]);
	const [showPicker, setShowPicker] = useState(false);

	const reducer = (sum, currentValue) => sum + (currentValue >= 1 ? 1 : 0);
	const prevPlaceCount = currentUser.places.reduce(reducer);

	let pickerItems = [];

	// Loads countries into the RNPickerSelect component
	for (let i = 0; i < countries.length; i++) {
		pickerItems.push({ label: countries[i], value: countries[i] });
	}

	// sorts the pickerItems list by country name
	pickerItems.sort((a, b) => (a.label > b.label ? 1 : -1));

	// Array that stores a set of radio buttons with values from radio_props for each country/state/province
	const radioButtons = [];

	// Array that stores options for each place's radio buttons
	const radio_props = [
		{ label: 'Never Been', value: 0 },
		{ label: 'Been There', value: 1 },
	];

	// Updates
	function updateMapValues(value, index) {
		mapValues[index] = value;
	}

	// Loading RadioButtons component for each place into radioButtons array
	for (let i = 0; i < places.length; i++) {
		radioButtons[i] = (
			<View style={styles.btnsContainer} key={i}>
				<View style={styles.btnContainer}>
					<Text style={styles.btnName}>{places[i].name}</Text>
					<RadioForm
						radio_props={radio_props}
						initial={mapValues[i]}
						formHorizontal={true}
						labelHorizontal={false}
						buttonColor={theme.colors.accent1}
						labelColor={theme.colors.text}
						selectedButtonColor={theme.colors.accent1}
						selectedLabelColor={theme.colors.text}
						animation={true}
						onPress={(value) => updateMapValues(value, i)}
					/>
				</View>
			</View>
		);
	}

	// when the picker changes region, load radio buttons for that region to screen
	function loadPlaces(value) {
		let temp = [];
		for (let i = value.start; i <= value.end; i++) {
			temp[i] = radioButtons[i];
		}
		setBtnsOnScreen(temp);
	}

	// Profile Picture Picker Code and Update Info
	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert('Sorry, we need camera roll permissions to make this work!');
				}
			}
		})();
	}, []);

	// Opens up the native image picker and allows the user to select from their own photos
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
		});
		if (!result.cancelled) {
			const manipResult = await ImageManipulator.manipulateAsync(result.uri, [{ resize: { height: 500 } }]);
			uploadPic(manipResult);
		}
	};

	// Uploads profile pic to Amazon S3
	function uploadPic(result) {
		const fileName = result.uri.replace(/\W/g, '') + '.png';
		const file = {
			uri: result.uri,
			name: fileName,
			type: 'image/png',
		};
		const options = {
			bucket: 'image-uploader-streetsmart1',
			region: 'us-east-2',
			accessKey: 'AKIAWB534HWTBRB2RR4J',
			secretKey: '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',
			successActionStatus: 201,
		};

		let imageLocationAWS;
		RNS3.put(file, options)
			.then((response) => {
				if (response.status !== 201) throw new Error('Failed to upload image to S3');
				imageLocationAWS = response.body.postResponse.location;
			})
			.then(() => {
				console.log('Image ---------- ', result.uri);
				console.log('ImageLocationAWS ---------- ', imageLocationAWS);
				setProfilePic(imageLocationAWS);
			});
	}

	function fetchUserInfo() {
		setBio(currentUser.bio);
		setBirthday(new Date(currentUser.birthday));
		setLocation(currentUser.location);
		setWork(currentUser.work);
		setSchool(currentUser.school);
		setProfilePic(currentUser.profilePic);
		if (currentUser.places != null) {
			mapValues = currentUser.places;
		}
	}

	useFocusEffect(
		useCallback(() => {
			fetchUserInfo();
		}, [])
	);

	// Updates the database with edited profile information
	function apply(bio, birthday, location, work, school, profilePic) {
		try {
			let exp = currentUser.exp;
			let newPlaceCount = mapValues.reduce(reducer);
			if (prevPlaceCount < newPlaceCount) {
				let diff = newPlaceCount - prevPlaceCount;

				// Increment experience
				let newExp = experience.addToTravelMap * diff + currentUser.exp;
				dispatch(updateExperience(newExp, currentUser.level));
				exp = newExp;
			}

			let pfp = profilePic == '' || profilePic == undefined || profilePic == null ? currentUser.profilePic : profilePic;
			currentUser.bio = bio;
			currentUser.birthday = birthday;
			currentUser.location = location;
			currentUser.work = work;
			currentUser.school = school;
			currentUser.profilePic = pfp;
			updateCurrentUser(currentUser);
			submitToDynamo(bio, birthday, location, mapValues, profilePic, school, work, exp);
			navigation.navigate('Profile');
		} catch (error) {
			console.log(error);
		}
	}

	const submitToDynamo = async (bio, birthday, country, mapValues, profilePic, school, work, exp) => {
		const authUser = await Auth.currentAuthenticatedUser();
		API.graphql(
			graphqlOperation(customUpdateUser, {
				id: authUser.username,
				bio: bio,
				birthday: birthday,
				country: country,
				places: mapValues,
				profilePicURL: profilePic,
				school: school,
				work: work,
				exp: exp,
			})
		);
	};

	const pickerSelectStyles = StyleSheet.create({
		inputIOS: {
			fontSize: 16,
			paddingVertical: 12,
			paddingHorizontal: 10,
			borderWidth: 1,
			borderColor: theme.colors.border,
			borderRadius: 4,
			color: theme.colors.text,
			paddingRight: 30, // to ensure the text is never behind the icon
		},
		inputIOSContainer: {
			width: '100%',
			paddingTop: 10,
		},
		inputAndroid: {
			fontSize: 16,
			paddingHorizontal: 10,
			paddingVertical: 8,
			borderWidth: 0.5,
			borderColor: theme.colors.border,
			borderRadius: 8,
			color: theme.colors.text,
			paddingRight: 30, // to ensure the text is never behind the icon
		},
	});

	return (
		<View style={styles.container}>
			<TopNavBar type={'back'} navigateTo={'Profile'} title={'Edit Your Profile'} />

			<KeyboardAwareScrollView
				style={{ flex: 1 }}
				contentContainerStyle={styles.scroll}
				resetScrollToCoords={{ x: 0, y: 0 }}
				scrollEnabled={true}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				{/* Profile Pic Section */}
				<View style={styles.pfpContainer}>
					<TouchableOpacity onPress={pickImage}>
						{/* if image is null display placeholder image, if not display image chosen */}
						{profilePic == '' || profilePic == undefined || profilePic == null ? (
							<Image source={images.pfpWhite} style={styles.pfp} />
						) : (
							<Image source={{ uri: profilePic }} style={styles.pfp} />
						)}
					</TouchableOpacity>
				</View>

				{/* About Me Section */}
				<View style={styles.sectionContainer}>
					<View style={{ flex: 1 }}>
						<EditableProfileSection type={'text'} text={bio} title={'About Me'} onChange={(bio) => setBio(bio)} multiline={true} />

						<EditableProfileSection
							type={'date'}
							date={birthday}
							title={'Birthday'}
							onChange={(event, selectedDate) => {
								const date = selectedDate || birthday;
								setBirthday(date);
								setShowPicker(false);
							}}
							showPicker={showPicker}
							onPressShow={() => setShowPicker(true)}
						/>

						<EditableProfileSection
							type={'select'}
							text={location}
							title={'Country'}
							items={pickerItems}
							onChange={(location) => setLocation(location)}
							placeholder={{
								label: currentUser.location != '' ? currentUser.location : 'Select a country',
								value: currentUser.location,
								color: theme.colors.placeholder,
							}}
							textInputProps={{
								color: theme.colors.text,
								height: 40,
								textAlign: 'left',
								fontSize: 18,
								backgroundColor: theme.colors.background,
							}}
						/>

						<EditableProfileSection type={'text'} text={work} title={'Work'} onChange={(work) => setWork(work)} />

						<EditableProfileSection type={'text'} text={school} title={'School'} onChange={(school) => setSchool(school)} />
					</View>
				</View>

				{/* Region Picker and Place Radio Buttons */}
				<View style={styles.sectionContainer}>
					<View style={styles.pickerContainer}>
						<Text style={styles.sectionTitle}>Travel Map</Text>
						<RNPickerSelect
							onValueChange={(value) => loadPlaces(value)}
							style={pickerSelectStyles}
							placeholder={{
								label: 'Select a Region:',
								value: 0,
								color: 'black',
							}}
							items={[
								{ label: 'USA (West)', value: { start: 0, end: 10 } },
								{ label: 'USA (Midwest)', value: { start: 11, end: 22 } },
								{ label: 'USA (Southwest)', value: { start: 23, end: 26 } },
								{ label: 'USA (Southeast)', value: { start: 27, end: 38 } },
								{ label: 'USA (Northeast)', value: { start: 39, end: 50 } },
								{ label: 'Canada and Greenland', value: { start: 51, end: 64 } },
								{ label: 'Central America', value: { start: 65, end: 72 } },
								{ label: 'Caribbean', value: { start: 73, end: 78 } },
								{ label: 'South America', value: { start: 79, end: 91 } },
								{ label: 'Northern Europe', value: { start: 92, end: 104 } },
								{ label: 'Southern Europe', value: { start: 105, end: 116 } },
								{ label: 'Eastern Europe', value: { start: 117, end: 127 } },
								{ label: 'Western Europe', value: { start: 128, end: 133 } },
								{ label: 'North Africa', value: { start: 134, end: 140 } },
								{ label: 'South Africa', value: { start: 141, end: 150 } },
								{ label: 'Central Africa', value: { start: 151, end: 158 } },
								{ label: 'East Africa', value: { start: 159, end: 169 } },
								{ label: 'West Africa', value: { start: 170, end: 183 } },
								{ label: 'Middle East', value: { start: 184, end: 201 } },
								{ label: 'Central Asia', value: { start: 202, end: 206 } },
								{ label: 'East Asia', value: { start: 207, end: 212 } },
								{ label: 'South Asia', value: { start: 213, end: 219 } },
								{ label: 'Southeast Asia', value: { start: 220, end: 229 } },
								{ label: 'Australia', value: { start: 230, end: 238 } },
								{ label: 'Oceania', value: { start: 239, end: 244 } },
								{ label: 'Antarctica', value: { start: 245, end: 245 } },
							]}
						/>
					</View>
					<View style={{ flex: 1 }}>{btnsOnScreen}</View>
				</View>

				{/* Done Button */}
				<Button
					label={'Done'}
					size={'x-large'}
					color={theme.colors.accent1}
					onPress={() => apply(bio, birthday, location, work, school, profilePic)}
					style={{
						marginBottom: 15,
					}}
				/>
			</KeyboardAwareScrollView>
		</View>
	);
}

function useTheme(theme) {
	const styles = StyleSheet.create({
		btnContainer: {
			flexDirection: 'row',
			height: 75,
			alignItems: 'center',
		},
		btnsContainer: {
			flexDirection: 'row',
			width: screenWidth,
			alignItems: 'center',
			justifyContent: 'flex-start',
			borderBottomWidth: 1,
			borderBottomColor: theme.colors.border,
		},
		btnName: {
			width: '57%',
			paddingLeft: 15,
			fontSize: 16,
			fontWeight: 'bold',
			color: theme.colors.text,
		},
		container: {
			flex: 1,
			flexDirection: 'column',
			backgroundColor: theme.colors.background,
		},
		pfp: {
			width: 150,
			height: 150,
			margin: 10,
			borderRadius: 100,
			borderColor: theme.colors.primary,
			borderWidth: 7,
			backgroundColor: theme.colors.primary_light,
		},
		pfpContainer: {
			width: '100%',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: theme.colors.primary_light,
		},
		pickerContainer: {
			width: '90%',
			height: 100,
			paddingTop: 20,
			marginBottom: 20,
		},
		scroll: {
			zIndex: 0,
			justifyContent: 'flex-start',
			alignItems: 'center',
			backgroundColor: theme.colors.background,
		},
		sectionContainer: {
			flex: 1,
			width: '100%',
			alignItems: 'center',
		},
		sectionTitle: {
			fontSize: 18,
			fontWeight: 'bold',
			color: theme.colors.text,
		},
	});

	return styles;
}

export default EditProfileScreen;
