import React, { memo } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { determinePFP } from '../../config/functions';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import images from '../../config/images';

const screenWidth = Math.round(Dimensions.get('window').width);

/**
 * @param props id, profilePic, name, onPress, buttonText
 * @returns Buddy Preview with name, profile picture, and add/remove button
 */
function Buddy({ id, name, profilePic, onPress, buttonText }) {
	const navigation = useNavigation();

	// Theme
	const theme = useSelector((state) => state.currentUser.theme);
	const styles = useTheme(theme);
	const pfp = determinePFP(profilePic, images.pfpTeal);

	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate('NotMyProfile', {
							other_user_id: id,
						})
					}
					style={styles.info}
				>
					<View style={styles.info}>
						<Image source={pfp} style={styles.pfp} />
						<Text style={styles.name}>{name}</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={onPress} style={styles.remove}>
					<Text style={styles.removeLabel}>{buttonText}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

function useTheme(theme) {
	const styles = StyleSheet.create({
		container: {
			width: screenWidth,
			height: 70,
			borderBottomWidth: 1,
			borderBottomColor: theme.colors.border,
			justifyContent: 'center',
			backgroundColor: theme.colors.background,
		},
		info: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		infoContainer: {
			margin: 15,
			flexDirection: 'row',
			alignItems: 'center',
		},
		name: {
			fontSize: 18,
			color: theme.colors.text,
		},
		pfp: {
			width: 45,
			height: 45,
			borderRadius: 999,
			backgroundColor: theme.colors.primary_lightest,
			marginRight: 16,
		},
		remove: {
			width: 75,
			height: 30,
			position: 'absolute',
			right: 0,
			backgroundColor: theme.colors.accent1,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 999,
		},
		removeLabel: {
			color: theme.colors.white,
			fontWeight: 'bold',
		},
	});

	return styles;
}

Buddy.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	profilePic: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
	onPress: PropTypes.func,
	buttonText: PropTypes.string,
};

export default memo(Buddy);
