import { API, Auth, graphqlOperation } from 'aws-amplify';
import { getChatRoom, getUser } from '../../../src/graphql/queries';
import {
	customGetBuddies,
	customListUser,
	customListNotifications,
	customGetUser,
} from '../../../src/graphql/customQueries';
import moment from 'moment';

export default async function getState(user) {
	// Grab the current user
	const currentUserQuery = await API.graphql(graphqlOperation(customGetUser, { id: user.attributes.sub }));
	const blockedUsersQuery = currentUserQuery.data.getUser.blockedUsers.items;
	console.log('blockedUsersQuery', blockedUsersQuery);
	let blockedUsers = {};
	for (let i in blockedUsersQuery) {
		console.log('i', i);
		blockedUsers[blockedUsersQuery[i].blockedUserID] = blockedUsersQuery[i];
	}
	const blockedByUsersQuery = currentUserQuery.data.getUser.blockedByUsers.items;
	let blockedByUsers = {};
	for (let i in blockedByUsersQuery) {
		blockedByUsers[blockedByUsersQuery[i].blockerID] = blockedByUsersQuery[i];
	}
	console.log('blockedUsers', blockedUsers);
	console.log('blockedByUsers', blockedByUsers);
	const currentUser = currentUserQuery.data.getUser;

	// -------------------------
	//    Get Users Buddy Data
	// -------------------------

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
	}

	for (let i = 0; i < sentRequests.length; i++) {
		const item = sentRequests[i];
		if (item.status == 'accepted') {
			buddyIDs.push(item.requestee.id);
		} else {
			unconfirmedRequestedBuddiesIDs.push(item.requestee.id);
		}
	}

	// This transforms the queries in a way that redux can read them
	const transformUser = {
		id: currentUser.id,
		firstName: currentUser.firstname,
		lastName: currentUser.lastName,
		lastUpdate: currentUser.updatedAt,
		birthday: currentUser.birthday,
		profilePic: currentUser.profilePic,
		buddies: {
			sentFriendRequestList: unconfirmedRequestedBuddiesIDs,
			receivedFriendRequestList: unconfirmedReceivedBuddiesIDs,
			buddies: buddyIDs,
		},
		blockedUsers: blockedUsers,
		blockedByUsers: blockedByUsers,
		// stories, // Currently unused
		settings: currentUser.settings ? currentUser.settings : [1, 2, 2, 2, 0, 0], // [1, 2, 2, 2, 0, 0], // Default settings
	};
	const chatRoomUsers = currentUser.chatRoomUser.items;
	const chatRoomsObj = {};

	for (let i = 0; i < chatRoomUsers.length; i++) {
		const chatRoomsQuery = await API.graphql(
			graphqlOperation(getChatRoom, {
				id: chatRoomUsers[i].chatRoomID,
			})
		);
		chatRoomsObj[chatRoomsQuery.data.getChatRoom.id] = chatRoomsQuery.data.getChatRoom;
	}

	// Other Users
	let userList = await API.graphql(graphqlOperation(customListUser));
	userList = userList.data.listUsers.items;
	const usersObject = {};
	for (let i = 0; i < userList.length; i++) {
		usersObject[userList[i].id] = userList[i];
	}

	// Meet
	const allBuddies = [...buddyIDs, ...unconfirmedRequestedBuddiesIDs, ...unconfirmedReceivedBuddiesIDs];
	const copyUsers = { ...usersObject };

	for (let i = 0; i < allBuddies.length; i++) {
		const item = allBuddies[i];
		delete copyUsers[item];
	}

	for (let i = 0; i < receivedRequests.length; i++) {
		usersObject[receivedRequests[i].requester.id].relationshipId = receivedRequests[i].id;
	}
	for (let i = 0; i < sentRequests.length; i++) {
		usersObject[sentRequests[i].requestee.id].relationshipId = sentRequests[i].id;
	}

	// Notifications
	const notifications = await API.graphql(graphqlOperation(customListNotifications, { userID: currentUser.id }));
	return {
		currentUser: transformUser,
		inbox: chatRoomsObj,
		users: usersObject,
		meet: Object.keys(copyUsers),
		notifications: notifications.data.listNotifications.items,
	};
}
