import React, { useEffect, useState } from 'react';
import { withAuthenticator } from 'aws-amplify-react-native';
import 'react-native-gesture-handler';
import { Text, View, Platform, StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image } from 'react-native';

import { API, graphqlOperation } from 'aws-amplify';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';

import { Auth } from 'aws-amplify';

import Amplify from 'aws-amplify';
import awsmobile from './src/aws-exports';
import Match from './frontend/screens/Match';
import Matches from './frontend/screens/Matches';
import ProfileScreen from './frontend/screens/ProfileScreen';
import Events from './frontend/screens/EventPage';
import EventDetails from './frontend/screens/EventDetails';
import CreateEvent from './frontend/screens/CreateEvent';

import { midnight } from './assets/themes';
import { useSelector } from 'react-redux';

const screenHeight = Math.round(Dimensions.get('window').height); // Gets the height of the device's screen

Amplify.configure(awsmobile);
var top;

if (Platform.OS === 'ios') {
	top = screenHeight > 740 ? 35 : 15;
} else {
	top = screenHeight > 740 ? 24 : 21;
}

async function signUp() {
	try {
		const { user } = await Auth.signUp({
			username,
			password,
			attributes: {
				email, // optional
				phone_number, // optional - E.164 number convention
				// other custom attributes
			},
		});
		console.log(user);
	} catch (error) {
		console.log('error signing up:', error);
	}
}
async function signIn() {
	try {
		const user = await Auth.signIn(username, password);
		console.log(user);
	} catch (error) {
		console.log('error signing in', error);
	}
}
async function resendConfirmationCode() {
	try {
		await Auth.resendSignUp(username);
		console.log('code resent successfully');
	} catch (err) {
		console.log('error resending code: ', err);
	}
}
async function signOut() {
	try {
		await Auth.signOut();
	} catch (error) {
		console.log('error signing out: ', error);
	}
}

async function confirmSignUp() {
	try {
		await Auth.confirmSignUp(username, code);
	} catch (error) {
		console.log('error confirming sign up', error);
	}
}

const Menu = createDrawerNavigator();

function CustomDrawerContent({ navigation, styles, theme }) {
	const currentUser = useSelector((state) => state.currentUser);
	return (
		<DrawerContentScrollView backgroundColor={'black'}>
			<View height={'10%'} />
			<Image
				source={{
					uri: currentUser.profilePic,
				}}
				style={styles.pfp}
			/>
			<View height={'5%'} />
			<Text style={{ color: '#f9f9f9', marginTop: '3%', position: 'relative', textAlign: 'center' }}>{'Hi, ' + currentUser.name + '!'}</Text>
			<View height={'15%'} />
			<DrawerItem
				inactiveBackgroundColor={'black'}
				styles={{ backgroundColor: 'black' }}
				label={'Matches'}
				labelStyle={styles.drawerItem}
				onPress={() => navigation.navigate('Matches', { params: { theme: theme } })}
			/>
			<DrawerItem
				inactiveBackgroundColor={'black'}
				styles={{ backgroundColor: 'black' }}
				label={'Events'}
				labelStyle={styles.drawerItem}
				onPress={() => navigation.navigate('Events', { params: { theme: theme } })}
			/>
			<DrawerItem
				inactiveBackgroundColor={'black'}
				styles={{ backgroundColor: 'black' }}
				label={'Edit Profile'}
				labelStyle={styles.drawerItem}
				onPress={() => navigation.navigate('Profile', { params: { theme: theme } })}
			/>

			<DrawerItem
				inactiveBackgroundColor={'black'}
				styles={{ backgroundColor: 'black' }}
				label={'Create Event'}
				labelStyle={styles.drawerItem}
				onPress={() => navigation.navigate('CreateEvent')}
			/>

			<DrawerItem
				inactiveBackgroundColor={'black'}
				label={'Logout'}
				labelStyle={styles.drawerItem}
				onPress={() => {
					signOut();
				}}
			/>
		</DrawerContentScrollView>
	);
}

function MyStack(styles, theme) {
	return (
		<NavigationContainer theme={midnight}>
			<MenuScreens styles={styles} theme={theme} />
		</NavigationContainer>
	);
}
const MenuScreens = ({ styles, theme }) => (
	<Menu.Navigator
		drawerType={'front'}
		drawerStyle={styles.drawerStyles}
		drawerBackgroundColor={'black'}
		drawerContent={(props) => <CustomDrawerContent {...props} styles={styles} theme={theme} />}
	>
		<Menu.Screen theme={theme} name={'Events'} params={{ theme: theme }} component={Events} options={{ gestureEnabled: true }} />
		<Menu.Screen theme={theme} name={'Event Details'} params={{ theme: theme }} component={EventDetails} options={{ gestureEnabled: true }} />
		<Menu.Screen theme={theme} name={'Match'} params={{ theme: theme }} component={Match} options={{ gestureEnabled: true }} />
		<Menu.Screen theme={theme} name={'Matches'} params={{ theme: theme }} component={Matches} options={{ gestureEnabled: true }} />
		<Menu.Screen theme={theme} name={'Profile'} params={{ theme: theme }} component={ProfileScreen} options={{ gestureEnabled: true }} />
		<Menu.Screen theme={theme} name={'CreateEvent'} params={{ theme: theme }} component={CreateEvent} options={{ gestureEnabled: true }} />
	</Menu.Navigator>
);
const App = () => {
	const theme = midnight;
	const styles = useTheme(theme);

	useEffect(() => {}, []);

	return MyStack(styles, theme);
};

function useTheme(theme) {
	const styles = StyleSheet.create({
		drawerItem: {
			color: theme.colors.white,
			backgroundColor: 'black',
			fontSize: 30,
			textAlign: 'center',
			position: 'relative',
			left: '7%',
			justifyContent: 'center',
		},
		drawerStyles: {
			borderTopRightRadius: 1,
			borderBottomRightRadius: 50,
			backgroundColor: 'black',
			color: 'black',
			position: 'relative',
			left: '23%',
			justifyContent: 'center',
		},
		menuBtn: {
			width: 45,
			height: 65,
			top: top,
			left: 5,
			justifyContent: 'center',
			alignItems: 'center',
		},
		pfp: {
			width: 150,
			height: 150,
			borderRadius: 150,
			borderColor: theme.colors.primary,
			borderWidth: 3,
			position: 'relative',
			left: '23%',
			justifyContent: 'center',
		},
	});

	return styles;
}

export default withAuthenticator(App);
