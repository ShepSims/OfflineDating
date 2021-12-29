import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, FlatList, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MatchSquare from '../components/MatchSquare';
import { useSelector } from 'react-redux';

/**
 * @param *
 * @returns A view where people can see buddie suggestions and meet with people they've never met
 */
const screenWidth = Math.round(Dimensions.get('window').width);

function Match() {
	const route = useRoute();
	const [searchProfilesList, setSearchProfilesList] = useState([]);
	const [refresh, setRefresh] = useState(true);

	const users = useSelector((state) => state.users);
	const events = useSelector((state) => state.events);

	// Theme
	const styles = useTheme();

	const renderSquares = ({ item }) => <MatchSquare key={item.ref} profilePic={item.profilePic} name={item.name} tapped={item.tapped} />;

	function includeData() {
		let data = events[route.params.eventID].attendees;
		for (let i in events[route.params.eventID].dismissed) {
			let dismissedUserID = events[route.params.eventID].dismissed[i];
			if (data.includes(dismissedUserID)) data.splice(data.indexOf(dismissedUserID), 1);
		}
		let meetList = [];
		// let i = 0;
		for (let i in data) {
			const user = users[data[i]];
			try {
				let name = user['firstName'] + ' ' + user['lastName'];
				let pfp = user['profilePic'];
				let userData = {
					ref: i,
					userId: user.userId,
					name: name,
					profilePic: pfp,
					tapped: false,
				};
				meetList.push(userData);
			} catch (err) {
				console.log('error in include data for meet', err);
				continue;
			}
		}
		console.log(meetList.length);
		setSearchProfilesList(meetList);
	}

	useEffect(() => {
		setRefresh(false);
		includeData();
		setTimeout(() => {
			setRefresh(true);
		}, 15);
		console.log('Meet loaded', searchProfilesList.length, ' unique profiles!');
	}, [route]);

	return (
		<View style={styles.container}>
			{refresh && (
				<FlatList
					data={searchProfilesList}
					renderItem={renderSquares}
					keyExtractor={(square) => square.ref.toString()}
					extraData={route}
					contentContainerStyle={styles.scroll}
					numColumns={2}
					columnWrapperStyle={styles.column}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
				/>
			)}
		</View>
	);
}

function useTheme() {
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
			backgroundColor: '#000000',
			paddingTop: '2%',
			paddingBottom: '5%',
			alignItems: 'center',
			justifyContent: 'center',
			width: screenWidth,
		},
	});

	return styles;
}

export default Match;
