import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, TouchableOpacity, Dimensions, Platform, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Icon from './app/assets/icons/TramigoIcon';

import HomeScreen from './app/screens/home/HomeScreen';

// Notifications
import NotificationsScreen from './app/screens/menu/NotificationsScreen';
// Profile
import EditProfileScreen from './app/screens/profile/EditProfileScreen';
import NotMyProfileScreen from './app/screens/profile/NotMyProfileScreen';
import ProfileScreen from './app/screens/profile/ProfileScreen';

/* Menu */
import BuddiesScreen from './app/screens/menu/BuddiesScreen';
import BuddyRequestScreen from './app/screens/menu/BuddyRequestScreen';
import FeedbackScreen from './app/screens/menu/FeedbackScreen';
import SettingsScreen from './app/screens/menu/SettingsScreen.js';

/* Top */
// Messages
import InboxScreen from './app/screens/messages/InboxScreen';
import ConversationScreen from './app/screens/messages/ConversationScreen';
import CreateConversationScreen from './app/screens/messages/CreateConversationScreen';
// Search
import SearchScreen from './app/screens/search/SearchScreen';

/* Welcome */
import BirthdayScreen from './app/screens/welcome/BirthdayScreen';
import ConfirmEmailScreen from './app/screens/welcome/ConfirmEmailScreen';
import ForgotPasswordScreen from './app/screens/welcome/ForgotPasswordScreen';
import LoginScreen from './app/screens/welcome/LoginScreen';
import ProfilePicScreen from './app/screens/welcome/ProfilePicScreen';
import RegisterScreen from './app/screens/welcome/RegisterScreen';
import ResetPasswordScreen from './app/screens/welcome/ResetPasswordScreen';
import WelcomeScreen from './app/screens/welcome/WelcomeScreen';

/* Amplify Setup*/
import Amplify, { Auth } from 'aws-amplify';
import awsmobile from '../src/aws-exports';
Amplify.configure(awsmobile);

/* Other Setup */
import { enableScreens } from 'react-native-screens';
import { useSelector } from 'react-redux';
enableScreens();

// Disables font-scaling across the entire app
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const screenHeight = Math.round(Dimensions.get('window').height); // Gets the height of the device's screen

var top;

if (Platform.OS === 'ios') {
	top = screenHeight > 740 ? 35 : 15;
} else {
	top = screenHeight > 740 ? 24 : 21;
}

async function signOut() {
	try {
		await Auth.signOut();
	} catch (error) {
		console.log('error signing out: ', error);
	}
}

const Welcome = createStackNavigator();
const Main = createStackNavigator();
const Menu = createDrawerNavigator();

function CustomDrawerContent({ navigation, styles, theme }) {
	return (
		<View>
			<TouchableOpacity style={styles.menuBtn} onPress={() => navigation.toggleDrawer()}>
				<Icon name={'menu'} size={25} color={theme.colors.text} />
			</TouchableOpacity>
			<Icon name={'tramigo-full-logo'} size={32} color={theme.colors.text} style={styles.tramigo} />
			<View style={{ height: screenHeight * 0.15 }} />
			<DrawerItem label={'Buddies'} labelStyle={styles.drawerItem} onPress={() => navigation.navigate('Buddies')} />
			<DrawerItem label={'Requests'} labelStyle={styles.drawerItem} onPress={() => navigation.navigate('BuddyRequests')} />

			<DrawerItem label={'Contact Us'} labelStyle={styles.drawerItem} onPress={() => navigation.navigate('Feedback')} />
			<DrawerItem label={'Settings'} labelStyle={styles.drawerItem} onPress={() => navigation.navigate('Settings')} />

			<DrawerItem
				label={'Logout'}
				labelStyle={styles.drawerItem}
				onPress={() => {
					navigation.navigate('Welcome');
					signOut();
				}}
			/>
		</View>
	);
}

const WelcomeScreens = () => (
	<Welcome.Navigator initialRouteName={'Welcome'} screenOptions={{ animationEnabled: false, gestureEnabled: false, headerShown: false }}>
		<Welcome.Screen name={'Birthday'} component={BirthdayScreen} />
		<Welcome.Screen name={'ConfirmEmail'} component={ConfirmEmailScreen} />
		<Welcome.Screen name={'ForgotPassword'} component={ForgotPasswordScreen} />
		<Welcome.Screen name={'Login'} component={LoginScreen} />

		<Welcome.Screen name={'ProfilePic'} component={ProfilePicScreen} />
		<Welcome.Screen name={'Register'} component={RegisterScreen} />
		<Welcome.Screen name={'ResetPassword'} component={ResetPasswordScreen} />

		<Welcome.Screen name={'Welcome'} component={WelcomeScreen} />
	</Welcome.Navigator>
);

const MenuScreens = ({ styles, theme }) => (
	<Menu.Navigator
		drawerType={'front'}
		drawerStyle={styles.drawerStyles}
		drawerContent={(props) => <CustomDrawerContent {...props} styles={styles} theme={theme} />}
	>
		<Menu.Screen name={'WelcomeProcess'} component={WelcomeScreens} options={{ gestureEnabled: false }} />
		<Menu.Screen name={'Main'} component={MainScreens} options={{ gestureEnabled: true }} />
		<Menu.Screen name={'Buddies'} component={BuddiesScreen} />
		<Menu.Screen name={'BuddyRequests'} component={BuddyRequestScreen} />

		<Menu.Screen name={'Feedback'} component={FeedbackScreen} />
		<Menu.Screen name={'Settings'} component={SettingsScreen} />
	</Menu.Navigator>
);

const MainScreens = () => (
	<Main.Navigator initialRouteName={'Home'} screenOptions={{ animationEnabled: false, gestureEnabled: false, headerShown: false }}>
		<Main.Screen name={'Menu'} component={MenuScreens} options={{ gestureEnabled: false }} />

		{/* Calendar */}
		<Main.Screen name={'Calendar'} component={CalendarScreen} />

		{/* Home */}
		<Main.Screen name={'Home'} component={HomeScreen} />

		<Main.Screen name={'Requests'} component={RequestScreen} />

		{/* Messages */}
		<Main.Screen name={'Conversation'} component={ConversationScreen} />
		<Main.Screen name={'CreateConversation'} component={CreateConversationScreen} />
		<Main.Screen name={'Inbox'} component={InboxScreen} />

		{/* Newsfeed */}

		{/* Notifications */}
		<Main.Screen name={'Notifications'} component={NotificationsScreen} />

		{/* Profile */}
		<Main.Screen name={'EditProfile'} component={EditProfileScreen} />
		<Main.Screen name={'NotMyProfile'} component={NotMyProfileScreen} getId={({ params }) => params.other_user_id} />
		<Main.Screen name={'Profile'} component={ProfileScreen} />

		{/* Search */}
		<Main.Screen name={'Search'} component={SearchScreen} />
	</Main.Navigator>
);

function App() {
	// Theme
	const theme = useSelector((state) => state.currentUser.theme);
	const styles = useTheme(theme);

	// Load the icon font before using it
	const [fontsLoaded] = useFonts({ Tramigo: require('./app/assets/icons/Tramigo.ttf') });

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<NavigationContainer>
				<StatusBar barStyle={theme.colors.navBars == '#FFFFFF' ? 'dark-content' : 'light-content'} />
				<MenuScreens styles={styles} theme={theme} />
			</NavigationContainer>
		);
	}
}

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
		tramigo: {
			position: 'absolute',
			top: top + 20,
			left: 80,
		},
	});

	return styles;
}

export default App;
