import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, FlatList, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MatchSquare from '../components/MatchSquare';

/**
 * @param *
 * @returns A view where people can see buddie suggestions and meet with people they've never met
 */
const screenWidth = Math.round(Dimensions.get('window').width);

function Matches() {
	let TESTDATA = [
		{
			userId: '1',
			firstName: 'Ellen',
			lastName: 'Mustafa',
			instagram: 'mustafa',
			profilePic: {
				uri: 'https://www.bkacontent.com/wp-content/uploads/2020/10/Depositphotos_336730000_l-2015.jpg',
			},
			phone: 3049821999,
		},
		{
			userId: '2',
			firstName: 'Dwayne',
			lastName: 'Johnson',
			instagram: 'therock',
			profilePic: {
				uri: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg',
			},
			phone: 341414323,
		},
		{
			userId: '3',
			firstName: 'Becky',
			lastName: 'McTwist',
			instagram: 'mctwisty',
			profilePic: {
				uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
			},
			phone: 940193949,
		},
		{
			userId: '4',
			firstName: 'Haley',
			lastName: 'Umpquat',
			instagram: 'umpquath',
			profilePic: {
				uri: 'https://hope1032.com.au/wp-content/uploads/2019/10/Waiting-for-friends-1200-x-480.png',
			},
			phone: 4910433943,
		},
	];
	const navigation = useNavigation();
	const route = useRoute();
	const [refreshing, setRefreshing] = useState(false);
	const [searchProfilesList, setSearchProfilesList] = useState([]);

	// Redux
	const matchList = TESTDATA;
	const userList = {};

	// Theme
	const styles = useTheme();

	const onRefresh = useCallback(() => {
		includeData(TESTDATA);
	}, []);

	const renderSquares = ({ item }) => (
		<MatchSquare
			key={item.ref}
			profilePic={item.profilePic}
			instagram={item.instagram}
			name={item.name}
			tapped={item.tapped}
			phone={item.phone}
		/>
	);

	function includeData(data) {
		let users = [];
		// let i = 0;
		console.log(data.length);
		for (let i = 0; i < data.length; i++) {
			const user = data[i];
			try {
				let userData = {
					ref: i,
					userId: user.userId,
					name: data[i]['firstName'] + ' ' + data[i]['lastName'],
					profilePic: data[i]['profilePic'],
					instagram: data[i]['instagram'],
					tapped: false,
					phone: data[i]['phone'],
				};
				users.push(userData);
			} catch (err) {
				console.log('error in include data for meet', err);
				continue;
			}
		}
		setSearchProfilesList(users);
	}

	useEffect(() => {
		includeData(matchList);
		console.log('Meet loaded', searchProfilesList.length, ' unique profiles!');
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={searchProfilesList}
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
			backgroundColor: 'black',
			paddingTop: '2%',
			paddingBottom: '5%',
			alignItems: 'center',
			justifyContent: 'center',
			width: screenWidth,
		},
	});

	return styles;
}

export default Matches;
