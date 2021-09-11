import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import TopNavBar from '../../../components/general/TopNavBar';
import BottomNavBar from '../../../components/general/BottomNavBar';
import SearchBar from '../../../components/general/SearchBar';
import Activity from '../../../components/explore/Activity';
import Buddy from '../../../components/profile/Buddy';

function SearchScreen(props) {
	const navigation = useNavigation();

	// Redux
	const allUsers = useSelector((state) => state.users);
	const currentUser = useSelector((state) => state.currentUser);
	const allActivities = useSelector((state) => state.activities);
	const locations = useSelector((state) => state.locations);

	// Theme
	const theme = currentUser.theme;
	const styles = useTheme(theme);

	// State
	const [prevSearchTerm, setPrevSearchTerm] = useState(null);
	const [refreshing, setRefreshing] = useState(false);
	const [dataList, setDataList] = useState([]);
	const [initial, setInitial] = useState(true);

	// Variables
	let i = 0;

	const wait = (timeout) => {
		return new Promise((resolve) => setTimeout(resolve, timeout));
	};

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	const renderDataList = useCallback(({ item }) =>
		item.title ? (
			<Activity
				key={item.ref}
				createdBy={item.createdBy}
				profilePic={allUsers[item.createdBy].profilePicURL}
				title={item.title}
				description={item.description}
				location={item.location}
				dateTime={item.dateTime}
				attendees={item.attendees}
				capacity={item.capacity}
				onPress={() => onPressActivity(item)}
				onPressDetails={() => onPressActivity(item)}
			/>
		) : (
			<Buddy id={item.userId} key={item.ref} name={item.name} profilePic={item.profilePic} hideRemoveButton={true} />
		)
	);

	function onPressActivity(item) {
		// Check if pressed item's id is true in joined array
		let joinedBool = currentUser['activities']['joined'].includes(item.id) || currentUser['activities']['own'].includes(item.id);
		// If user has joined the activity, go to Activity Page
		if (joinedBool) {
			navigation.navigate('ActivityPage', {
				id: item.id,
				navigateTo: 'Search',
			});
			// otherwise go to Activity Detail
		} else {
			navigation.navigate('ActivityDetail', {
				id: item.id,
				navigateTo: 'Search',
			});
		}
	}

	const keyExtractor = useCallback((item, index) => index.toString(), []);

	function filterUsers(searchTerm) {
		let users = [];
		for (let userID in allUsers) {
			if (currentUser.id != userID) {
				let userFullName = allUsers[userID]['name'] + ' ' + allUsers[userID]['lastName'];
				if (userFullName.toLowerCase().includes(searchTerm.toLowerCase())) {
					let user = {
						ref: i++,
						userId: userID,
						name: userFullName,
						profilePic: allUsers[userID].profilePicURL,
					};
					if ((!currentUser.blockedUsers[userID] && !currentUser.blockedByUsers[userID]) || searchTerm == userFullName) {
						users.push(user);
					}
				}
			}
		}

		return users;
	}

	function filterActivites(searchTerm) {
		let activities = [];
		for (let activityID in allActivities) {
			let activityObject = allActivities[activityID];
			console.log(activityObject);

			let condition =
				activityObject.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				activityObject.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				locations[activityObject.location].addressStr.toLowerCase().includes(searchTerm.toLowerCase());

			if (condition) {
				let activity = {
					ref: i++,
					id: activityID,
					createdBy: activityObject.createdBy,
					title: activityObject.title,
					description: activityObject.description,
					location: locations[activityObject.location].addressStr,
					dateTime: activityObject.timeOfEvent,
					attendees: activityObject.attendees.length,
					capacity: activityObject.capacity,
				};
				if (!currentUser.blockedUsers[activityObject.createdBy] && !currentUser.blockedByUsers[activityObject.createdBy]) {
					activities.push(activity);
				}
			}
		}
		return activities;
	}

	useFocusEffect(
		useCallback(() => {
			if (initial) {
				search('');
				setInitial(false);
			}
		})
	);

	function setSearchData(searchTerm) {
		let filteredUsers = filterUsers(searchTerm);
		let filteredActivities = filterActivites(searchTerm);
		setDataList(filteredUsers.concat(filteredActivities));
	}

	function search(searchTerm) {
		if (prevSearchTerm != searchTerm) {
			setPrevSearchTerm(searchTerm);
			setSearchData(searchTerm);
		}
		console.log(`Searching for ${searchTerm}...`);
	}

	return (
		<View style={styles.container}>
			<TopNavBar title={'Search'} />

			<SearchBar style={styles.search} onChangeText={(searchTerm) => search(searchTerm.trim())} />

			<FlatList
				data={dataList}
				renderItem={renderDataList}
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
			flexDirection: 'column',
			backgroundColor: theme.colors.background,
			alignItems: 'center',
		},
		search: {
			width: '100%',
			height: 60,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.colors.primary_light,
		},
		scroll: {
			zIndex: 0,
			justifyContent: 'flex-start',
			alignItems: 'center',
			backgroundColor: theme.colors.background,
			paddingBottom: 100,
		},
	});

	return styles;
}

export default SearchScreen;
