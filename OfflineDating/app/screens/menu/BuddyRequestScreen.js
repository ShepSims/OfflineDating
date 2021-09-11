import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { updateUser } from '../../redux/actions/currentUserActions';
import TopNavBar from '../../components/general/TopNavBar';
import BottomNavBar from '../../components/general/BottomNavBar';
import Buddy from '../../components/dms/Buddy';
import SearchBar from '../../components/general/SearchBar';
import colors from '../../config/colors';
import { customAcceptBuddy, customGetBuddiesRequests } from '../../../../src/graphql/customQueries';

function BuddyRequestScreen(props) {
	const navigation = useNavigation();

	// Redux
	const dispatch = useDispatch();
	let currentUser = Object.assign(useSelector((state) => state.currentUser));
	const users = useSelector((state) => state.users);

	// Theme
	const theme = currentUser.theme;
	const styles = useTheme(theme);

	// State
	const [requestList, setRequestList] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [refreshing, setRefreshing] = useState(false);
	const [prevSearchTerm, setPrevSearchTerm] = useState('');
	const [displayedRequestList, setDisplayedRequestList] = useState([]);

	function search(searchTerm) {
		if (prevSearchTerm != searchTerm) {
			setPrevSearchTerm(searchTerm);
			setRequestData();
		}
		console.log(`Searching for ${searchTerm}...`);
	}

	const wait = (timeout) => {
		return new Promise((resolve) => setTimeout(resolve, timeout));
	};

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	const renderRequests = ({ item }) => (
		<Buddy
			key={item.ref}
			id={item.userId}
			requestId={item.requestId}
			name={item.name}
			profilePic={item.profilePic}
			onPress={() => onPressAdd(item)}
			buttonText={item.added.toString()}
		/>
	);

	async function onPressAdd(item) {
		let mounted = true;
		await API.graphql(graphqlOperation(customAcceptBuddy, { id: item.requestId }));
		includeData();
		return () => (mounted = false);
	}

	// Get initial buddy data on focus
	async function includeData() {
		const authUser = await Auth.currentAuthenticatedUser();
		await API.graphql(graphqlOperation(customGetBuddiesRequests, { id: authUser.username })).then((data) => {
			data = data.data.getUser.receivedRequests.items;
			let requestedUsers = [];
			for (let i = 0; i < data.length; i++) {
				let user = {
					ref: i,
					userId: data[i].requester.id,
					requestId: data[i].id,
					name: data[i].requester.name + ' ' + data[i].requester.lastName,
					profilePic: data[i].requester.profilePicURL,
					added: 'Add',
				};
				requestedUsers.push(user);
			}
			setRequestList(requestedUsers);
			setDisplayedRequestList(requestedUsers);
		});
	}

	// Set buddy data based on search term
	function setRequestData() {
		let requests = [];
		for (let i = 0; i < requestList.length; i++) {
			let request = {
				ref: i,
				id: requestList[i].id,
				name: requestList[i].name,
				added: requestList[i].added,
			};
			if (request.name.toLowerCase().includes(searchTerm.toLowerCase())) {
				requests.push(request);
			}
		}
		setDisplayedRequestList(requests);
	}

	useFocusEffect(
		useCallback(() => {
			includeData();
		}, [currentUser.buddies.receivedFriendRequestList])
	);

	return (
		<View style={styles.container}>
			<TopNavBar title={'Tramigo Requests'} />
			<FlatList
				data={displayedRequestList}
				renderItem={renderRequests}
				keyExtractor={(buddy) => buddy.userId}
				ListHeaderComponent={
					<SearchBar style={styles.search} onChangeText={(searchTerm) => setSearchTerm(searchTerm)} searchAlgorithm={search(searchTerm)} />
				}
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
			backgroundColor: theme.colors.primary_light,
		},
		scroll: {
			flex: 1,
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

export default BuddyRequestScreen;
