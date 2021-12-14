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

import { midnight } from './assets/themes';

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
	return (
		<DrawerContentScrollView backgroundColor={'black'}>
			<View height={'5%'} />
			<View>
				<Image
					source={{
						uri: 'data:image/jpeg;base64,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',
					}}
					style={styles.pfp}
				/>
			</View>
			<View height={'5%'} />
			<Text style={{ color: '#f9f9f9', marginTop: '3%', position: 'relative', textAlign: 'center' }}>{'Hi, Shep!'}</Text>
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
	console.log('here');
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
		<Menu.Screen theme={theme} name={'Match'} params={{ theme: theme }} component={Match} options={{ gestureEnabled: true }} />
		<Menu.Screen theme={theme} name={'Matches'} params={{ theme: theme }} component={Matches} options={{ gestureEnabled: true }} />
		<Menu.Screen theme={theme} name={'Profile'} params={{ theme: theme }} component={ProfileScreen} options={{ gestureEnabled: true }} />
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
		},
		drawerStyles: {
			borderTopRightRadius: 1,
			borderBottomRightRadius: 50,
			backgroundColor: 'black',
			color: 'black',
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
