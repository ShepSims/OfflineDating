import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';
import { getChatRoom } from '../../../../src/graphql/queries';
import { determinePFP } from '../../config/functions';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import colors from '../../config/colors';
import images from '../../config/images';
import Icon from '../../assets/icons/TramigoIcon';

/**
 * @param props id, title, text, participants
 * @returns Message preview that shows minimal info and sends to full message onPress
 */
function MessagePreview({ id, title, text, time, pfp }) {
	const navigation = useNavigation();

	// Theme
	const theme = useSelector((state) => state.currentUser.theme);
	const styles = useTheme(theme);

	// if (participants[0]) {
	// 	profilePic = determinePFP(participants[0].data.getUser.profilePicURL, images.pfpTeal);
	// }

	const onClick = async () => {
		try {
			// Get the associated chat room and navigate to it
			const chatRoomData = await API.graphql(
				graphqlOperation(
					getChatRoom,
					{ id } // This is a temporary fix
				)
			);

			if (!chatRoomData.data) {
				console.log('Failed to get a chat room: ', chatRoomData);
				return;
			}

			const chatRoom = chatRoomData.data.getChatRoom;

			navigation.navigate('Conversation', {
				id: chatRoom.id,
				title: title,
			});
		} catch (e) {
			console.log('Error @ MessagePreview');
			console.log(e);
		}
	};

	return (
		<TouchableOpacity onPress={onClick}>
			<View style={styles.container}>
				<Image source={pfp} style={styles.profilePic} />

				<View style={styles.text}>
					<Text style={styles.user}>{title}</Text>

					<Text style={styles.previewText} numberOfLines={1}>
						{text}
					</Text>

					<Text style={styles.date} numberOfLines={1}>
						{time}
					</Text>
				</View>

				<Icon name={'half-arrow-right'} size={25} color={colors.light_gray} />
			</View>
		</TouchableOpacity>
	);
}

function useTheme(theme) {
	const styles = StyleSheet.create({
		container: {
			width: '100%',
			height: 70,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-evenly',
			borderBottomColor: theme.colors.border,
			borderBottomWidth: 1,
			backgroundColor: theme.colors.background,
			paddingHorizontal: 15,
		},
		previewText: {
			fontSize: 15,
			color: theme.colors.text,
		},
		profilePic: {
			width: 50,
			height: 50,
			backgroundColor: theme.colors.primary_lightest,
			borderRadius: 100,
			marginRight: 15,
		},
		text: {
			width: '75%',
			flexDirection: 'column',
		},
		date: {
			fontSize: 12,
			color: theme.colors.text,
		},
		user: {
			fontSize: 15,
			color: theme.mode == 'dark' ? theme.colors.white : theme.colors.primary_light,
		},
	});

	return styles;
}

MessagePreview.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	text: PropTypes.string,
	participants: PropTypes.arrayOf(PropTypes.object),
};

export default memo(MessagePreview);
