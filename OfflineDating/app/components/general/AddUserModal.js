import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, Dimensions, FlatList } from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { axiosInstance } from '../../axiosAPI';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import TopNavBar from '../../components/general/TopNavBar';
import colors from '../../config/colors';
import Buddy from '../dms/Buddy';
import SearchBar from '../../components/general/SearchBar';
import Button from './Button';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function AddUserModal({ visible, onRequestClose, onPressClose, onPressSave, type, theme }) {
	const navigation = useNavigation();
	const route = useRoute();

	// Redux
	const currentUser = useSelector((state) => state.currentUser);
	const userList = useSelector((state) => state.users);

	// State Hooks
	const [buddyList, setBuddyList] = useState([]);
	const [displayedBuddyList, setDisplayedBuddyList] = useState([]);
	const [memberList, setMemberList] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [prevSearchTerm, setPrevSearchTerm] = useState('');

	function search(searchTerm) {
		if (prevSearchTerm != searchTerm) {
			setPrevSearchTerm(searchTerm);
			setBuddyData();
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

	function onPressBuddy(item) {
		let peopleToAdd = memberList;
		if (!peopleToAdd.includes(item.id)) {
			let buds = buddyList;
			buds.find((x) => x.id === item.id).added = 'Remove';
			setBuddyList[buds];
			peopleToAdd.push(item.id);
		} else {
			let buds = buddyList;
			buds.find((x) => x.id === item.id).added = 'Add';
			setBuddyList[buds];
			peopleToAdd.pop(item.id);
		}

		setMemberList(peopleToAdd);
		setBuddyData();
	}

	const renderBuddies = ({ item }) => (
		<Buddy
			key={item.ref.toString()}
			id={item.id}
			profilePic={item.profilePic}
			name={item.name}
			onPress={() => onPressBuddy(item)}
			buttonText={item.added.toString()}
		/>
	);

	// Include all buddy data from get request in FlatList
	function includeBuddyData(data) {
		let buddies = [];
		for (let i = 0; i < data.length; i++) {
			let buddy = {
				ref: i,
				id: data[i],
				profilePic: userList[data[i]].profile_pic,
				name: userList[data[i]].first_name + ' ' + userList[data[i]].last_name,
				added: 'Add',
			};

			buddies.push(buddy);
		}

		setBuddyList(buddies);
		setDisplayedBuddyList(buddies);
	}

	// Set buddy data based on search term
	function setBuddyData() {
		let buddies = [];
		for (let i = 0; i < buddyList.length; i++) {
			let buddy = {
				ref: i,
				id: buddyList[i].id,
				profilePic: buddyList[i].profilePic,
				name: buddyList[i].name,
				added: buddyList[i].added,
			};

			if (buddy.name.toLowerCase().includes(searchTerm.toLowerCase())) {
				buddies.push(buddy);
			}
		}

		setDisplayedBuddyList(buddies);
	}

	useFocusEffect(
		useCallback(() => {
			includeBuddyData(currentUser.buddies.buddies);
		}, [])
	);

	// function share(users) {
	// 	if (users.length == 0) {
	// 		console.log('users cannot be left blank'); // For debugging
	// 		alert('Please select at least one user.');
	// 	} else {
	// 		try {
	// 			axiosInstance
	// 				.post('/notifications/', {
	// 					id: route.params.id,
	// 					type: route.params.type,
	// 					notif_type: 'share',
	// 					other_user_ids: users,
	// 				})
	// 				.then((res) => {
	// 					navigation.navigate('Explore');
	// 					alert('sent!');
	// 					console.log('Conversation Successfully shared to ', users); // For debugging
	// 				});
	// 			return;
	// 		} catch (error) {
	// 			console.log('ERROR @ Share Screen');
	// 			console.log(error);
	// 		}
	// 	}
	// }

	return (
		<Modal animationType={'slide'} transparent={true} visible={visible} onRequestClose={onRequestClose} statusBarTranslucent={true}>
			<View style={styles.modalView}>
				<TopNavBar title={type == 'monitor' ? 'Add Monitors' : 'Share'} type={'x'} onPressX={onPressClose} />
				<View style={styles.modal}>
					<FlatList
						data={displayedBuddyList}
						renderItem={renderBuddies}
						keyExtractor={(buddy) => buddy}
						ListHeaderComponent={
							<SearchBar
								style={styles.search}
								onChangeText={(searchTerm) => setSearchTerm(searchTerm)}
								searchAlgorithm={search(searchTerm)}
							/>
						}
						ListHeaderComponentStyle={styles.search}
						contentContainerStyle={styles.scroll}
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
					/>

					{/* Submit Button */}
					<Button
						label={type == 'monitor' ? 'Add Monitors' : 'Send!'}
						color={theme.colors.accent1}
						onPress={() => onPressSave(memberList)}
						style={{ marginBottom: 20 }}
					/>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: screenWidth,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: colors.white,
	},
	dateTimePicker: {
		backgroundColor: colors.white,
		borderBottomWidth: 2,
		borderBottomColor: colors.light_teal,
		justifyContent: 'flex-start',
		marginTop: 10,
	},
	search: {
		width: '100%',
		height: 60,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.light_teal,
	},
	modal: {
		backgroundColor: colors.white,
		flex: 1,
		marginHorizontal: 10,
		width: screenWidth,
		alignItems: 'center',
	},
	modalView: {
		flex: 1,
		backgroundColor: colors.black,
		width: screenWidth,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

AddUserModal.propTypes = {
	visible: PropTypes.bool,
	onRequestClose: PropTypes.func,
	onPressClose: PropTypes.func,
	onPressSave: PropTypes.func,
	type: PropTypes.oneOf(['monitor', 'share']),
};

export default AddUserModal;
