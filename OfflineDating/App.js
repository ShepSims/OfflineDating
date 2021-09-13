import React, { useEffect, useState } from 'react';
import { withAuthenticator } from 'aws-amplify-react-native';
import 'react-native-gesture-handler';
import { Text, View, Platform, StyleSheet, StatusBar, Dimensions, TouchableOpacity } from 'react-native';

import { API, graphqlOperation } from 'aws-amplify';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';

import { Auth } from 'aws-amplify';

import Amplify from 'aws-amplify';
import awsmobile from './src/aws-exports';
import Match from './frontend/screens/Match';
import Matches from './frontend/screens/Matches';
import { classic } from './assets/themes';

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

const initialState = { name: '', description: '' };

const Stack = createStackNavigator();
const Menu = createDrawerNavigator();

function CustomDrawerContent({ navigation, styles, theme }) {
	return (
		<View>
			<TouchableOpacity style={styles.menuBtn} onPress={() => navigation.toggleDrawer()}></TouchableOpacity>
			<View style={{ height: screenHeight * 0.15 }} />
			<DrawerItem label={'Match'} labelStyle={styles.drawerItem} onPress={() => navigation.navigate('Match', { params: { theme: theme } })} />
			<DrawerItem
				label={'Matches'}
				labelStyle={styles.drawerItem}
				onPress={() => navigation.navigate('Matches', { params: { theme: theme } })}
			/>

			<DrawerItem
				label={'Logout'}
				labelStyle={styles.drawerItem}
				onPress={() => {
					signOut();
				}}
			/>
		</View>
	);
}

function MyStack(styles, theme) {
	console.log('here');
	return (
		<NavigationContainer>
			<MenuScreens styles={styles} theme={theme} />
		</NavigationContainer>
	);
}
const MenuScreens = ({ styles, theme }) => (
	<Menu.Navigator
		drawerType={'front'}
		drawerStyle={styles.drawerStyles}
		drawerContent={(props) => <CustomDrawerContent {...props} styles={styles} theme={theme} />}
	>
		<Menu.Screen theme={theme} name={'Match'} params={{ theme: theme }} component={Match} options={{ gestureEnabled: true }} />
		<Menu.Screen theme={theme} name={'Matches'} params={{ theme: theme }} component={Matches} options={{ gestureEnabled: true }} />
	</Menu.Navigator>
);
const App = () => {
	const theme = classic;
	const styles = useTheme(theme);
	console.log('\n\nstyles\n', styles);
	console.log(styles);

	useEffect(() => {
		console.log('useEffect');
	}, []);

	return MyStack(styles, theme);
};

function useTheme(theme) {
	const styles = StyleSheet.create({
		drawerItem: {
			color: theme.colors.text,
			fontSize: 30,
		},
		drawerStyles: {
			borderTopRightRadius: 50,
			borderBottomRightRadius: 50,
			backgroundColor: theme.colors.background,
		},
		menuBtn: {
			width: 45,
			height: 65,
			top: top,
			left: 5,
			justifyContent: 'center',
			alignItems: 'center',
		},
	});

	return styles;
}

export default withAuthenticator(App);
