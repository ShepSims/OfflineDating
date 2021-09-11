import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Dimensions, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { storeInbox } from '../../../redux/actions/inboxActions';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getInbox } from '../../../../../src/graphql/customQueries';
import TopNavBar from '../../../components/general/TopNavBar';
import BottomNavBar from '../../../components/general/BottomNavBar';
import MessagePreview from '../../../components/dms/MessagePreview';
import FloatingButton from '../../../components/general/FloatingButton';
import SearchBar from '../../../components/general/SearchBar';
import moment from 'moment';
import images from '../../../config/images';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function InboxScreen(props) {
	const navigation = useNavigation();

	// Redux
	const dispatch = useDispatch();
	const inbox = Object.assign(useSelector((state) => state.inbox));
	const users = useSelector((state) => state.users);
	const currentUser = useSelector((state) => state.currentUser);

	// Theme
	const theme = currentUser.theme;
	const styles = useTheme(theme);

	// State
	const [searchTerm, setSearchTerm] = React.useState('');
	const [refreshing, setRefreshing] = useState(false);
	// const [conversations, setConversations] = useState([]);
	const [chatRooms, setChatRooms] = useState([]);

	function search(searchTerm) {
		console.log(`Searching for ${searchTerm}...`);
	}

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		fetchChatRooms();
		setRefreshing(false);
	});

	const renderChats = ({ item }) => (
		<MessagePreview
			key={item.id.toString()}
			id={item.id}
			title={item.title}
			time={item.lastMessageTime}
			text={item.preview} // temporary
			pfp={item.pfp}
		/>
	);

	const fetchChatRooms = async () => {
		try {
			// Change this line when the state is updated to reflect the real user
			const authUser = await Auth.currentAuthenticatedUser();

			let box = [];

			await API.graphql(graphqlOperation(getInbox, { id: authUser.username })).then((conversations) => {
				for (let i in conversations['data']['getUser']['chatRoomUser']['items']) {
					let conversation = conversations['data']['getUser']['chatRoomUser']['items'][i];
					let members = [];
					let title = '';
					let preview = conversation['chatRoom']['lastMessage']
						? conversation['chatRoom']['lastMessage']['content'].split('.')[0] === 'https://image-uploader-streetsmart1'
							? '(photo)'
							: conversation['chatRoom']['lastMessage']['content'].split('.')[0] === 'https://video-uploader-streetsmart1'
							? '(video)'
							: conversation['chatRoom']['lastMessage']['content'].trim()
						: conversation['chatRoom']['lastMessage']['activityID']
						? '(activity)'
						: conversation['chatRoom']['lastMessage']['tripID']
						? '(trip)'
						: 'no messages';
					let lastMessageTime = conversation['chatRoom']['lastMessage'] ? conversation['chatRoom']['lastMessage']['createdAt'] : '';
					let date = moment(lastMessageTime).format('MM/DD/YYYY');
					let time = lastMessageTime != '' ? moment(lastMessageTime).format('hh:mm A') : '';
					let c = 0;
					let pfp = images.pfpTeal;
					for (let j in conversation['chatRoom']['chatRoomUsers']['items']) {
						let user = conversation['chatRoom']['chatRoomUsers']['items'][j];
						let upfp = images.pfpTeal;
						try {
							if (
								user.user.id != authUser.username &&
								!currentUser.blockedByUsers[user['user']['id']] & !currentUser.blockedUsers[user['user']['id']]
							) {
								if (users[user.user.id]['profilePicURL']) {
									upfp = { uri: users[user.user.id]['profilePicURL'] };
								}
							} else if (currentUser.blockedByUsers[user['user']['id']] || currentUser.blockedUsers[user['user']['id']]) {
								preview = 'blocked';
							}
						} catch {
							console.log('user deleted');
						}

						if (user['user'] == null) c == 0 ? (title = '(User Deleted)') : (title += ', (User Deleted)');
						else if (user['user']['id'] != authUser.username) {
							let userName = user.user.name;
							if (!currentUser.blockedByUsers[user['user']['id']] & !currentUser.blockedUsers[user['user']['id']]) {
								if (conversation['chatRoom']['chatRoomUsers']['items'].length <= 2) {
									title += userName + ' ' + user.user.lastName;
								} else {
									if (c == 0) {
										if (title.length != 0) title += ', ';
										title += userName;
									} else if (c == conversation['chatRoom']['chatRoomUsers']['items'].length - 2) {
										title += ' & ' + userName;
									} else {
										title += ', ' + userName;
									}
								}

								c++;
							}
							members.push(user['user']['id']);
						}

						if (pfp == images.pfpTeal && upfp != images.pfpTeal) pfp = upfp;
					}
					if (preview == 'blocked') {
						let leng = members.length;
						preview = 'Conversation with ' + leng + ' others';
					}
					if (title.length > 30) {
						title = title.substring(0, 30) + '...';
					}

					if (!(members.length == 1 && (currentUser.blockedByUsers[members[0]] || currentUser.blockedUsers[members[0]]))) {
						box.push({
							id: conversation['chatRoomID'],
							users: members,
							title: title,
							preview: preview,
							lastMessageTime: (new Date(Date.now()) - new Date(lastMessageTime)) / 3600000 / 24 > 1 ? date : time,
							pfp: pfp,
						});
					}

					setChatRooms(box);
					dispatch(storeInbox(box));
				}
			});
		} catch (e) {
			console.log(e);
		}
	};

	useFocusEffect(
		useCallback(() => {
			fetchChatRooms();
		}, [])
	);

	return (
		<View style={styles.container}>
			<TopNavBar title={'Inbox'} />
			<FlatList
				data={chatRooms}
				renderItem={renderChats}
				keyExtractor={(item) => item.id.toString()}
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
			<FloatingButton
				color={theme.colors.accent1}
				iconName={'plus'}
				size={35}
				iconColor={theme.colors.white}
				navigateTo={'CreateConversation'}
			/>
			<BottomNavBar />
		</View>
	);
}

function useTheme(theme) {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'flex-start',
			backgroundColor: theme.colors.background,
		},
		scroll: {
			paddingBottom: 110,
			backgroundColor: theme.colors.background,
			height: screenHeight,
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

export default InboxScreen;
