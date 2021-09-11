import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, FlatList, RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createChatRoom, createChatRoomUser } from '../../../../../src/graphql/mutations';
import { getBuddies } from '../../../../../src/graphql/customQueries';
import { getUser, listUsers } from '../../../../../src/graphql/queries';
import { useDispatch, useSelector } from 'react-redux';
import { storeInbox } from '../../../redux/actions/inboxActions';
import TopNavBar from '../../../components/general/TopNavBar';
import Buddy from '../../../components/dms/Buddy';
import SearchBar from '../../../components/general/SearchBar';
import Button from '../../../components/general/Button';
import images from '../../../config/images';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function CreateConversationScreen(props) {
	const navigation = useNavigation();
	const route = useRoute();

	// Redux
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.currentUser);
	const userList = useSelector((state) => state.users);
	let inbox = Object.assign(useSelector((state) => state.inbox));

	// Theme
	const theme = currentUser.theme;
	const styles = useTheme(theme);

	// State
	const [buddyList, setBuddyList] = useState([]);
	const [displayedBuddyList, setDisplayedBuddyList] = useState([]);
	const [memberList, setMemberList] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [prevSearchTerm, setPrevSearchTerm] = useState('');

	let userInfo;
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
			let pfp = images.pfpTeal;
			let storeUser = Object.keys(userList).find((u) => userList[u] != null);
			if (userList[storeUser]['sub'] == data[i].id && storeUser != currentUser.id) {
				pfp = userList[storeUser].profilePicURL;
			} else {
				pfp = images.pfpTeal;
			}
			let buddy = {
				ref: data[i].id,
				id: data[i].id,
				profilePic: pfp,
				name: data[i].name + ' ' + data[i].lastName,
				added: 'Add',
			};

			if (buddy.id != userInfo.username) {
				buddies.push(buddy);
			}
		}
		setBuddyList(buddies);
		setDisplayedBuddyList(buddies);
	}

	// Set buddy data based on search term
	function setBuddyData() {
		let buddies = [];
		for (let i = 0; i < buddyList.length; i++) {
			let pfp;
			let storeUser = Object.keys(userList).find((sub) => userList[sub] != null);
			if (userList[storeUser]['sub'] == buddyList[i]['id'] && storeUser != currentUser.id) {
				pfp = userList[storeUser].profilePicURL;
			} else {
				pfp = images.pfpTeal;
			}
			let buddy = {
				ref: buddyList[i].id,
				id: buddyList[i].id,
				profilePic: pfp,
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
			const fetchUsers = async () => {
				const allUsers = await API.graphql(graphqlOperation(listUsers));
				userInfo = await Auth.currentAuthenticatedUser();
				includeBuddyData(allUsers.data.listUsers.items);
			};
			fetchUsers();
		}, [])
	);

	async function findChatRoom(id, users) {
		let title = '';
		let andCount = 0;
		for (let i = 0; i < users.length; i++) {
			const userInChat = await API.graphql(graphqlOperation(getUser, { id: users[i] }));
			if (!andCount) {
				title += `${userInChat.data.getUser.name} ${userInChat.data.getUser.lastName}`;
			} else {
				title += ` & ${userInChat.data.getUser.name} ${userInChat.data.getUser.lastName}`;
			}
			andCount++;
		}
		navigation.navigate('Conversation', {
			id,
			title: title,
		});
	}

	function createConversation(navigation) {
		if (memberList.length == 0) {
			console.log('memberList cannot be left blank'); // For debugging
			alert('You must select members to add to your conversation.');
		} else {
			//check if conversation between specifically this group of people already exists and if so redirect to that conversation
			let newConv = false;
			for (let conversation in inbox) {
				let chatRoomUsersArr = inbox[conversation]['users'];
				let different = false;
				for (let i = 0; i < memberList.length; i++) {
					if (!chatRoomUsersArr || !chatRoomUsersArr.includes(memberList[i])) {
						different = true;
					}
				}
				if (!different && chatRoomUsersArr.length == memberList.length) {
					findChatRoom(inbox[conversation].id, memberList);
					return;
				}
				// else {
				// 	if (users.length == inbox[conversation].participants.length) {
				// 		navigation.navigate('Conversation', {
				// 			id: inbox[conversation].id,
				// 			title: inbox[conversation].title
				// 		})
				// 		return;
				// 	}
				// }
			}

			try {
				async function associateUsers() {
					// const chatRoom = createAChatRoom();
					const newChatRoomData = await API.graphql(
						graphqlOperation(
							createChatRoom,
							{ input: { lastMessageID: 1 } } // lastMessageID is a temporary fix
						)
					);

					if (!newChatRoomData.data) {
						console.log('Failed to create a new chat');
						return;
					}

					let title = '';
					let andCount = 0;
					const chatRoomUsersArr = [];
					for (let i = 0; i < memberList.length; i++) {
						const id = memberList[i];

						const newUserChatRoom = await API.graphql(
							graphqlOperation(createChatRoomUser, {
								input: {
									userID: id,
									chatRoomID: newChatRoomData.data.createChatRoom.id,
								},
							})
						);

						chatRoomUsersArr.push(newUserChatRoom);

						const userInChat = await API.graphql(graphqlOperation(getUser, { id }));

						if (!andCount) {
							title += `${userInChat.data.getUser.name} ${userInChat.data.getUser.lastName}`;
						} else {
							title += ` & ${userInChat.data.getUser.name} ${userInChat.data.getUser.lastName}`;
						}

						andCount++;
					}

					userInfo = await Auth.currentAuthenticatedUser();
					// createAChatRoomUser(userInfo.attributes.sub, chatRoom.id);
					const currentUserChatRoomUser = await API.graphql(
						graphqlOperation(createChatRoomUser, {
							input: {
								userID: userInfo.username,
								chatRoomID: newChatRoomData.data.createChatRoom.id,
							},
						})
					);

					chatRoomUsersArr.push(currentUserChatRoomUser);
					const newChatRoom = {};
					newChatRoom[newChatRoomData.data.createChatRoom.id] = newChatRoomData.data.createChatRoom;

					newChatRoom[newChatRoomData.data.createChatRoom.id].chatRoomUsers.items = chatRoomUsersArr;

					dispatch(storeInbox(newChatRoom));

					navigation.navigate('Conversation', {
						id: newChatRoomData.data.createChatRoom.id,
						title: title,
					});
				}

				associateUsers();
				return;
			} catch (error) {
				console.log('ERROR @ Create Create Conversation');
				console.log(error);
			}
		}
	}

	return (
		<View style={styles.container}>
			<TopNavBar type={'back'} title={'New Conversation'} />

			<View style={styles.mainView}>
				<FlatList
					data={displayedBuddyList}
					renderItem={renderBuddies}
					keyExtractor={(buddy) => buddy.ref}
					ListHeaderComponent={
						<SearchBar
							style={styles.search}
							onChangeText={(searchTerm) => setSearchTerm(searchTerm)}
							searchAlgorithm={search(searchTerm)}
						/>
					}
					ListHeaderComponentStyle={styles.search}
					contentContainerStyle={styles.scroll}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{ backgroundColor: theme.colors.primary_light }} />
					}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
				/>

				{/* Submit Button */}
				<Button
					label={'Submit'}
					size={'large'}
					color={theme.colors.accent1}
					onPress={() => createConversation(navigation)}
					style={{
						position: 'absolute',
						bottom: screenHeight * 0.215,
					}}
				/>
			</View>
		</View>
	);
}

function useTheme(theme) {
	const styles = StyleSheet.create({
		mainView: {
			height: screenHeight * 0.7,
		},
		buttonContainer: {
			alignItems: 'center',
			position: 'absolute',
			bottom: screenHeight * 0.05,
			width: screenWidth,
			position: 'absolute',
		},
		container: {
			width: screenWidth,
			alignItems: 'center',
			justifyContent: 'flex-start',
			backgroundColor: theme.colors.background,
		},
		createConversationButton: {
			height: 50,
			width: screenWidth * 0.7,
			backgroundColor: theme.colors.accent1,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 999,
		},
		dateTimePicker: {
			backgroundColor: theme.colors.background,
			borderBottomWidth: 2,
			borderBottomColor: theme.colors.primary_light,
			justifyContent: 'flex-start',
			marginTop: 10,
		},
		mainView: {
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
		submitText: {
			color: theme.colors.white,
			fontSize: 25,
		},
		scroll: {
			backgroundColor: theme.colors.background,
			paddingBottom: screenHeight * 0.3,
		},
	});

	return styles;
}

export default CreateConversationScreen;
