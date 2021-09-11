import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import TopNavBar from '../../components/general/TopNavBar';
import BottomNavBar from '../../components/general/BottomNavBar';
import Buddy from '../../components/profile/Buddy';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import SearchBar from '../../components/general/SearchBar';
import colors from '../../config/colors';
import { customGetBuddies } from '../../../../src/graphql/customQueries';
import { storeUsers } from '../../redux/actions/userActions';
import { storeCurrentUser } from '../../redux/actions/currentUserActions';

function BuddiesScreen(props) {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	// Redux
	let currentUser = Object.assign(useSelector((state) => state.currentUser));
	let users = Object.assign(useSelector((state) => state.users));

	// Theme
	const theme = currentUser.theme;
	const styles = useTheme(theme);

	// State
	const [buddyList, setBuddyList] = useState([]);
	const [prevSearchTerm, setPrevSearchTerm] = useState('');
	const [refreshing, setRefreshing] = useState(false);
	const [searchBuddyList, setSearchBuddyList] = useState([]);

	const wait = (timeout) => {
		return new Promise((resolve) => setTimeout(resolve, timeout));
	};

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		const customGetBuddiesQuery = await API.graphql(graphqlOperation(customGetBuddies, { id: currentUser.id }));

		const recievedConfirmedBuddies = customGetBuddiesQuery.data.getUser.receivedRequests.items;
		const requestedConfirmedBuddies = customGetBuddiesQuery.data.getUser.requestedBuddies.items;

		// These two loops are for getting the IDs of actual buddies
		const buddyIDs = [];

		for (let i = 0; i < recievedConfirmedBuddies.length; i++) {
			const item = recievedConfirmedBuddies[i];
			if (item.status == 'accepted') {
				buddyIDs.push(item.requester.id);
			}
			users[recievedConfirmedBuddies[i].requester.id].status = recievedConfirmedBuddies[i].status;
			users[recievedConfirmedBuddies[i].requester.id].relationshipId = recievedConfirmedBuddies[i].id;
		}

		for (let i = 0; i < requestedConfirmedBuddies.length; i++) {
			const item = requestedConfirmedBuddies[i];
			if (item.status == 'accepted') {
				buddyIDs.push(item.requestee.id);
			}
			users[requestedConfirmedBuddies[i].requestee.id].re = requestedConfirmedBuddies[i].status;
			users[requestedConfirmedBuddies[i].requester.id].relationshipId = requestedConfirmedBuddies[i].id;
		}
		currentUser.buddies.buddies = buddyIDs;
		dispatch(storeUsers(users));
		dispatch(storeCurrentUser(currentUser));
		setRefreshing(false);
	}, []);

	const renderBuddies = ({ item }) => (
		<Buddy
			id={item.id}
			key={item.ref}
			name={item.name}
			profilePic={item.profilePic}
			relationshipId={item.relationshipId}
			prevScreen={'Buddies'}
		/>
	);

	function includeData(data) {
		let buddies = [];

		for (let i = 0; i < data.length; i++) {
			if (!currentUser.blockedUsers[data[i]] && !currentUser.blockedByUsers[data[i]]) {
				let buddy = {
					ref: i,
					id: data[i],
					name: users[data[i]].name + ' ' + users[data[i]].lastName,
					relationshipId: users[data[i]].relationshipId,
					profilePic: users[data[i]].profilePicURL,
				};
				buddies.push(buddy);
			}
		}
		setBuddyList(buddies);
		setSearchBuddyList(buddies);
	}

	function search(searchTerm) {
		if (prevSearchTerm != searchTerm) {
			setPrevSearchTerm(searchTerm);
			setSearchBuddyData(searchTerm);
		}
		console.log(`Searching for ${searchTerm}...`);
	}

	// Set buddy data based on search term
	function setSearchBuddyData(searchTerm) {
		let buddies = [];
		for (let i = 0; i < buddyList.length; i++) {
			let buddy = {
				ref: i,
				id: buddyList[i].id,
				name: buddyList[i].name,
				added: buddyList[i].added,
			};
			if (buddy.name.toLowerCase().includes(searchTerm.toLowerCase())) {
				buddies.push(buddy);
			}
		}
		setSearchBuddyList(buddies);
	}

	useFocusEffect(
		useCallback(() => {
			includeData(currentUser.buddies.buddies);
		}, [currentUser])
	);

	return (
		<View style={styles.container}>
			<TopNavBar title={'Buddies'} />
			<FlatList
				data={searchBuddyList}
				renderItem={renderBuddies}
				keyExtractor={(buddy) => buddy.id.toString()}
				ListHeaderComponent={<SearchBar style={styles.search} onChangeText={(searchTerm) => search(searchTerm)} />}
				ListHeaderComponentStyle={styles.search}
				contentContainerStyle={styles.scroll}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{ backgroundColor: theme.colors.primary_light }} />
				}
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
			justifyContent: 'flex-end',
			backgroundColor: theme.colors.background,
		},
		scroll: {
			zIndex: 0,
			width: '100%',
			justifyContent: 'flex-start',
			alignItems: 'center',
			paddingBottom: 110,
			backgroundColor: theme.colors.background,
		},
		search: {
			width: '100%',
			height: 60,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.colors.primary_light,
		},
	});

	return styles;
}

export default BuddiesScreen;
