import React, { useState, useLayoutEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { determinePFP } from '../../../config/functions';
import { storeCurrentUser, updateUser } from '../../../redux/actions/currentUserActions';
import { calculateCurrentExp, calculateCurrentExpCap } from '../../../config/experience';
import { calculateAge } from '../../../config/functions';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createChatRoom, createChatRoomUser, deleteBuddy, deleteNotification } from '../../../../../src/graphql/mutations';
import { storeInbox } from '../../../redux/actions/inboxActions';
import { getUser } from '../../../../../src/graphql/queries';
import {
	customAcceptBuddy,
	customBlockUser,
	customCheckIfBuddyNotificationExists,
	customCreateBuddy,
	customCreateNotification,
	customGetBuddies,
	customGetUserLikes,
	customListUserPosts,
	customUnblockUser,
	getInbox,
	getOtherUser,
} from '../../../../../src/graphql/customQueries';
import TopNavBar from '../../../components/general/TopNavBar';
import ProfileMap from '../../../components/profile/ProfileMap';
import ProfileSection from '../../../components/profile/ProfileSection';
import Post from '../../../components/newsfeed/Post';
import BottomNavBar from '../../../components/general/BottomNavBar';
import ContentPlaceholder from '../../../components/profile/ContentPlaceholder';
import FloatingButton from '../../../components/general/FloatingButton';
import ProgressBar from '../../../components/profile/ProgressBar';
import BadgesModal from '../../../components/profile/BadgesModal';
import ProfilePicModal from '../../../components/profile/ProfilePicModal';
import RemoveBuddyModal from '../../../components/profile/RemoveBuddyModal';
import AcceptBuddyModal from '../../../components/profile/AcceptBuddyModal';
import NotMyProfileOptionsModal from '../../../components/profile/NotMyProfileOptionsModal';
import Icon from '../../../assets/icons/TramigoIcon';
import images from '../../../config/images';
import places from '../../../config/places';
import moment from 'moment';
import Activity from '../../../components/explore/Activity';
import Trip from '../../../components/explore/Trip';
import { storeUsers } from '../../../redux/actions/userActions';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function NotMyProfileScreen(props) {
	// Navigation
	const navigation = useNavigation();
	const route = useRoute();

	// Redux
	const dispatch = useDispatch();
	let currentUser = Object.assign(useSelector((state) => state.currentUser));
	const activities = useSelector((state) => state.activities);
	const trips = useSelector((state) => state.trips);
	const locations = useSelector((state) => state.locations);
	let users = Object.assign(useSelector((state) => state.users));

	// Theme
	const theme = currentUser.theme;
	const styles = useTheme(theme);

	// State
	const [id, setID] = useState('');
	const [requestID, setRequestID] = useState('');
	const [name, setName] = useState('');
	const [bio, setBio] = useState('');
	const [age, setAge] = useState('');
	const [location, setLocation] = useState('');
	const [work, setWork] = useState('');
	const [school, setSchool] = useState('');
	const [profilePic, setProfilePic] = useState(images.pfpWhite);
	const [posts, setPosts] = useState([]);
	const [toggle, setToggle] = useState([true, false, false, false]);
	const [mapValues, setMapValues] = useState([]);
	const [level, setLevel] = useState(1);
	const [exp, setExp] = useState(0);
	const [tripList, setTripList] = useState([]);
	const [activityList, setActivityList] = useState([]);
	const [buddyList, setBuddyList] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [pfpModalVisible, setPfpModalVisible] = useState(false);
	const [optionsModalVisible, setOptionsModalVisible] = useState(false);
	const [removeBuddyModalVisible, setRemoveBuddyModalVisible] = useState(false);
	const [acceptBuddyModalVisible, setAcceptBuddyModalVisible] = useState(false);
	const [favedPosts, setFavedPosts] = useState([]);
	const [badges, setBadges] = useState({});
	const [mapExpanded, setMapExpanded] = useState(false);
	const [floatingBtnIcon, setFloatingBtnIcon] = useState('plus');

	// Constants
	const iconColor = theme.colors.white;
	const iconSize = 25;

	let schedule = renderSchedule();
	let buddies = renderBuddies();

	const userInfo = () => {
		let currentExp = calculateCurrentExp(exp, level);
		console.log('currentExp', currentExp);
		let currentExpCap = calculateCurrentExpCap(level);
		if (currentUser.blockedByUsers[route.params.other_user_id] || currentUser.blockedUsers[route.params.other_user_id]) {
			return (
				<View style={{ width: '100%', alignItems: 'center' }}>
					<Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.text }}>Level 0</Text>
					<ProgressBar step={0} steps={100} width={'90%'} height={20} color={theme.colors.accent2} />
					<View style={{ height: 20, width: '100%' }} />
					{bio != '' && <ProfileSection title={'About Me'} text={''} />}
					<ProfileSection title={'Age'} text={''} />
					<ProfileSection title={'Country'} text={''} />
					{work != '' && <ProfileSection title={'Work'} text={''} />}
					{school != '' && <ProfileSection title={'School'} text={''} />}
				</View>
			);
		}

		return (
			<View style={{ width: '100%', alignItems: 'center' }}>
				<Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.text }}>Level {level}</Text>
				<ProgressBar step={currentExp} steps={currentExpCap} width={'90%'} height={20} color={theme.colors.accent2} />
				<View style={{ height: 20, width: '100%' }} />
				{bio != '' && <ProfileSection title={'About Me'} text={bio} />}
				<ProfileSection title={'Age'} text={age.toString()} />
				<ProfileSection title={'Country'} text={location} />
				{work != '' && <ProfileSection title={'Work'} text={work} />}
				{school != '' && <ProfileSection title={'School'} text={school} />}
			</View>
		);
	};

	const userPosts = () => {
		if (posts.length === 0 || currentUser.blockedByUsers[route.params.other_user_id] || currentUser.blockedUsers[route.params.other_user_id]) {
			return <ContentPlaceholder iconName={'world'} text={"There's nothing here."} />;
		} else {
			return posts.reverse().map((value, index) => (
				<Post
					id={value.id}
					key={index}
					userId={value.userID}
					userName={users[value.userID].name + ' ' + users[value.userID].lastName}
					profilePic={users[value.userID].profilePicURL}
					text={value.content}
					location={value.locationID}
					dateTime={value.createdAt}
					source={value.source}
					faved={favedPosts.includes(value.id)} // This needs work
				/>
			));
		}
	};

	const [content, setContent] = useState(userInfo());

	async function fetchProfileContent() {
		if (currentUser.blockedByUsers[route.params.other_user_id] || currentUser.blockedUsers[route.params.other_user_id]) {
			setName(currentUser.blockedByUsers[route.params.other_user_id] ? 'Blocked by User' : 'User Blocked');
			setBio('');
			setLocation('');
			setWork('');
			setSchool('');
			setProfilePic(determinePFP(null, images.pfpWhite));
			// includeActivities(res.data.getUser['activities']);
			// includeTrips(res.data.getUser['trips']);
			setAge('');
			setExp(0);
			setLevel(0);
		} else {
			await API.graphql(graphqlOperation(getOtherUser, { id: route.params['other_user_id'] }))
				.then(async (res) => {
					let newAge = calculateAge(new Date(res.data.getUser['birthday']));
					const authUser = await Auth.currentAuthenticatedUser();
					setID(route.params['other_user_id']);
					setName(res.data.getUser['name'] + ' ' + res.data.getUser['lastName']);
					setBio(res.data.getUser['bio']);
					setLocation(res.data.getUser['location']);
					setWork(res.data.getUser['work']);
					setSchool(res.data.getUser['school']);
					setProfilePic(determinePFP(res.data.getUser['profilePicURL'], images.pfpWhite));
					// includeActivities(res.data.getUser['activities']);
					// includeTrips(res.data.getUser['trips']);
					setAge(newAge);
					setExp(res.data.getUser['exp']);
					setLevel(res.data.getUser['level']);

					let sentRequests = res.data.getUser.requestedBuddies.items;
					let receivedRequests = res.data.getUser.receivedRequests.items;
					for (let i in sentRequests) {
						if (sentRequests[i].requesteeID == authUser.username) {
							//then the other user has sent the current user a request
							setRequestID(sentRequests[i].id);
							if (sentRequests[i].status == 'accepted') {
								//then the users are friends, so make button the check button
								setFloatingBtnIcon('backpacker-check');
							} else {
								//there has been no response, so make button pop up the modal
								setFloatingBtnIcon('backpacker-plus');
							}
						}
					}
					for (let i in receivedRequests) {
						if (receivedRequests[i].requesterID == authUser.username) {
							//then the current user has sent the other user a request
							setRequestID(receivedRequests[i].id);
							if (receivedRequests[i].status == 'accepted') {
								//then the users are friends, so make button the check button
								setFloatingBtnIcon('backpacker-check');
							} else {
								//there has been no response, so make button the cancel request button
								setFloatingBtnIcon('backpacker-paper-airplane');
							}
						}
					}

					if (res.data.getUser['places'] != null && !currentUser.blockedByUsers[route.params.other_user_id]) {
						setMapValues(res.data.getUser['places']);
					} else {
						let temp = Array(places.length).fill(0);
						setMapValues(temp);
					}
				})
				.catch((err) => {
					console.log('Error @ Getting profile info: ');
					console.log(err);
				});
		}
	}

	function includeTrips(data) {
		let trps = [];
		for (let i = 0; i < data['own'].length; i++) {
			let trip = {
				id: data['own'][i].id,
				userId: trips[data['own'][i]].created_by,
				title: trips[data['own'][i]].title,
				description: trips[data['own'][i]].description,
				startDate: trips[data['own'][i]].start_date,
				endDate: trips[data['own'][i]].end_date,
				createdBy: trips[data['own'][i]].created_by,
				attendees: trips[data['own'][i]].members.length,
				capacity: trips[data['own'][i]].capacity,
				activities: trips[data['own'][i]].activities,
			};
			trps.push(trip);
		}
		for (let i = 0; i < data['joined'].length; i++) {
			let trip = {
				id: data['joined'][i].id,
				userId: trips[data['joined'][i]].created_by,
				title: trips[data['joined'][i]].title,
				description: trips[data['joined'][i]].description,
				startDate: trips[data['joined'][i]].start_date,
				endDate: trips[data['joined'][i]].end_date,
				createdBy: trips[data['joined'][i]].created_by,
				attendees: trips[data['joined'][i]].members.length,
				capacity: trips[data['joined'][i]].capacity,
				activities: trips[data['joined'][i]].activities,
			};
			trps.push(trip);
		}
		setTripList(trps);
	}

	function includeActivities(data) {
		let acts = [];
		for (let i = 0; i < data.length; i++) {
			let activity = {
				ref: i,
				id: data[i].id,
				userId: data[i].created_by,
				title: data[i].title,
				description: data[i].description,
				location: data[i].location,
				dateTime: data[i].date_created,
				createdBy: data[i].created_by,
				attendees: data[i].attendees.length,
				capacity: data[i].capacity,
			};
			acts.push(activity);
		}
		setActivityList(acts);
	}

	function includeBuddies(data) {
		let buddies = [];
		for (let i = 0; i < data.length; i++) {
			let buddy = {
				ref: i,
				id: data[i],
				name: users[data[i]].first_name + ' ' + users[data[i]].last_name,
				profilePic: users[data[i]].profile_pic,
			};
			buddies.push(buddy);
		}
		setBuddyList(buddies);
	}

	async function blockUser() {
		await API.graphql(graphqlOperation(customBlockUser, { blockerID: currentUser.id, blockedUserID: route.params['other_user_id'] })).then(
			(res) => {
				currentUser.blockedUsers[route.params['other_user_id']] = { id: res.data.createBlock.id };
				dispatch(updateUser(currentUser));
			}
		);
	}

	async function unblockUser() {
		let blockID = currentUser.blockedUsers[route.params['other_user_id']].id;
		await API.graphql(graphqlOperation(customUnblockUser, { id: blockID })).then(() => {
			delete currentUser.blockedUsers[route.params['other_user_id']];
			dispatch(updateUser(currentUser));
		});
	}

	function renderSchedule() {
		let items = activityList.concat(tripList);
		let newSchedule = [];

		if (items.length === 0 || currentUser.blockedByUsers[route.params.other_user_id]) {
			return <ContentPlaceholder iconName={'world'} text={"There's nothing here."} />;
		}

		for (let i = 0; i < items.length; i++) {
			items[i].startDate !== undefined
				? newSchedule.push(
						<Trip
							key={i}
							userId={items[i].userId}
							title={items[i].title}
							description={items[i].description}
							startDate={items[i].startDate}
							endDate={items[i].endDate}
							members={items[i].attendees}
							capacity={items[i].capacity}
							activities={items[i].activities}
							createdBy={items[i].createdBy}
							onPress={() => {
								currentUser['trips']['joined'].includes(parseInt(items[i].id)) ||
								currentUser['trips']['own'].includes(parseInt(items[i].id))
									? navigation.navigate('TripPage', {
											tripId: items[i].id,
											navigateTo: 'NotMyProfile',
									  })
									: navigation.navigate('TripDetail', {
											tripId: items[i].id,
											navigateTo: 'NotMyProfile',
									  });
							}}
							onPressDetails={() => {
								currentUser['trips']['joined'].includes(parseInt(items[i].id)) ||
								currentUser['trips']['own'].includes(parseInt(items[i].id))
									? navigation.navigate('TripPage', {
											tripId: items[i].id,
											navigateTo: 'NotMyProfile',
									  })
									: navigation.navigate('TripDetail', {
											tripId: items[i].id,
											navigateTo: 'NotMyProfile',
									  });
							}}
						/>
				  )
				: newSchedule.push(
						<Activity
							key={i}
							userId={items[i].userId}
							title={items[i].title}
							description={items[i].description}
							location={items[i].location.address_str}
							dateTime={items[i].dateTime}
							attendees={items[i].attendees}
							capacity={items[i].capacity}
							createdBy={items[i].createdBy}
							onPress={() => {
								currentUser['activities']['joined'].includes(parseInt(items[i].id)) ||
								currentUser['activities']['own'].includes(parseInt(items[i].id))
									? navigation.navigate('ActivityPage', {
											id: items[i].id,
											navigateTo: 'NotMyProfile',
									  })
									: (console.log('HERE WITH OBJECT', items[i]),
									  navigation.navigate('ActivityDetail', {
											id: items[i].id,
											navigateTo: 'NotMyProfile',
									  }));
							}}
							onPressDetails={() => {
								currentUser['activities']['joined'].includes(parseInt(items[i].id)) ||
								currentUser['activities']['own'].includes(parseInt(items[i].id))
									? navigation.navigate('ActivityPage', {
											id: items[i].id,
											navigateTo: 'back',
									  })
									: (console.log('HERE WITH ID', parseInt(items[i].id)),
									  navigation.navigate('ActivityDetail', {
											id: parseInt(items[i].id),
											navigateTo: 'back',
									  }));
							}}
						/>
				  );
		}

		return newSchedule;
	}

	function renderBuddies() {
		let newBuddies = [];

		if (buddyList.length === 0 || currentUser.blockedByUsers[route.params.other_user_id]) {
			return <ContentPlaceholder iconName={'world'} text={"There's nothing here."} />;
		}

		for (let i = 0; i < buddyList.length; i++) {
			newBuddies.push(<Buddy id={buddyList[i].id} key={buddyList[i].ref} name={buddyList[i].name} profilePic={buddyList[i].profilePic} />);
		}

		return newBuddies;
	}

	async function startConversation() {
		let box = [];
		const authUser = await Auth.currentAuthenticatedUser();

		if (currentUser.blockedByUsers[route.params.other_user_id]) {
			alert('You cannot send this user a message');
		} else {
			try {
				await API.graphql(graphqlOperation(getInbox, { id: authUser.username })).then((conversations) => {
					for (let i in conversations['data']['getUser']['chatRoomUser']['items']) {
						let conversation = conversations['data']['getUser']['chatRoomUser']['items'][i];
						let members = [];
						let title = '';
						let preview = conversation['chatRoom']['lastMessage']
							? conversation['chatRoom']['lastMessage']['content'].trim()
							: 'No messages';
						let lastMessageTime = conversation['chatRoom']['lastMessage'] ? conversation['chatRoom']['lastMessage']['createdAt'] : '';
						let date = moment(lastMessageTime).format('MM/DD/YYYY');
						let time = lastMessageTime != '' ? moment(lastMessageTime).format('hh:mm A') : '';
						let c = 0;
						let pfp = images.pfpTeal;

						for (let j in conversation['chatRoom']['chatRoomUsers']['items']) {
							let user = conversation['chatRoom']['chatRoomUsers']['items'][j];
							let upfp = images.pfpTeal;
							for (let u in users) {
								if (users[u]['id'] == user['user']['id'] && user['user']['id'] != authUser.username) {
									if (users[u]['profilePicURL'] != '') upfp = { uri: users[u]['profilePicURL'] };
								}
							}

							if (user['user'] == null) c == 0 ? (title = '(User Deleted)') : (title += ', (User Deleted)');
							else if (user['user']['id'] != authUser.username) {
								let userName = user['user']['name'];

								if (c == 0) {
									title += userName;
								} else if (c == conversation['chatRoom']['chatRoomUsers']['items'].length - 2) {
									title += ' & ' + userName;
								} else {
									title += ', ' + userName;
								}

								c++;
								members.push(user['user']['id']);
							}

							if (pfp == images.pfpTeal && upfp != images.pfpTeal) {
								pfp = upfp;
							}
						}

						if (title.length > 30) {
							title = title.substring(0, 30) + '...';
						}

						box.push({
							id: conversation['chatRoomID'],
							users: members,
							title: title,
							preview: preview,
							lastMessageTime: (new Date(Date.now()) - new Date(lastMessageTime)) / 3600000 / 24 > 1 ? date : time,
							pfp: pfp,
						});

						dispatch(storeInbox(box));
					}
				});
			} catch (e) {
				console.log(e);
			}

			//check if conversation between current user and other user exists already and if so redirect to that conversation instead of creating a new one
			for (let conversation in box) {
				let chatRoomUsersArr = box[conversation]['users'];
				let different = false;
				if (!chatRoomUsersArr || !chatRoomUsersArr.includes(route.params['other_user_id'])) {
					different = true;
				}
				if (!different && chatRoomUsersArr.length == 1) {
					let title = name;

					let cid = box[conversation].id;

					navigation.navigate('Conversation', { id: cid, title: title });

					return;
				}
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

					let title = name;
					const chatRoomUsersArr = [];
					const newUserChatRoom = await API.graphql(
						graphqlOperation(createChatRoomUser, {
							input: { userID: route.params['other_user_id'], chatRoomID: newChatRoomData.data.createChatRoom.id },
						})
					);

					chatRoomUsersArr.push(newUserChatRoom);

					const currentUserChatRoomUser = await API.graphql(
						graphqlOperation(createChatRoomUser, {
							input: { userID: authUser.attributes.sub, chatRoomID: newChatRoomData.data.createChatRoom.id },
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

	async function fetchPosts() {
		try {
			const userPostsQuery = await API.graphql(
				graphqlOperation(customListUserPosts, {
					eq: route.params['other_user_id'],
				})
			);
			const getUserLikedPosts = await API.graphql(
				graphqlOperation(customGetUserLikes, {
					id: currentUser.id,
				})
			);
			const listPostsItems = userPostsQuery.data.listPosts.items;
			const getLikedPosts = getUserLikedPosts.data.getUser.likedPosts.items;
			const allFavedPosts = [];
			const localFavedPosts = [];

			for (let i = 0; i < getLikedPosts.length; i++) {
				const item = getLikedPosts[i];
				allFavedPosts.push(item.postID);
			}

			for (let j = 0; j < listPostsItems.length; j++) {
				const item = listPostsItems[j];
				if (allFavedPosts.includes(item.id)) {
					localFavedPosts.push(item.id);
				}
			}

			setPosts(userPostsQuery.data.listPosts.items);
			setFavedPosts(localFavedPosts);
		} catch (err) {
			console.log('Error @ ProfileScreen GetPosts: ');
			console.log(err);
		}
	}
	async function getBuddyData() {
		const customGetBuddiesQuery = await API.graphql(graphqlOperation(customGetBuddies, { id: currentUser.id }));
		const receivedRequests = customGetBuddiesQuery.data.getUser.receivedRequests.items;
		const sentRequests = customGetBuddiesQuery.data.getUser.requestedBuddies.items;

		// These two loops are for getting the IDs of actual buddies
		const buddyIDs = [];
		const unconfirmedRequestedBuddiesIDs = [];
		const unconfirmedReceivedBuddiesIDs = [];

		for (let i = 0; i < receivedRequests.length; i++) {
			const item = receivedRequests[i];
			if (item.status == 'accepted') {
				buddyIDs.push(item.requester.id);
			} else {
				unconfirmedReceivedBuddiesIDs.push(item.requester.id);
			}
			users[item.requester.id].relationshipID = item.id;
		}

		for (let i = 0; i < sentRequests.length; i++) {
			const item = sentRequests[i];
			if (item.status == 'accepted') {
				buddyIDs.push(item.requestee.id);
			} else {
				unconfirmedRequestedBuddiesIDs.push(item.requestee.id);
			}
			users[item.requestee.id].relationshipID = item.id;
		}
		let buddies = {
			buddies: buddyIDs,
			sentFriendRequestList: unconfirmedRequestedBuddiesIDs,
			receivedFriendRequestList: unconfirmedReceivedBuddiesIDs,
		};
		currentUser.buddies = buddies;
		dispatch(updateUser(currentUser));
		dispatch(storeUsers(users));
		return buddies;
	}

	async function addBuddy() {
		// let authUser = await Auth.currentAuthenticatedUser();
		let buddies = await getBuddyData();

		if (buddies.sentFriendRequestList.includes(route.params.other_user_id)) {
			alert('Buddy request was already sent!');
		} else if (buddies.receivedFriendRequestList.includes(route.params.other_user_id)) {
			console.log('accepted buddy request, despite not knowing it existed');
			await API.graphql(graphqlOperation(customAcceptBuddy, { id: users[route.params.other_user_id].relationshipID }));
			await API.graphql(
				graphqlOperation(customCreateNotification, {
					userID: route.params['other_user_id'],
					otherUserID: currentUser.id,
					content: 'accepted your tramigo request!',
				})
			);
			setFloatingBtnIcon('backpacker-check');
			alert('Buddy Added!');
		} else if (buddies.buddies.includes(route.params.other_user_id)) {
			alert('You are already Buddies!');
			setFloatingBtnIcon('backpacker-check');
		} else {
			await API.graphql(graphqlOperation(customCreateBuddy, { requesteeID: route.params['other_user_id'], requesterID: currentUser.id }));
			console.log('adding notif');
			let buddyRequestNotif = await API.graphql(
				graphqlOperation(customCheckIfBuddyNotificationExists, {
					userID: route.params['other_user_id'],
					otherUserID: currentUser.id,
				})
			);
			if (!(buddyRequestNotif.data.listNotifications.items.length > 0)) {
				await API.graphql(
					graphqlOperation(customCreateNotification, {
						userID: route.params['other_user_id'],
						otherUserID: currentUser.id,
						content: 'sent you a tramigo request!',
					})
				);
			}
			setFloatingBtnIcon('backpacker-paper-airplane');
			alert('Buddy request sent');
		}
	}

	async function removeBuddy() {
		// Delete buddy request and/or delete buddy
		await API.graphql(graphqlOperation(deleteBuddy, { input: { id: requestID } }));
		setFloatingBtnIcon('plus');
		setRemoveBuddyModalVisible(false);
		alert('Buddy removed');
	}

	async function deleteBuddyRequest() {
		let authUser = await Auth.currentAuthenticatedUser();
		let buddies = await getBuddyData();
		if (buddies.sentFriendRequestList.includes(route.params.other_user_id)) {
			// Check to see if the other user has a notification telling them they have a buddy request, and if so delete it
			let buddyRequestNotif = await API.graphql(
				graphqlOperation(customCheckIfBuddyNotificationExists, {
					userID: route.params['other_user_id'],
					otherUserID: authUser.username,
				})
			);
			if (buddyRequestNotif.data.listNotifications.items.length > 0) {
				await API.graphql(graphqlOperation(deleteNotification, { input: { id: buddyRequestNotif.data.listNotifications.items[0].id } }));
			}
			await API.graphql(graphqlOperation(deleteBuddy, { input: { id: users[route.params.other_user_id].relationshipID } }));

			setAcceptBuddyModalVisible(false);
			setFloatingBtnIcon('plus');
			alert('Buddy request removed');
		} else if (buddies.receivedFriendRequestList.includes(route.params.other_user_id)) {
			await API.graphql(graphqlOperation(deleteBuddy, { input: { id: users[route.params.other_user_id].relationshipID } }));
			setAcceptBuddyModalVisible(false);
			setFloatingBtnIcon('plus');
			alert('Buddy request removed');
		} else if (buddies.buddies.includes(route.params.other_user_id)) {
			setFloatingBtnIcon('backpacker-check');
			alert('They already accepted your request!');
		} else {
			alert('Request removed');
			setFloatingBtnIcon('plus');
			console.log('You shouldnt have been able to get here you wizard');
		}
	}

	async function acceptBuddyRequest() {
		let authUser = await Auth.currentAuthenticatedUser();
		await API.graphql(graphqlOperation(customAcceptBuddy, { id: requestID }));
		await API.graphql(
			graphqlOperation(customCreateNotification, {
				userID: route.params['other_user_id'],
				otherUserID: authUser.username,
				content: 'accepted your tramigo request!',
			})
		);
		setAcceptBuddyModalVisible(false);
		setFloatingBtnIcon('backpacker-check');
		alert('Buddy added!');
	}

	// If someone applies to join an activity/trip
	// Create request

	// delete request - anytime a user cancels their request or if the activity/trip owner denies their request or if the user leaves the activity

	// accept request - anytime a user accepts the request

	useLayoutEffect(() => {
		setContent(userInfo());
	}, [age, exp, level]);

	useFocusEffect(
		useCallback(() => {
			fetchProfileContent();
			fetchPosts();
		}, [])
	);

	return (
		<View style={styles.container}>
			<TopNavBar
				type={'back'}
				title={name}
				navigateTo={route.params.prevScreen}
				showOptionsButton={true}
				onPressOptions={() => setOptionsModalVisible(true)}
			/>

			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={styles.scroll}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				{/* Button that navigates to TravelMapScreen*/}
				<TouchableOpacity onPress={() => setMapExpanded(!mapExpanded)} style={styles.expandedMapBtn}>
					<Icon name={mapExpanded ? 'half-arrow-up' : 'half-arrow-down'} size={iconSize} color={iconColor} />
				</TouchableOpacity>

				{/* Links to the Travel Map page */}
				<ProfileMap mapValues={mapValues} height={mapExpanded ? screenHeight : screenHeight / 2.8} />

				{/* All info about the user as well as posts */}
				<View style={styles.contentContainer}>
					<View style={styles.buttonContainer}>
						{/* About Me Button */}
						<TouchableOpacity
							onPress={() => {
								setContent(userInfo);
								setToggle([true, false, false, false]);
							}}
							style={toggle[0] ? styles.selectedButton : styles.button}
						>
							<Icon name={'backpacker'} size={iconSize + 5} color={iconColor} style={styles.icon} />
						</TouchableOpacity>

						{/* My Posts Button */}
						<TouchableOpacity
							onPress={() => {
								setContent(userPosts);
								setToggle([false, true, false, false]);
							}}
							style={toggle[1] ? styles.selectedButton : styles.button}
						>
							<Icon name={'camera'} size={iconSize + 5} color={iconColor} style={styles.icon} />
						</TouchableOpacity>

						{/* Profile Pic and Badges Button */}
						<View style={styles.pfpContainer}>
							<TouchableOpacity onPress={() => setPfpModalVisible(true)} style={styles.pfpTouch}>
								<Image style={styles.pfp} source={profilePic} />
							</TouchableOpacity>

							{/* <TouchableOpacity style={styles.badgeContainer} onPress={() => setModalVisible(true)}>
								<View style={styles.badge} >
									<Icon name={'compass'} size={iconSize} color={iconColor} />
								</View>
							</TouchableOpacity> */}
						</View>

						{/* My Schedule Button */}
						<TouchableOpacity
							onPress={() => {
								setContent(schedule);
								setToggle([false, false, true, false]);
							}}
							style={toggle[2] ? styles.selectedButton : styles.button}
						>
							<Icon name={'calendar'} size={30} color={iconColor} style={styles.icon} />
						</TouchableOpacity>

						{/* Message Button */}
						<TouchableOpacity onPress={() => startConversation()} style={toggle[3] ? styles.selectedButton : styles.button}>
							<Icon
								name={'paper-airplane'}
								size={iconSize}
								color={iconColor}
								style={(styles.icon, { paddingTop: 5, paddingRight: 2 })}
							/>
						</TouchableOpacity>
					</View>
					{content}
				</View>

				{/* Spacer */}
				<View
					style={{
						width: '100%',
						padding: 40,
						backgroundColor: theme.colors.background,
					}}
				/>
			</ScrollView>

			{!mapExpanded && !currentUser.blockedByUsers[route.params.other_user_id] && (
				<FloatingButton
					color={theme.colors.accent1}
					iconName={floatingBtnIcon}
					size={32}
					iconColor={theme.colors.white}
					onPress={() => {
						// if users are friends, button is backpacker check
						// if user -> otheruser, button is paper airplane
						// if otheruser -> user, button is backpacker plus
						// if neither, button is plus
						if (floatingBtnIcon == 'backpacker-check') {
							setRemoveBuddyModalVisible(true);
						} else if (floatingBtnIcon == 'backpacker-paper-airplane') {
							deleteBuddyRequest();
						} else if (floatingBtnIcon == 'backpacker-plus') {
							setAcceptBuddyModalVisible(true);
						} else {
							addBuddy();
						}
					}}
				/>
			)}

			{/* Modals */}
			<BadgesModal
				visible={modalVisible}
				onPressX={() => setModalVisible(false)}
				onRequestClose={() => setModalVisible(false)}
				badgesData={badges}
			/>

			<RemoveBuddyModal
				animationType={'slide'}
				transparent={true}
				name={name}
				visible={removeBuddyModalVisible}
				onRequestClose={() => setRemoveBuddyModalVisible(false)}
				onPressRemove={() => removeBuddy()}
				onPressCancel={() => setRemoveBuddyModalVisible(false)}
			/>

			<AcceptBuddyModal
				animationType={'slide'}
				transparent={true}
				name={name}
				visible={acceptBuddyModalVisible}
				onRequestClose={() => setAcceptBuddyModalVisible(false)}
				onPressRemove={() => deleteBuddyRequest()}
				onPressCancel={() => setAcceptBuddyModalVisible(false)}
				onPressAccept={() => acceptBuddyRequest()}
			/>

			<ProfilePicModal
				visible={pfpModalVisible}
				onPress={() => setPfpModalVisible(false)}
				onRequestClose={() => setPfpModalVisible(false)}
				profilePic={profilePic}
			/>

			<NotMyProfileOptionsModal
				visible={optionsModalVisible}
				onRequestClose={() => setOptionsModalVisible(false)}
				onPressBlock={() => {
					setOptionsModalVisible(false);
					blockUser();
				}}
				onPressUnblock={() => {
					setOptionsModalVisible(false);
					unblockUser();
				}}
				blocked={currentUser.blockedUsers[route.params['other_user_id']]}
			/>

			<BottomNavBar />
		</View>
	);
}

function useTheme(theme) {
	const styles = StyleSheet.create({
		badge: {
			width: 35,
			height: 35,
			borderRadius: 999,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: theme.colors.accent1,
		},
		badgeContainer: {
			zIndex: 999,
			right: 35,
			top: 42,
			width: 35,
			height: 35,
			borderRadius: 999,
		},
		button: {
			width: 45,
			height: 45,
			backgroundColor: theme.colors.primary_light,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 100,
			shadowRadius: 1,
			shadowOffset: { width: 0, height: 1 },
			shadowColor: theme.colors.black,
			shadowOpacity: 0.7,
			marginHorizontal: 5,
		},
		buttonContainer: {
			width: '100%',
			height: 80,
			marginBottom: 15,
			flexDirection: 'row',
			justifyContent: 'space-evenly',
			backgroundColor: theme.colors.background,
			borderColor: theme.colors.primary,
			borderTopWidth: 7,
			alignItems: 'center',
		},
		buttonLabel: {
			fontSize: 17,
			color: theme.colors.white,
			fontWeight: 'bold',
		},
		container: {
			flex: 1,
			flexDirection: 'column',
			backgroundColor: theme.colors.background,
		},
		contentContainer: {
			flex: 1,
			zIndex: 1,
			width: '100%',
			height: '100%',
			alignItems: 'center',
			backgroundColor: theme.colors.background,
		},
		expandedMapBtn: {
			position: 'absolute',
			zIndex: 999,
			top: 15,
			right: 15,
		},
		pfp: {
			width: 120,
			height: 120,
			borderRadius: 100,
			borderColor: theme.colors.primary,
			borderWidth: 7,
			backgroundColor: theme.colors.primary_light,
		},
		pfpContainer: {
			zIndex: 4,
			paddingBottom: 70,
			width: 120,
			height: 1,
			marginHorizontal: 5,
			alignItems: 'center',
			flexDirection: 'row',
			shadowRadius: 5,
			shadowOffset: { width: 0, height: 4 },
			shadowColor: theme.colors.black,
			shadowOpacity: 0.5,
		},
		pfpTouch: {
			borderRadius: 999,
		},
		scroll: {
			zIndex: 0,
			justifyContent: 'flex-start',
			alignItems: 'center',
			backgroundColor: theme.colors.background,
		},
		selectedButton: {
			width: 45,
			height: 45,
			backgroundColor: theme.colors.accent1,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 100,
			shadowRadius: 1,
			shadowOffset: { width: 0, height: 1 },
			shadowColor: theme.colors.black,
			shadowOpacity: 0.7,
			marginHorizontal: 5,
		},
	});

	return styles;
}

export default NotMyProfileScreen;
