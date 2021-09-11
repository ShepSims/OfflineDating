import React, { memo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '../../assets/icons/TramigoIcon';

/**
 * @param props type, text
 * @description type - CheckIn[0], NewBuddy[1], Comments[2]. Share[3]
 * @returns A notifcation preview for rendering on the Notifications Page
 */
function Notification({ userName, clicked, itemName, itemType, content, onPress, seen }) {
	const navigation = useNavigation();

	// Theme
	const theme = useSelector((state) => state.currentUser.theme);
	const styles = useTheme(theme);

	console.log(content);
	let icon;
	let text;
	if (content.includes('to join')) {
		icon = 'paper-airplane';
		text = ' ' + content + ' ' + itemName;
	} else if (content.includes('tramigo request')) {
		icon = 'backpacker-plus';
		text = ' ' + content;
	} else if (content.includes('sent you a message')) {
		icon = 'backpacker-paper-airplane';
		text = ' ' + content;
	} else if (content.includes('sent you')) {
		icon = 'comments';
		text = ' ' + content + ' ' + itemName;
	} else if (content.includes('monitor')) {
		icon = 'pin-check';
		text = ' ' + content + ' ' + itemName; //YO
	}

	let color = clicked == false ? theme.colors.accent1 : theme.colors.primary_light;

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View style={styles.iconContainer}>
				<Icon name={icon} size={30} color={color} />
			</View>
			<Text style={styles.notifText}>
				<Text style={styles.bold}>{userName}</Text>
				<Text>{text}</Text>
			</Text>
		</TouchableOpacity>
	);
}

function useTheme(theme) {
	const styles = StyleSheet.create({
		bold: {
			fontWeight: 'bold',
		},
		container: {
			width: '100%',
			flexDirection: 'row',
			justifyContent: 'flex-start',
			borderBottomWidth: 1,
			borderBottomColor: theme.colors.border,
			alignItems: 'center',
			paddingVertical: 10,
			paddingHorizontal: 15,
		},
		iconContainer: {
			width: 35,
			height: 35,
			alignItems: 'center',
			justifyContent: 'center',
		},
		notifText: {
			marginLeft: 10,
			fontSize: 18,
			justifyContent: 'center',
			width: '85%',
			color: theme.colors.text,
		},
	});

	return styles;
}

const types = ['join_request', 'monitor_check_in', 'join_request_accepted', 'join', 'share', 'buddy_request', 'new_buddy', 'post', 'new_message'];

Notification.propTypes = {
	type: PropTypes.oneOf(types),
	userName: PropTypes.string,
	clicked: PropTypes.bool,
	itemName: PropTypes.string,
	itemType: PropTypes.oneOf(['activity', 'trip']),
	itemId: PropTypes.string,
	onPress: PropTypes.func,
};

export default memo(Notification);
