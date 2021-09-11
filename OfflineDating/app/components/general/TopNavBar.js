import React, { memo } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '../../assets/icons/TramigoIcon';

/**
 * @param props title
 * @returns Allows for navigation to MoreOptions, Inbox, Search
 */
function TopNavBar({ type, title, navigateTo, onPressX, showOptionsButton, onPressOptions }) {
	const navigation = useNavigation();

	// Theme
	const theme = useSelector((state) => state.currentUser.theme);
	const styles = useTheme(theme);

	// Variables
	const iconSize = 25;
	const iconColor = theme.colors.icon;

	if (type === 'back') {
		return (
			<View style={styles.container}>
				<View style={styles.iconContainer}>
					<View style={styles.rightButtons}>
						{/* Back Button */}
						<TouchableOpacity
							onPress={() => (navigateTo === undefined || navigateTo == 'back' ? navigation.goBack() : navigation.navigate(navigateTo))}
						>
							<View>
								<Icon name={'arrow-left'} size={iconSize} color={iconColor} />
							</View>
						</TouchableOpacity>

						{/* Empty Button */}
						<View style={styles.icon} />
					</View>

					{/* Name */}
					<View style={styles.nameContainer}>
						<Text style={styles.name} numberOfLines={1}>
							{title}
						</Text>
					</View>

					<View style={styles.rightButtons}>
						{/* Empty Button */}
						<View style={styles.icon} />

						{/* Options Button or Empty Button */}
						{showOptionsButton ? (
							/* Options Button */
							<TouchableOpacity onPress={onPressOptions}>
								<View>
									<Icon name={'ellipsis'} size={iconSize} color={iconColor} />
								</View>
							</TouchableOpacity>
						) : (
							/* Empty Button */
							<View style={styles.icon} />
						)}
					</View>
				</View>
			</View>
		);
	} else if (type === 'x') {
		return (
			<View style={styles.container}>
				<View style={styles.iconContainer}>
					<View style={styles.rightButtons}>
						{/* Back Button */}
						<TouchableOpacity onPress={onPressX}>
							<View>
								<Icon name={'x'} size={iconSize} color={iconColor} />
							</View>
						</TouchableOpacity>

						{/* Empty Button */}
						<View style={styles.icon} />
					</View>

					{/* Name */}
					<View style={styles.nameContainer}>
						<Text style={styles.name} numberOfLines={1}>
							{title}
						</Text>
					</View>

					<View style={styles.rightButtons}>
						{/* Empty Button */}
						<View style={styles.icon} />

						{/* Options Button or Empty Button */}
						{showOptionsButton ? (
							/* Options Button */
							<TouchableOpacity onPress={onPressOptions}>
								<View>
									<Icon name={'ellipsis'} size={iconSize} color={iconColor} />
								</View>
							</TouchableOpacity>
						) : (
							/* Empty Button */
							<View style={styles.icon} />
						)}
					</View>
				</View>
			</View>
		);
	} else if (type === 'logo') {
		return (
			<View style={styles.container}>
				<View style={styles.iconContainer}>
					<View style={styles.rightButtons}>
						{/* Hamburger Button */}
						<TouchableOpacity onPress={() => navigation.toggleDrawer()}>
							<View>
								<Icon name={'menu'} size={iconSize} color={iconColor} />
							</View>
						</TouchableOpacity>

						{/* Empty Button */}
						<View style={styles.icon} />
					</View>

					{/* Name */}
					<View style={styles.nameContainer}>
						<Icon name={'tramigo-full-logo'} size={iconSize} color={iconColor} />
					</View>

					<View style={styles.rightButtons}>
						{/* Inbox */}
						<TouchableOpacity onPress={() => navigation.navigate('Inbox')}>
							<View>
								<Icon name={'paper-airplane'} size={iconSize} color={iconColor} />
							</View>
						</TouchableOpacity>

						<View style={styles.spacer} />

						{/* Search Button */}
						<TouchableOpacity onPress={() => navigation.navigate('Search')}>
							<View>
								<Icon name={'magnifying-glass-right'} size={iconSize} color={iconColor} />
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	} else {
		return (
			<View style={styles.container}>
				<View style={styles.iconContainer}>
					<View style={styles.rightButtons}>
						{/* Hamburger Button */}
						<TouchableOpacity onPress={() => navigation.toggleDrawer()}>
							<View>
								<Icon name={'menu'} size={iconSize} color={iconColor} />
							</View>
						</TouchableOpacity>

						<View style={styles.spacer} />

						{/* Empty Button */}
						<View style={styles.icon} />
					</View>

					{/* Name */}
					<View style={styles.nameContainer}>
						<Text style={styles.name} numberOfLines={1}>
							{title}
						</Text>
					</View>

					<View style={styles.rightButtons}>
						{/* Inbox */}
						<TouchableOpacity onPress={() => navigation.navigate('Inbox')}>
							<View>
								<Icon name={'paper-airplane'} size={iconSize} color={iconColor} />
							</View>
						</TouchableOpacity>

						<View style={styles.spacer} />

						{/* Search Button */}
						<TouchableOpacity onPress={() => navigation.navigate('Search')}>
							<View>
								<Icon name={'magnifying-glass-right'} size={iconSize} color={iconColor} />
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

const screenHeight = Math.round(Dimensions.get('window').height); // Gets the height of the device's screen
const isX = screenHeight > 800; // Determines if device is iPhoneX or higher based on screen height
const barHeight = Platform.OS === 'ios' ? (isX === true ? 90 : 70) : screenHeight > 740 ? 80 : 75;

function useTheme(theme) {
	const styles = StyleSheet.create({
		container: {
			width: '100%',
			zIndex: 100,
			shadowRadius: 2,
			shadowOffset: { width: 0, height: 2 },
			shadowColor: theme.colors.black,
			shadowOpacity: 0.25,
		},
		icon: {
			width: 25,
			height: 25,
		},
		iconContainer: {
			zIndex: 4,
			width: '100%',
			height: barHeight,
			paddingTop: Platform.OS === 'ios' ? (screenHeight > 740 ? 45 : 25) : 32,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-evenly',
			backgroundColor: theme.colors.navBars,
		},
		leftButtons: {
			flexDirection: 'row',
		},
		logo: {
			width: 90,
			height: 30,
		},
		name: {
			color: theme.colors.navBars == '#FFFFFF' ? theme.colors.black : theme.colors.white,
			fontSize: 25,
		},
		nameContainer: {
			alignItems: 'center',
			width: '58%',
		},
		rightButtons: {
			flexDirection: 'row',
		},
		spacer: {
			width: 10,
		},
	});

	return styles;
}

TopNavBar.propTypes = {
	type: PropTypes.oneOf(['standard', 'back', 'x', 'logo']),
	title: PropTypes.string,
	onPressX: PropTypes.func,
	onPressOptions: PropTypes.func,
	showOptionsButton: PropTypes.bool,
	navigateTo: PropTypes.string,
};

export default memo(TopNavBar);
