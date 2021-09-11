import React, { memo, useState, useRef } from 'react';
import { Image, View, Text, Dimensions, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { determinePFP } from '../../config/functions';
import PropTypes from 'prop-types';
import images from '../../config/images';
import moment from 'moment';

const screenWidth = Math.round(Dimensions.get('window').width);

/**
 * @param props senderId, text, align
 * @returns Message bubble in actual conversations
 */
function Message({ senderId, content, align, dateTime, activityID, tripID }) {
	const navigation = useNavigation();

	// Redux
	const userList = useSelector((state) => state.users);
	const currentUser = useSelector((state) => state.currentUser);

	// Theme
	const theme = useSelector((state) => state.currentUser.theme);
	const styles = useTheme(theme);

	// State
	const [timeVisible, setTimeVisible] = useState(false);
	const [status, setStatus] = useState({});

	// Variables
	const videoRef = useRef(null);
	let date = moment(dateTime).format('MM/DD/YYYY');
	let time = moment(dateTime).format('hh:mm A');
	let notSentToday = (new Date(Date.now()) - new Date(dateTime)) / 3600000 / 24 > 1;
	let displayDateTime = notSentToday ? date + ' • ' + time : time;
	let profilePic = images.pfpTeal;

	for (let u in userList) {
		if (userList[u]['id'] == senderId) {
			if (userList[u]['profilePicURL'] != '') profilePic = { uri: userList[u]['profilePicURL'] };
			senderId = u;
			break;
		}
	}

	function checkStatus(state) {
		setStatus(state);
		if (state.didJustFinish) {
			videoRef.current.setStatusAsync({
				shouldPlay: false,
				positionMillis: 0,
			});
		}
	}

	function PausePlay() {
		if (status) {
			if (status.isPlaying) {
				videoRef.current.pauseAsync();
			} else {
				videoRef.current.playAsync();
			}
		}
	}

	return (
		<View
			style={{
				alignItems: align === 'left' ? 'flex-start' : 'flex-end',
				justifyContent: 'center',
				width: screenWidth,
				flexDirection: 'column',
				paddingHorizontal: 15,
			}}
		>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				{align == 'left' && (
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('NotMyProfile', {
								other_user_id: senderId,
							});
						}}
					>
						<Image source={profilePic} style={styles.pfp} />
					</TouchableOpacity>
				)}

				<TouchableOpacity
					onPress={() => {
						if (activityID) {
							if (currentUser.activities.joined.includes(activityID) || currentUser.activities.own.includes(activityID)) {
								navigation.navigate('ActivityPage', { id: activityID });
							} else {
								navigation.navigate('ActivityDetail', { id: activityID });
							}
						} else if (tripID) {
							if (currentUser.trips.joined.includes(tripID) || currentUser.trips.own.includes(tripID)) {
								navigation.navigate('TripPage', { tripId: tripID });
							} else {
								navigation.navigate('TripDetail', { tripId: tripID });
							}
						} else {
							setTimeVisible(!timeVisible);
						}
					}}
					style={{
						backgroundColor: align === 'left' ? theme.colors.leftMessage : theme.colors.rightMessage,
						maxWidth: screenWidth * 0.75,
						paddingVertical: 10,
						paddingHorizontal: 15,
						borderRadius: 20,
						margin: 5,
					}}
				>
					{content.split('.')[0] === 'https://image-uploader-streetsmart1' ? (
						<Image
							style={{
								width: '100%',
								minWidth: screenWidth * 0.65,
								height: 200,
								borderTopWidth: 1,
								borderColor: theme.colors.border,
								backgroundColor: theme.colors.accent1,
								marginTop: 10,
							}}
							source={{ uri: content }}
						/>
					) : content.split('.')[0] === 'https://video-uploader-streetsmart1' ? (
						<Pressable onPress={() => PausePlay()}>
							<Video
								ref={videoRef}
								source={{ uri: content }}
								useNativeControls={true}
								style={{
									width: '100%',
									minWidth: screenWidth * 0.65,
									height: 200,
									borderTopWidth: 1,
									borderColor: theme.colors.border,
									backgroundColor: theme.colors.accent1,
									marginTop: 10,
								}}
								resizeMode={'cover'}
								onPlaybackStatusUpdate={(state) => checkStatus(state)}
								// isLooping={true}
							/>
						</Pressable>
					) : (
						<Text
							style={{
								color: align === 'left' ? theme.colors.text : theme.colors.white,
								fontSize: 16,
							}}
						>
							{content}
						</Text>
					)}
				</TouchableOpacity>

				{align == 'right' && (
					<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
						<Image source={profilePic} style={styles.pfp} />
					</TouchableOpacity>
				)}
			</View>

			{timeVisible && <Text style={styles.time}>{displayDateTime}</Text>}
		</View>
	);
}

function useTheme(theme) {
	const styles = StyleSheet.create({
		pfp: {
			width: 35,
			height: 35,
			borderRadius: 999,
			backgroundColor: theme.colors.primary_lightest,
		},
		time: {
			fontSize: 12,
			color: theme.colors.text,
		},
	});

	return styles;
}

Message.propTypes = {
	senderId: PropTypes.string,
	content: PropTypes.string,
	align: PropTypes.oneOf(['left', 'right']),
};

export default memo(Message);
