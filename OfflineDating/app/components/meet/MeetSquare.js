import React, { memo } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import colors from '../../config/colors';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

/**
 * @param props userId, firstName, lastName, profilePic, flag
 * @returns Component that renders a rounded square consisting of a picture, name, and flag of origin
 */
function MeetSquare({ userId, firstName, lastName, profilePic, flag }) {
	const navigation = useNavigation();

	return (
		<TouchableOpacity style={styles.container} onPress={() => navigation.navigate('NotMyProfile', { other_user_id: userId })}>
			<ImageBackground source={profilePic} style={styles.img} imageStyle={styles.img}>
				<View style={styles.infoContainer}>
					<Text style={styles.text} numberOfLines={1}>
						{firstName + ' ' + lastName.charAt(0) + '.'}
					</Text>
					<Image source={flag} style={styles.flagStyle} />
				</View>
			</ImageBackground>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: '5%',
		paddingVertical: '5%',
		shadowRadius: 2,
		shadowOffset: { width: 0, height: 2 },
		shadowColor: colors.black,
		shadowOpacity: 0.5,
	},
	flagStyle: {
		position: 'absolute',
		width: 45,
		height: 25,
		borderRadius: 20,
		right: 15,
	},
	img: {
		width: screenWidth / 2.4,
		height: screenHeight / 3.5,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	infoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		height: 45,
		backgroundColor: 'rgba(0, 0, 0,0.45)',
		borderBottomRightRadius: 25,
		borderBottomLeftRadius: 25,
	},
	text: {
		position: 'absolute',
		color: colors.white,
		fontWeight: 'bold',
		fontSize: 16,
		left: 15,
	},
});

MeetSquare.propTypes = {
	userId: PropTypes.string,
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	profilePic: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
	flag: PropTypes.number,
};

export default memo(MeetSquare);
