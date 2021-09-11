import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Dimensions, RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { storeNotifications } from '../../../redux/actions/notificationActions';
import { updateExperience } from '../../../redux/actions/currentUserActions';
import { experience, calculateLevel } from '../../../config/experience';
import TopNavBar from '../../../components/general/TopNavBar';
import BottomNavBar from '../../../components/general/BottomNavBar';
import Notification from '../../../components/general/Notification';
import { API, graphqlOperation } from 'aws-amplify';
import { customUpdateExp } from '../../../../../src/graphql/customQueries';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function NotificationsScreen(props) {
	const navigation = useNavigation();

	// Redux
	const dispatch = useDispatch();
	const notifData = Object.assign(useSelector((state) => state.notifications));
	const currentUser = Object.assign(useSelector((state) => state.currentUser));
	const activities = useSelector((state) => state.activities);
	const locations = useSelector((state) => state.locations);
	const trips = useSelector((state) => state.trips);
	const users = useSelector((state) => state.users);
	const checkIns = useSelector((state) => state.checkIns);

	// Theme
	const theme = currentUser.theme;
	const styles = useTheme(theme);

	// State
	const [refreshing, setRefreshing] = useState(false);
	const [notifications, setNotifications] = useState([]);

	const wait = (timeout) => {
		return new Promise((resolve) => setTimeout(resolve, timeout));
	};

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	const keyExtractor = useCallback((item, index) => index.toString(), []);

	const renderNotifs = useCallback(
		({ item }) => (
			<Notification
				content={item.content}
				userName={item.userName}
				itemName={item.itemName}
				itemId={item.activityID ? item.activityID : item.tripID}
				clicked={item.clicked}
				seen={item.seen}
				onPress={() => onPressNotif(item)}
			/>
		),
		[]
	);

	function onPressNotif(item) {
		// Mark as clicked
		if (item.content.includes('requested to join')) {
			if (item.activityID) {
				navigation.navigate('Requests', { id: item.activityID, type: 'activity' });
			} else {
				navigation.navigate('Requests', { id: item.tripID, type: 'trip' });
			}
		} else if (item.content.includes('accepted your request')) {
			if (item.activityID) {
				navigation.navigate('ActivityPage', { id: item.activityID });
			} else if (item.tripID) {
				navigation.navigate('TripPage', { tripId: item.tripID });
			}
		} else if (item.content.includes('sent you a tramigo request')) {
			navigation.navigate('NotMyProfile', { other_user_id: item.userId });
		} else if (item.content.includes('accepted your tramigo request')) {
			navigation.navigate('NotMyProfile', { other_user_id: item.userId });
		} else if (item.content.includes('sent you a message')) {
			navigation.navigate('Inbox');
		} else if (item.content.includes('sent you')) {
			if (item.activityID in currentUser.activities.joined) {
				navigation.navigate('ActivityPage', { id: item.activityID });
			} else if (item.tripID in currentUser.trips.joined) {
				navigation.navigate('TripPage', { id: item.tripID });
			} else if (item.activityID != null) {
				navigation.navigate('ActivityDetail', { id: item.activityID });
			} else if (item.tripID) {
				navigation.navigate('TripDetail', { tripID: item.tripID });
			}
		} else if (item.content.includes('monitor')) {
			navigation.navigate('CheckIn', { id: item.checkinID });
		}
	}

	async function update(data) {
		let notifList = [];
		for (let i in data) {
			//console.log(checkIns[data[i].checkin_id]) // Theres a bug hiding in here

			if (data[i].content.includes('accepted your tramigo request')) {
				// Increment experience
				let newExp = experience.joinActOrTrip + currentUser.exp;
				dispatch(updateExperience(newExp, currentUser.level));
				await API.graphql(
					graphqlOperation(customUpdateExp, {
						id: currentUser.id,
						exp: newExp,
						level: calculateLevel(newExp, currentUser.level),
					})
				);
			}
			if (!currentUser.blockedUsers[data[i].otherUser.id] && !currentUser.blockedByUsers[data[i].otherUser.id]) {
				notifList.push({
					notifId: data[i].id,
					userName: data[i].otherUser.id != undefined ? data[i].otherUser.name + ' ' + data[i].otherUser.lastName : '',
					itemName: data[i].activityID
						? activities[data[i].activityID].title
						: data[i].tripID
						? trips[data[i].tripID].title
						: data[i].checkinID
						? locations[checkIns[data[i].checkinID]['location']]['addressStr']
						: null,
					itemType: data[i].activityID ? 'activity' : 'trip',
					activityID: data[i].activityID,
					tripID: data[i].tripID,
					postId: data[i].postID,
					createdAt: data[i].createdAt,
					clicked: data[i].clicked,
					seen: data[i].seen,
					userId: data[i].otherUser.id,
					content: data[i].content,
				});
			}
		}
		notifList = notifList.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
		setNotifications(notifList);
		console.log('Notifications loaded!');
	}

	useFocusEffect(
		useCallback(() => {
			update(notifData);
		}, [notifData])
	);

	return (
		<View style={styles.container}>
			<TopNavBar title={'Notifications'} />
			<FlatList
				data={notifications}
				renderItem={renderNotifs}
				keyExtractor={keyExtractor}
				contentContainerStyle={styles.scroll}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			/>
			<BottomNavBar />
		</View>
	);
}

function useTheme(theme) {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			width: '100%',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: theme.colors.background,
		},
		scroll: {
			width: screenWidth,
			paddingBottom: 100,
			backgroundColor: theme.colors.background,
		},
	});

	return styles;
}

export default NotificationsScreen;
