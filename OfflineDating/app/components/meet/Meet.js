import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { updateState, wait } from '../../config/functions';
import MeetSquare from './MeetSquare';
import flags from '../../config/flags';

/**
 * @param *
 * @returns A view where people can see buddie suggestions and meet with people they've never met
 */
const screenWidth = Math.round(Dimensions.get('window').width);

function Meet() {
	const dispatch = useDispatch();
	const [refreshing, setRefreshing] = useState(false);
	const [searchProfilesList, setSearchProfilesList] = useState([]);

	// Redux
	const meetList = useSelector((state) => state.meet);
	const userList = useSelector((state) => state.users);
	const currentUser = useSelector((state) => state.currentUser);
	const activities = useSelector((state) => state.activities);
	const trips = useSelector((state) => state.trips);
	const notifications = useSelector((state) => state.notifications);
	const posts = useSelector((state) => state.posts);
	const stories = useSelector((state) => state.stories);
	const newsfeed = useSelector((state) => state.newsfeed);
	const checkIns = useSelector((state) => state.checkIns);

	// Theme
	const theme = currentUser.theme;
	const styles = useTheme(theme);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		// updateState(dispatch, currentUser, trips, activities, notifications, posts, stories, newsfeed, locations, checkIns);
		includeData(meetList);
		wait(3000).then(() => setRefreshing(false));
	});

	const renderSquares = ({ item }) => (
		<MeetSquare
			key={item.ref}
			profilePic={item.profilePic}
			firstName={item.firstName}
			lastName={item.lastName}
			flag={item.flag}
			userId={item.userId}
		/>
	);

	function includeData(data) {
		let users = [];
		// let i = 0;
		for (let i = 0; i < data.length; i++) {
			const user = data[i];
			if (currentUser.id != user && user != 211) {
				try {
					let userData = {
						ref: i++,
						userId: user,
						firstName: userList[user]['name'],
						lastName: userList[user]['lastName'],
						profilePic: { uri: userList[user]['profilePicURL'] },
						flag: flags[userList[user]['country']],
					};
					if (userData.profilePic.uri) {
						const splitOnDots = userData.profilePic.uri.split('.');
						const last = splitOnDots.length - 1;
						if (splitOnDots[last] === 'jpg' || splitOnDots[last] === 'png') {
							users.push(userData);
						}
					}
				} catch (err) {
					console.log('error in include data for meet', err);
					i++;
					continue;
				}
			}
		}
		setSearchProfilesList(users);
	}

	useFocusEffect(
		useCallback(() => {
			includeData(meetList);
			console.log('Meet loaded', searchProfilesList.length, ' unique profiles!');
		}, [])
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={searchProfilesList}
				// data={
				// 	searchProfilesList.length % 2 == 0 || searchProfilesList.length == 1
				// 		? searchProfilesList
				// 		: searchProfilesList.slice(0, searchProfilesList.length - 1)
				// }
				renderItem={renderSquares}
				keyExtractor={(square) => square.ref.toString()}
				contentContainerStyle={styles.scroll}
				numColumns={2}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				columnWrapperStyle={styles.column}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
}

function useTheme(theme) {
	const styles = StyleSheet.create({
		column: {
			width: '45%',
		},
		container: {
			flex: 1,
			width: '100%',
			alignItems: 'center',
			justifyContent: 'center',
		},
		scroll: {
			zIndex: 0,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: theme.colors.background,
			paddingTop: '20%',
			paddingBottom: 110,
			alignItems: 'center',
			justifyContent: 'center',
			width: screenWidth,
		},
	});

	return styles;
}

export default Meet;
