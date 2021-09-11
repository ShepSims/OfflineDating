import React, { useRef, useState } from 'react';
import { Text, View, Image, ImageBackground, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Auth } from 'aws-amplify';
import ErrorMessage from '../../components/welcome/ErrorMessage';
import colors from '../../config/colors';
import images from '../../config/images';
import Button from '../../components/general/Button';
import countries from '../../config/countries';
import places from '../../config/places';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function RegisterScreen(props) {
	// Navigation
	const navigation = useNavigation();

	// State
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [error, setError] = useState('');
	const [errorOccurred, setErrorOccurred] = useState(false);

	// Refs
	const emailRef = useRef(null);
	const firstNameRef = useRef(null);
	const lastNameRef = useRef(null);
	const passRef = useRef(null);
	const cPassRef = useRef(null);
	const phoneNumberRef = useRef(null);

	const setDefaultUserInfo = async () => {
		const authUser = await Auth.currentAuthenticatedUser();

		API.graphql(
			graphqlOperation(setRegistrationInfo, {
				id: authUser.username,
				birthday: '1998-04-24T23:27:40.000Z',
				profilePic: '',
			})
		);
	};

	async function signUp(email, password, name, phoneNumber, confirmPass) {
		// Call Amplify's Auth API, creating a Cognito Pool User
		if (password == confirmPass) {
			await Auth.signUp({
				username: email,
				password: password,
				email: email,
				attributes: {
					name: name, // include custom field lastName
					phone_number: phoneNumber,
				},
			})
				.then(async (res) => {
					setDefaultUserInfo();
					alert('Please verify your email address by clicking the link we just sent to your inbox.');
					console.log('Response: ' + res.data);
					console.log('Successfully Registered');
					console.log('Attempting to log in');
					navigation.navigate('ConfirmEmail', {
						email: email,
						password: password,
					});
				})
				.catch((err) => {
					console.log('Error at registration: ' + err.message);
					setErrorOccurred(true);
					setError(err.message);
				});
		} else {
			setErrorOccurred(true);
			setError('Passwords must match!');
		}
	}

	return (
		<KeyboardAwareScrollView
			style={{ flex: 1 }}
			contentContainerStyle={styles.container}
			resetScrollToCoords={{ x: 0, y: 0 }}
			scrollEnabled={false}
		>
			<ImageBackground source={images.welcome} style={styles.bgImg}>
				{/* StreetsMart Logo */}
				<View style={styles.logoContainer}>
					<Image style={styles.logo} source={images.fullLogo} />
				</View>

				{/* User Input Areas */}
				<View style={styles.userInput}>
					<TextInput
						ref={emailRef}
						placeholder={'email'}
						placeholderTextColor={colors.gray}
						style={styles.input}
						autoCapitalize={'none'}
						autoCompleteType={'email'}
						onChangeText={(email) => setEmail(email)}
						returnKeyType={'next'}
						onSubmitEditing={() => firstNameRef.current.focus()}
					/>

					<TextInput
						ref={firstNameRef}
						placeholder={'first name'}
						placeholderTextColor={colors.gray}
						style={styles.input}
						onChangeText={(firstName) => setFirstName(firstName)}
						returnKeyType={'next'}
						onSubmitEditing={() => lastNameRef.current.focus()}
					/>

					<TextInput
						ref={lastNameRef}
						placeholder={'last name'}
						placeholderTextColor={colors.gray}
						style={styles.input}
						onChangeText={(lastName) => setLastName(lastName)}
						returnKeyType={'next'}
						onSubmitEditing={() => passRef.current.focus()}
					/>

					<TextInput
						ref={passRef}
						placeholder={'password'}
						placeholderTextColor={colors.gray}
						style={styles.input}
						autoCapitalize={'none'}
						autoCompleteType={'password'}
						onChangeText={(password) => setPassword(password)}
						secureTextEntry={true}
						returnKeyType={'next'}
						onSubmitEditing={() => cPassRef.current.focus()}
					/>

					<TextInput
						ref={cPassRef}
						placeholder={'confirm password'}
						placeholderTextColor={colors.gray}
						style={styles.input}
						autoCapitalize={'none'}
						autoCompleteType={'password'}
						onChangeText={(password) => setConfirmPass(password)}
						secureTextEntry={true}
						returnKeyType={'next'}
						onSubmitEditing={() => phoneNumberRef.current.focus()}
					/>

					<TextInput
						ref={phoneNumberRef}
						placeholder={'phone number'}
						placeholderTextColor={colors.gray}
						style={styles.input}
						onChangeText={(phoneNumber) => setPhoneNumber('+01' + phoneNumber)}
						returnKeyType={'next'}
						onSubmitEditing={() =>
							signUp(email.trim(), password.trim(), firstName.trim().concat(' ' + lastName.trim()), phoneNumber, confirmPass.trim())
						}
						keyboardType={'number-pad'}
					/>

					<View style={styles.signinContainer}>
						<Text style={styles.text}>Already have an account? </Text>
						<TouchableOpacity onPress={() => navigation.navigate('Login')}>
							<Text style={styles.signinBtn}>Sign in!</Text>
						</TouchableOpacity>
					</View>

					{errorOccurred && <ErrorMessage message={error} />}
				</View>

				{/* Register Button */}
				<Button
					label={'Register'}
					color={colors.teal}
					size={'medium'}
					onPress={() =>
						signUp(email.trim(), password.trim(), firstName.trim().concat(' ' + lastName.trim()), phoneNumber, confirmPass.trim())
					}
					style={{ bottom: '5%' }}
				/>
			</ImageBackground>
		</KeyboardAwareScrollView>
	);
}

// Styles
const styles = StyleSheet.create({
	bgImg: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: '100%',
		backgroundColor: colors.light_teal,
	},
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'flex-end',
	},
	input: {
		width: screenWidth * 0.65,
		height: 35,
		fontSize: 20,
		borderRadius: 5,
		marginTop: 10,
		backgroundColor: colors.white,
		color: colors.black,
		textAlign: 'left',
		paddingHorizontal: 10,
	},
	logo: {
		width: 251,
		height: 86,
	},
	logoContainer: {
		marginBottom: '16%',
		alignItems: 'center',
		shadowColor: colors.white,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 1,
		shadowRadius: 50,
	},
	registerButton: {
		width: '70%',
		height: 50,
		backgroundColor: colors.teal,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		bottom: '5%',
	},
	registerLabel: {
		fontSize: 25,
		color: colors.white,
	},
	signinContainer: {
		width: screenWidth * 0.65,
		height: 35,
		backgroundColor: colors.orange,
		borderRadius: 5,
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
	},
	signinBtn: {
		color: colors.white,
		fontSize: 16,
		fontWeight: 'bold',
	},
	text: {
		justifyContent: 'center',
		fontSize: 16,
		color: colors.black,
	},
	userInput: {
		paddingBottom: '20%',
	},
});

export default RegisterScreen;
