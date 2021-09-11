import React, { useState, useCallback, useEffect } from 'react';
import { KeyboardAvoidingView, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { RNS3 } from 'react-native-aws3';
import { createMessage, updateChatRoom } from '../../../../../src/graphql/mutations';
import { messagesByChatRoom } from '../../../../../src/graphql/queries';
import { onCreateMessage } from '../../../../../src/graphql/subscriptions';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import TopNavBar from '../../../components/general/TopNavBar';
import MessageEditor from '../../../components/dms/MessageEditor';
import Message from '../../../components/dms/Message';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function ConversationScreen(props) {
	const route = useRoute();

	// Redux
	const currentUser = useSelector((state) => state.currentUser);
	let inbox;
	if (useSelector((state) => state.inbox[route.params.id])) {
		inbox = Object.assign(useSelector((state) => state.inbox[route.params.id]));
	}

	// Theme
	const theme = currentUser.theme;
	const styles = useTheme(theme);

	// State
	const [messages, setMessages] = useState([]);
	const [currentUserId, setCurrentUserId] = useState(null);
	const [imageVideo, setImageVideo] = useState(null);
	const [currentMessage, setCurrentMessage] = useState('');
	const [chatBuddies, setChatBuddies] = useState({});
	const [name] = useState(currentUser.fname + ' ' + currentUser.lname);

	const renderMessages = ({ item }) => (
		<Message
			key={item.id}
			id={item.id}
			senderId={item.senderId}
			content={item.content}
			dateTime={item.createdAt}
			align={item.align}
			activityID={item.activityID}
			tripID={item.tripID}
		/>
	);

	async function includeNewData(newMessage) {
		if (!currentUser.blockedByUsers[newMessage.user.id] & !currentUser.blockedUsers[newMessage.user.id]) {
			let messymess = Object.assign(messages);
			let msg = {
				id: newMessage.id,
				content: newMessage.content,
				senderId: newMessage.user.id,
				align: newMessage.user.id == currentUserId ? 'right' : 'left',
				createdAt: newMessage.createdAt,
				activityID: newMessage.activityID,
				tripID: newMessage.tripID,
			};
			messymess.push(msg);
			setMessages(messymess.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
		}
	}

	const photoOptions = {
		bucket: 'image-uploader-streetsmart1',
		region: 'us-east-2',
		accessKey: 'AKIAWB534HWTBRB2RR4J',
		secretKey: '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',
		successActionStatus: 201,
	};

	const videoOptions = {
		bucket: 'video-uploader-streetsmart1',
		region: 'us-east-1',
		accessKey: 'AKIAWB534HWTBRB2RR4J',
		secretKey: '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',
		successActionStatus: 201,
	};

	// Get the conversation previews out of the result of get request
	async function includeData(messages) {
		let msgs = [];
		const othersObj = {};
		for (let i = 0; i < messages.length; i++) {
			if (!currentUser.blockedByUsers[messages[i].userID] & !currentUser.blockedUsers[messages[i].userID]) {
				let alignment = 'right';

				const user = await Auth.currentAuthenticatedUser();

				if (messages[i].userID !== user.username) {
					if (messages[i].align == 'right') {
						alignment = 'right';
					} else {
						alignment = 'left';
					}
				}

				if (!othersObj[messages[i].id] && messages[i]['user']) {
					othersObj[messages[i].id] = messages[i]['user'].name;
				}
				let msg = {
					id: messages[i].id,
					content: messages[i]['content'],
					senderId: messages[i]['user'] ? messages[i]['user']['id'] : chatBuddies[messages[i].id],
					align: alignment,
					createdAt: messages[i]['createdAt'],
					activityID: messages[i]['activityID'],
					tripID: messages[i]['tripID'],
				};
				msgs.push(msg);
			}
		}
		setMessages(msgs.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
		setChatBuddies(othersObj);
	}

	// Allows users to view photos in roll
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
		});

		// the split turns the url into an array, and then the split - 1 grabs the last element
		const uriArr = result.uri.split('.');
		const last = uriArr.length - 1;
		if (!result.cancelled) {
			let newImageVideo;
			if (uriArr[last] === 'mp4' || uriArr[last] === 'mov') {
				newImageVideo = result.uri;
				setImageVideo(result.uri);
			} else {
				const manipResult = await ImageManipulator.manipulateAsync(result.uri, [{ resize: { height: 500 } }]);
				newImageVideo = manipResult.uri;
				setImageVideo(manipResult.uri);
			}
			sendPhotoVideo(newImageVideo);
		}
	};

	// Send request to get conversation
	async function fetchMessages() {
		const messagesData = await API.graphql(
			graphqlOperation(messagesByChatRoom, {
				chatRoomID: route.params.id,
				sortDirection: 'DESC',
			})
		);

		includeData(messagesData.data.messagesByChatRoom.items);
	}

	async function sendPhotoVideo(imageVideo) {
		if (imageVideo) {
			let fileName;
			let options;
			let fileType;

			// the split turns the url into an array, and then the split - 1 grabs the last element
			const splitImageVideo = imageVideo.split('.');
			const last = splitImageVideo.length - 1;
			if (splitImageVideo[last] === 'mp4' || splitImageVideo[last] === 'mov') {
				splitImageVideo.pop();
				splitImageVideo.push('mp4');
				fileName = splitImageVideo.join('.');
				// fileName = imageVideo.replace(/\W/g, '') + '.mp4';
				options = videoOptions;
				fileType = 'video/mp4';
			} else {
				splitImageVideo.pop();
				splitImageVideo.push('jpg');
				fileName = splitImageVideo.join('.');
				// fileName = imageVideo.replace(/\W/g, '') + '.jpg';
				options = photoOptions;
				fileType = 'image/jpg';
			}

			const file = {
				uri: imageVideo,
				name: fileName,
				type: fileType,
			};

			let imageLocationAWS;
			const s3Response = await RNS3.put(file, options);
			if (s3Response.status !== 201) {
				setPosted(false);
				throw new Error('Failed to upload image to S3');
			}

			imageLocationAWS = s3Response.body.postResponse.location;
			const newMessageData = await API.graphql(
				graphqlOperation(createMessage, {
					input: {
						content: imageLocationAWS,
						userID: currentUserId,
						chatRoomID: route.params.id,
					},
				})
			);

			const messageContentID = newMessageData.data.createMessage.id;
			await API.graphql(
				graphqlOperation(updateChatRoom, {
					input: {
						id: route.params.id,
						lastMessageID: messageContentID,
					},
				})
			);
		}

		setImageVideo(null);
	}

	async function sendChat() {
		try {
			const newMessageData = await API.graphql(
				graphqlOperation(createMessage, {
					input: {
						content: currentMessage,
						userID: currentUserId,
						chatRoomID: route.params.id,
					},
				})
			);

			const messageContentID = newMessageData.data.createMessage.id;
			await API.graphql(
				graphqlOperation(updateChatRoom, {
					input: {
						id: route.params.id,
						lastMessageID: messageContentID,
					},
				})
			);

			setCurrentMessage('');
		} catch (e) {
			console.log('Error in sendChat:', e);
		}
	}

	useFocusEffect(
		useCallback(() => {
			const fetchUser = async () => {
				await Auth.currentAuthenticatedUser()
					.then((userInfo) => setCurrentUserId(userInfo.attributes.sub))
					.then(() => fetchMessages());
			};
			fetchUser();
		}, [])
	);

	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert('Sorry, we need camera roll permissions to make this work!');
				}
			}
		})();
	}, []);

	useEffect(() => {
		const subscription = API.graphql(graphqlOperation(onCreateMessage)).subscribe({
			next: (data) => {
				const newMessage = data.value.data.onCreateMessage;
				if (newMessage.chatRoomID !== route.params.id) {
					// newMessage is literally EVERY new message
					// the user should not get every single message ever
					// only the messages for the room they are in
					return;
				}
				includeNewData(newMessage);
			},
		});

		return () => subscription.unsubscribe();
	});

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
			<TopNavBar title={route.params.title} type={'back'} navigateTo={'Inbox'} />
			<FlatList
				data={messages}
				renderItem={renderMessages}
				inverted={true}
				keyExtractor={(message) => message.id.toString()}
				contentContainerStyle={styles.scroll}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			/>
			<MessageEditor
				onChangeText={(message) => setCurrentMessage(message)}
				onSend={() => sendChat()}
				value={currentMessage}
				pickImage={pickImage}
			/>
		</KeyboardAvoidingView>
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
			width: screenWidth,
			justifyContent: 'flex-end',
			alignItems: 'flex-end',
			backgroundColor: theme.colors.background,
			paddingVertical: 10,
		},
	});

	return styles;
}

export default ConversationScreen;
