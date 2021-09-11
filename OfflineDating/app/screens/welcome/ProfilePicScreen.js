import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RNS3 } from 'react-native-aws3';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import OnboardingProgress from '../../components/welcome/OnboardingProgress';
import Icon from '../../assets/icons/TramigoIcon';
import colors from '../../config/colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function ProfilePicScreen(props) {
	// Navigation
	const navigation = useNavigation();
	const route = useRoute();

	// State
	const [profilePic, setProfilePic] = useState('');

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

	return (
		<View style={styles.container}>
			<OnboardingProgress step={2} stepsCompleted={profilePic == '' ? 1 : 2} backgroundColor={colors.light_teal} />

			<View style={styles.iconContainer}>
				{/* if image is null display placeholder image, if not display image chosen */}
				{profilePic == '' || profilePic == undefined || profilePic == null ? (
					<Icon name={'camera'} size={85} color={colors.white} style={styles.icon} />
				) : (
					<Image source={{ uri: profilePic }} style={styles.pfp} />
				)}
			</View>

			<Text style={styles.intro}>Choose your profile picture.</Text>

			<TouchableOpacity onPress={pickImage} style={styles.openLibraryBtn}>
				<Text style={styles.openLibraryBtnLabel}>Open photo library</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() =>
					navigation.navigate('Birthday', {
						country: route.params.country,
						places: route.params.places,
						profilePic: profilePic,
					})
				}
				style={styles.nextButton}
				disabled={profilePic == ''}
			>
				<Text style={styles.nextButtonLabel}>Next</Text>
				<Icon name={'half-arrow-right'} size={15} color={colors.white} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: screenHeight,
		width: screenWidth,
		backgroundColor: colors.light_teal,
		alignItems: 'center',
	},
	icon: {},
	iconContainer: {
		width: 150,
		height: 150,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 3,
		borderColor: colors.white,
		marginTop: screenHeight * 0.3,
		marginBottom: 30,
		borderRadius: 999,
	},
	intro: {
		fontSize: 25,
		color: colors.white,
		fontWeight: 'bold',
		marginBottom: 30,
		textAlign: 'center',
	},
	nextButton: {
		position: 'absolute',
		bottom: 25,
		right: 25,
		height: 40,
		borderWidth: 1,
		borderColor: colors.white,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 15,
		borderRadius: 999,
	},
	nextButtonLabel: {
		color: colors.white,
		fontSize: 18,
		paddingRight: 5,
	},
	openLibraryBtn: {
		width: screenWidth * 0.5,
		height: 40,
		backgroundColor: colors.white,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	openLibraryBtnLabel: {
		fontSize: 18,
		color: colors.gray,
	},
	pfp: {
		width: 150,
		height: 150,
		margin: 10,
		borderRadius: 999,
		backgroundColor: colors.light_teal,
		borderWidth: 3,
		borderColor: colors.white,
	},
});

export default ProfilePicScreen;
