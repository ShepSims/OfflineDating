import React, { useRef, useState } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { storeCurrentUser } from '../../redux/actions/currentUserActions';
import { storeUsers } from '../../redux/actions/userActions';
import { storeInbox } from '../../redux/actions/inboxActions';
import { storeMeet } from '../../redux/actions/meetActions';
import { storeNotifications } from '../../redux/actions/notificationActions';
import { Auth } from 'aws-amplify';
import LoadingScreen from '../../components/welcome/LoadingScreen';
import ErrorMessage from '../../components/welcome/ErrorMessage';
import colors from '../../config/colors';
import images from '../../config/images';
import Button from '../../components/general/Button';
import getState from '../../redux/getState';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function LoginScreen(props) {
	// Navigation Hook
	const navigation = useNavigation();

	// Redux
	const dispatch = useDispatch();

	// State
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [errorOccurred, setErrorOccurred] = useState(false);

	// Ref Hooks
	const emailRef = useRef(null);
	const passRef = useRef(null);

	async function login(email, password) {
		try {
			const user = await Auth.signIn({
				username: email,
				password: password,
			});

			// Sets the name to show on the loading screen
			setName(user.attributes.name);

			// Show loading screen
			setIsLoading(true);

			// Get state from GraphQL then put it in Redux
			const state = await getState(user);
			console.log('state', state);
			dispatch(storeCurrentUser(state['currentUser']));
			dispatch(storeInbox(state['inbox']));
			dispatch(storeUsers(state['users']));
			dispatch(storeNewsfeed(state['newsfeed']));
			dispatch(storeMeet(state['meet']));

			// Navigate to Home Page
			navigation.navigate('Home', { screen: 'Meet' });

			// Hide loading screen
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.log('error signing in:', error);
			if (error.message.includes('not confirmed')) {
				navigation.navigate('ConfirmEmail', {
					email: email,
					password: password,
				});
			} else if (error.message.includes('ending sign')) {
				console.log('brO iM trYinG');
			} else {
				setErrorOccurred(true);
				setIsLoading(false);
				if (error.message.includes('does not exist')) {
					setError('No user with that email exists, try signing up instead!');
				} else if (error.message.includes('Incorrect username or password')) {
					setError('Incorrect password, please try again');
				} else {
					console.log('Error at login: ', error);
					setError('Oops! Something went wrong.');
				}
			}
		}
	}

	return (
		<KeyboardAwareScrollView
			style={{ flex: 1 }}
			contentContainerStyle={styles.container}
			resetScrollToCoords={{ x: 0, y: 0 }}
			scrollEnabled={false}
		>
			{isLoading && <LoadingScreen name={name} />}

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
						returnKeyType={'done'}
						onSubmitEditing={() => login(email.trim(), password.trim())}
					/>

					<View style={styles.signupContainer}>
						<Text style={styles.text}>Don't have an account? </Text>
						<TouchableOpacity onPress={() => navigation.navigate('Register')}>
							<Text style={styles.signupBtn}>Sign up!</Text>
						</TouchableOpacity>
					</View>

					<Text onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPass}>
						Forgot password?
					</Text>

					{errorOccurred && <ErrorMessage message={error} />}
				</View>

				{/* Login Button */}
				<Button
					label={'Login'}
					color={colors.teal}
					size={'medium'}
					onPress={() => login(email.trim(), password.trim())}
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
	forgotPass: {
		textAlign: 'center',
		fontWeight: 'bold',
		color: colors.dark_teal,
		paddingBottom: 15,
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
		marginBottom: '40%',
		alignItems: 'center',
		shadowColor: colors.white,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 1,
		shadowRadius: 50,
	},
	signupContainer: {
		width: screenWidth * 0.65,
		height: 35,
		backgroundColor: colors.orange,
		marginTop: 10,
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
	},
	signupBtn: {
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
		paddingBottom: '30%',
	},
});

export default LoginScreen;
