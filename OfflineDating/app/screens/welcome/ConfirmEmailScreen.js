import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { storeCurrentUser } from '../../redux/actions/currentUserActions';
import { storeUsers } from '../../redux/actions/userActions';
import { storeActivities } from '../../redux/actions/activityActions';
import { storeTrips } from '../../redux/actions/tripActions';
import { storeMessages } from '../../redux/actions/messageActions';
import { storeNewsfeed } from '../../redux/actions/newsfeedActions';
import { storeMeet } from '../../redux/actions/meetActions';
import { storePosts } from '../../redux/actions/postActions';
import { storeStories } from '../../redux/actions/storyActions';
import { storeInbox } from '../../redux/actions/inboxActions';
import { storeLocations } from '../../redux/actions/locationActions';
import { storeCheckIns } from '../../redux/actions/checkInActions';
import { storeNotifications } from '../../redux/actions/notificationActions';
import LoadingScreen from '../../components/welcome/LoadingScreen';
import ErrorMessage from '../../components/welcome/ErrorMessage';
import Button from '../../components/general/Button';
import Icon from '../../assets/icons/TramigoIcon';
import colors from '../../config/colors';
import getState from '../../redux/getState';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function ConfirmEmailScreen(props) {
	// Navigation
	const navigation = useNavigation();
	const route = useRoute();

	// Redux
	const dispatch = useDispatch();

	// State
	const [name, setName] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [errorOccurred, setErrorOccurred] = useState(false);

	async function signIn() {
		try {
			const user = await Auth.signIn({
				username: route.params.email,
				password: route.params.password,
			});
			login(user);
		} catch (error) {
			console.log('error signing in:', error);
			setErrorOccurred(true);
			setIsLoading(false);
			if (error.message.includes('not confirmed')) {
				setError('Please verify your email by clicking the link sent to your inbox');
			} else {
				setError(error.message);
			}
		}
	}

	async function login(user) {
		try {
			// Sets the name to show on the loading screen
			setName(user.attributes.name);

			// Show loading screen
			setIsLoading(true);

			// Get state from GraphQL then put it in Redux
			const state = await getState(user);
			dispatch(storeCurrentUser(state['currentUser']));
			dispatch(storeInbox(state['inbox']));
			dispatch(storeActivities(state['activities']));
			dispatch(storeTrips(state['trips']));
			dispatch(storeUsers(state['users']));
			dispatch(storeNewsfeed(state['newsfeed']));
			dispatch(storePosts(state['posts']));
			dispatch(storeStories(state['stories']));
			dispatch(storeMeet(state['meet']));
			dispatch(storeNotifications(state['notifications']));
			dispatch(storeCheckIns(state['checkins']));
			dispatch(storeLocations(state['locations']));

			setIsLoading(false);
			navigation.navigate('Places');
		} catch (error) {
			throw error;
		}
	}

	return (
		<View style={styles.container}>
			{isLoading && <LoadingScreen name={name} />}

			<Icon name={'envelope'} size={85} color={colors.white} style={styles.icon} />

			<Text style={styles.title}>Confirm Your Email</Text>

			<Text style={styles.text}>Please check your inbox for a confirmation email and click the link to confirm your email address.</Text>

			<Text style={styles.text}>After you confirm, press Continue.</Text>

			<View style={styles.error}>{errorOccurred && <ErrorMessage message={error} />}</View>

			<Button
				label={'Continue'}
				size={'large'}
				color={colors.orange}
				onPress={() => signIn()}
				style={{
					position: 'absolute',
					bottom: 50,
				}}
			/>

			<View style={styles.btnContainer}>
				<Text onPress={() => navigation.navigate('Login')} style={styles.btn}>
					Back to Login
				</Text>

				<Text
					style={styles.btn}
					onPress={() => {
						Auth.resendSignUp(route.params.email);
						alert('Email sent!');
					}}
				>
					Resend Email
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	btn: {
		color: colors.white,
	},
	btnContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		position: 'absolute',
		bottom: 15,
	},
	container: {
		height: screenHeight,
		width: screenWidth,
		backgroundColor: colors.light_teal,
		alignItems: 'center',
	},
	error: {
		paddingTop: 25,
	},
	icon: {
		marginTop: screenHeight * 0.25,
		marginBottom: screenHeight * 0.1,
	},
	text: {
		textAlign: 'center',
		color: colors.white,
		paddingHorizontal: 15,
		fontSize: 16,
		lineHeight: 30,
		paddingBottom: 15,
	},
	title: {
		fontSize: 25,
		color: colors.white,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 30,
	},
});

export default ConfirmEmailScreen;
