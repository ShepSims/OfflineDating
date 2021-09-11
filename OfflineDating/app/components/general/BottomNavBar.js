import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icon from '../../assets/icons/TramigoIcon';

/**
 * @param props hasNotif
 * @returns Allows for navigation to NewsFeed, Profile, Explore, Calendar, Notifications
 */
function BottomNavBar() {
	const navigation = useNavigation();

	// Redux
	const notifs = useSelector((state) => state.notifications);

	// Theme
	const theme = useSelector((state) => state.currentUser.theme);
	const styles = useTheme(theme);

	// Variables
	const iconSize = 30;
	const iconColor = theme.colors.icon;

	let unseen = false;
	for (let n in notifs) {
		if (notifs[n].seen == false) {
			unseen = true;
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				{/* Newsfeed */}
				<TouchableOpacity onPress={() => navigation.navigate('Newsfeed')}>
					<Icon name={'newspaper'} size={iconSize} color={iconColor} style={styles.icon} />
				</TouchableOpacity>

				{/* Profile */}
				<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
					<Icon name={'backpacker'} size={iconSize} color={iconColor} style={styles.icon} />
				</TouchableOpacity>

				{/* Explore */}
				<View style={styles.middleIconContainer}>
					<TouchableOpacity onPress={() => navigation.navigate('Explore')}>
						<Icon name={'world'} size={50} color={iconColor} style={styles.middleIcon} />
					</TouchableOpacity>
				</View>

				{/* Calendar */}
				<TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
					<Icon name={'calendar'} size={iconSize} color={iconColor} style={styles.icon} />
				</TouchableOpacity>

				{/* Notifications */}
				<TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
					<Icon name={'bell'} size={iconSize} color={iconColor} style={styles.icon} />
					<View style={unseen ? styles.notifDot : {}} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const screenHeight = Math.round(Dimensions.get('window').height); // Gets the height of the device's screen
const screenWidth = Math.round(Dimensions.get('window').width); // Gets the width of the device's screen
const isX = Platform.OS === 'ios' && screenHeight > 800; // Determines if device is iPhoneX or higher based on screen height
const barHeight = isX === true ? 75 : 50; // If device is iPhoneX or higher, BottomNavBar's height is 75px, else it's 50px

function useTheme(theme) {
	const styles = StyleSheet.create({
		circleBorder: {
			borderWidth: 2,
			paddingLeft: 5,
			paddingVertical: 3,
			borderRadius: 50,
			borderColor: theme.colors.accent1,
		},
		container: {
			zIndex: 999,
			width: screenWidth,
			position: 'absolute',
			bottom: 0,
			shadowRadius: 2,
			shadowOffset: { width: 0, height: -2 },
			shadowColor: theme.colors.black,
			shadowOpacity: 0.25,
		},
		icon: {
			top: isX ? 10 : 0,
			marginHorizontal: 15,
		},
		iconContainer: {
			zIndex: 4,
			width: '100%',
			height: barHeight,
			flexDirection: 'row',
			alignItems: isX === true ? 'flex-start' : 'center',
			justifyContent: 'space-evenly',
			backgroundColor: theme.colors.navBars,
		},
		middleIcon: {
			bottom: 0,
		},
		middleIconContainer: {
			width: 70,
			height: 70,
			bottom: isX ? 20 : 0,
			marginBottom: screenHeight * 0.025,
			backgroundColor: theme.colors.navBars,
			borderRadius: 100,
			justifyContent: 'center',
			alignItems: 'center',
		},
		notifDot: {
			position: 'absolute',
			top: 0,
			right: 15,
			width: 12,
			height: 12,
			backgroundColor: theme.colors.accent1,
			borderRadius: 999,
		},
	});

	return styles;
}

export default memo(BottomNavBar);
