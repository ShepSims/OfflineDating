/* eslint-disable */

export const customGetUser = /* GraphQL */ `
	query customGetUser($id: ID!) {
		getUser(id: $id) {
			id
			name
			lastName
			bio
			email
			status
			profilePicURL
			birthday
			country
			places
			school
			work
			settings
			level
			exp
			credibility
			createdPosts(filter: { archived: { eq: false } }) {
				items {
					id
					content
					source
					archived
					views
					userID
					locationID
					activityID
					tripID
					createdAt
					updatedAt
					showOnNewsfeed
				}
				nextToken
			}
			createdFeedback {
				items {
					id
					title
					feedbackType
					content
					rating
					userID
					createdAt
					updatedAt
				}
				nextToken
			}
			createdStories(filter: { archived: { eq: false } }) {
				items {
					id
					source
					archived
					views
					userID
					locationID
					activityID
					tripID
					createdAt
					updatedAt
				}
				nextToken
			}
			ownedLocations {
				items {
					id
					googlePlaceID
					name
					country
					state
					county
					city
					neighborhood
					street
					streetNumber
					photo
					lat
					lon
					ownedBy
					firstTouchedBy
					createdAt
					updatedAt
				}
				nextToken
			}
			createdTrips(filter: { archived: { eq: false } }) {
				items {
					id
					name
					coverPhoto
					views
					description
					timeOfEvent
					privacy
					capacity
					archived
					category
					endDate
					startDate
					cost
					userID
					createdAt
					updatedAt
				}
				nextToken
			}
			createdActivities(filter: { archived: { eq: false } }) {
				items {
					id
					name
					coverPhoto
					views
					description
					timeOfEvent
					privacy
					capacity
					archived
					category
					userID
					locationID
					tripID
					createdAt
					updatedAt
				}
				nextToken
			}
			writtenComments {
				items {
					id
					content
					userID
					postID
					createdAt
					updatedAt
				}
				nextToken
			}
			chatRoomUser {
				items {
					id
					userID
					chatRoomID
					createdAt
					updatedAt
				}
				nextToken
			}
			notifications {
				items {
					id
					content
					activityID
					tripID
					userID
					postID
					checkinID
					otherUserID
					seen
					clicked
					createdAt
					updatedAt
				}
				nextToken
			}
			requestedBuddies {
				items {
					id
					requesterID
					requesteeID
					status
					createdAt
					updatedAt
				}
				nextToken
			}
			receivedRequests {
				items {
					id
					requesterID
					requesteeID
					status
					createdAt
					updatedAt
				}
				nextToken
			}
			blockedUsers {
				items {
					id
					blockerID
					blockedUserID
					createdAt
					updatedAt
				}
				nextToken
			}
			blockedByUsers {
				items {
					id
					blockerID
					blockedUserID
					createdAt
					updatedAt
				}
				nextToken
			}
			likedPosts {
				items {
					id
					postID
					postLikerID
					createdAt
					updatedAt
				}
				nextToken
			}
			likedActivities {
				items {
					id
					activityID
					activityLikerID
					createdAt
					updatedAt
				}
				nextToken
			}
			joinedActivities {
				items {
					status
					notifications
					id
					activityID
					userID
					createdAt
					updatedAt
				}
				nextToken
			}
			joinedTrips {
				items {
					status
					notifications
					id
					tripID
					userID
					createdAt
					updatedAt
				}
				nextToken
			}
			checkedInLocations {
				items {
					id
					locationID
					activityID
					tripID
					userID
					checkinTime
					text
					source
					showOnNewsfeed
					anticipatedTime
					complete
					createdAt
					updatedAt
				}
				nextToken
			}
			createdAt
			updatedAt
		}
	}
`;

export const getOtherUser = /* GraphQL */ `
	query getOtherUser($id: ID!) {
		getUser(id: $id) {
			bio
			birthday
			country
			exp
			id
			credibility
			createdAt
			lastName
			level
			name
			places
			profilePicURL
			school
			settings
			status
			work
			receivedRequests {
				items {
					id
					requesterID
					status
				}
			}
			requestedBuddies {
				items {
					id
					requesteeID
					status
				}
			}
		}
	}
`;

export const customGetBuddies = /* GraphQL */ `
	query customGetBuddies($id: ID!) {
		getUser(id: $id) {
			receivedRequests {
				items {
					requester {
						name
						lastName
						id
						profilePicURL
					}
					status
					id
				}
			}
			requestedBuddies {
				items {
					requestee {
						name
						lastName
						id
						profilePicURL
					}
					status
					id
				}
			}
		}
	}
`;

export const customGetBuddiesRequests = /* GraphQL */ `
	query customGetBuddiesRequests($id: ID!) {
		getUser(id: $id) {
			receivedRequests(filter: { status: { eq: "pending" } }) {
				items {
					requester {
						name
						lastName
						id
						profilePicURL
					}
					status
					id
				}
			}
		}
	}
`;

export const customCreateBuddy = /* GraphQL */ `
	mutation customCreateBuddy($requesteeID: ID!, $requesterID: ID!) {
		createBuddy(input: { requesteeID: $requesteeID, requesterID: $requesterID, status: "pending" }) {
			id
		}
	}
`;

export const customAcceptBuddy = /* GraphQL */ `
	mutation customAcceptBuddy($id: ID!) {
		updateBuddy(input: { id: $id, status: "accepted" }) {
			updatedAt
		}
	}
`;

export const customBlockUser = /* GraphQL */ `
	mutation customBlockUser($blockerID: ID!, $blockedUserID: ID!) {
		createBlock(input: { blockerID: $blockerID, blockedUserID: $blockedUserID }) {
			id
		}
	}
`;

export const customUnblockUser = /* GraphQL */ `
	mutation customUnblockUser($id: ID!) {
		deleteBlock(input: { id: $id }) {
			id
		}
	}
`;

export const customCreateNotification = /* GraphQL */ `
	mutation customCreateNotification($userID: ID!, $otherUserID: ID!, $content: String!, $activityID: ID, $tripID: ID, $postID: ID) {
		createNotification(
			input: { userID: $userID, otherUserID: $otherUserID, content: $content, activityID: $activityID, tripID: $tripID, postID: $postID }
		) {
			id
		}
	}
`;

export const customListNotifications = /* GraphQL */ `
	query customListNotifications($userID: ID!) {
		listNotifications(filter: { userID: { eq: $userID } }) {
			items {
				id
				createdAt
				content
				seen
				clicked
				otherUser {
					lastName
					name
					id
				}
				activityID
				tripID
				postID
			}
		}
	}
`;

export const customCheckIfBuddyNotificationExists = /* GraphQL */ `
	query customCheckIfBuddyNotificationExists($userID: ID!, $otherUserID: ID!) {
		listNotifications(
			filter: { userID: { eq: $userID }, and: { otherUserID: { eq: $otherUserID }, and: { content: { eq: "sent you a tramigo request!" } } } }
		) {
			nextToken
			items {
				id
				seen
			}
		}
	}
`;

export const customCheckIfSentBuddyRequestExists = /* GraphQL */ `
	query customCheckIfBuddyRequestExists($userID: ID!, $otherUserID: ID!) {
		listNotifications(filter: { userID: { eq: $userID }, and: { otherUserID: { eq: $otherUserID } } }) {
			nextToken
			items {
				id
				status
			}
		}
	}
`;

export const customCheckIfReceivedBuddyRequestExists = /* GraphQL */ `
	query customCheckIfBuddyRequestExists($userID: ID!, $otherUserID: ID!) {
		listNotifications(filter: { userID: { eq: $userID }, and: { otherUserID: { eq: $otherUserID } } }) {
			nextToken
			items {
				id
				status
			}
		}
	}
`;

export const getChatRoomUsers = /* GraphQL */ `
	query getChatRoomUsers($id: ID!) {
		getUser(id: $id) {
			chatRoomUser {
				items {
					chatRoom {
						id
						chatRoomUsers {
							items {
								user {
									name
									lastName
									profilePicURL
								}
							}
						}
					}
				}
			}
		}
	}
`;

export const getInbox = /* GraphQL */ `
	query getInbox($id: ID!) {
		getUser(id: $id) {
			chatRoomUser {
				items {
					chatRoomID
					chatRoom {
						chatRoomUsers {
							items {
								user {
									name
									lastName
									id
								}
							}
						}
						lastMessage {
							content
							createdAt
							activityID
							tripID
						}
					}
				}
			}
		}
	}
`;

export const setRegistrationInfo = /* GraphQL */ `
	mutation setRegistrationInfo(
		$id: ID!
		$bio: String
		$birthday: String
		$country: String
		$places: [Int]
		$profilePicURL: String
		$school: String
		$work: String
	) {
		updateUser(
			input: {
				id: $id
				birthday: $birthday
				bio: $bio
				country: $country
				places: $places
				profilePicURL: $profilePicURL
				school: $school
				work: $work
				exp: 0
				level: 1
			}
		) {
			id
		}
	}
`;

export const customCreatePost = /* GraphQL */ `
	mutation customCreatePost(
		$content: String!
		$userID: ID!
		$source: String
		$locationID: ID
		$activityID: ID
		$tripID: ID
		$showOnNewsfeed: Boolean
	) {
		createPost(
			input: {
				userID: $userID
				content: $content
				archived: false
				source: $source
				locationID: $locationID
				views: 0
				activityID: $activityID
				tripID: $tripID
				showOnNewsfeed: $showOnNewsfeed
			}
		) {
			content
			createdAt
			id
			source
			archived
			locationID
			tripID
			updatedAt
			activityID
		}
	}
`;

export const customUpdatePost = /* GraphQL */ `
	mutation customUpdatePost(
		$id: ID!
		$activityID: ID
		$content: String
		$locationID: ID
		$source: String
		$tripID: ID
		$userID: ID
		$views: Int
		$archived: Boolean = false
	) {
		updatePost(
			input: {
				id: $id
				activityID: $activityID
				content: $content
				locationID: $locationID
				source: $source
				tripID: $tripID
				userID: $userID
				views: $views
				archived: $archived
			}
		) {
			activityID
			archived
			content
			createdAt
			id
			locationID
			source
			tripID
			updatedAt
			userID
			views
		}
	}
`;

export const customListPost = /* GraphQL */ `
	query customListPost {
		listPosts(filter: { archived: { eq: false } }) {
			items {
				content
				createdAt
				id
				source
				userID
				user {
					profilePicURL
					name
					lastName
					credibility
				}
				locationID
				updatedAt
				archived
				views
				activityID
				tripID
				showOnNewsfeed
				comments {
					items {
						id
						content
						createdAt
						updatedAt
						userID
					}
				}
			}
		}
	}
`;

export const customListUserPosts = /* GraphQL */ `
	query customListUserPosts($eq: ID!) {
		listPosts(filter: { userID: { eq: $eq } }) {
			items {
				content
				createdAt
				id
				source
				userID
				user {
					profilePicURL
					name
					lastName
					credibility
				}
				locationID
				updatedAt
				archived
				views
				showOnNewsfeed
				comments {
					items {
						id
						content
						createdAt
						updatedAt
						userID
					}
				}
				activityID
				tripID
			}
		}
	}
`;

export const customListUser = /* GraphQL */ `
	query customListUser {
		listUsers {
			items {
				name
				lastName
				id
				profilePicURL
				country
			}
		}
	}
`;

export const customUpdateUser = /* GraphQL */ `
	mutation customUpdateUser(
		$id: ID!
		$work: String
		$profilePicURL: String
		$places: [Int]
		$country: String
		$bio: String
		$birthday: String
		$school: String
	) {
		updateUser(
			input: {
				id: $id
				country: $country
				bio: $bio
				places: $places
				profilePicURL: $profilePicURL
				school: $school
				work: $work
				birthday: $birthday
			}
		) {
			id
		}
	}
`;

export const customCreateActivity = /* GraphQL */ `
	mutation customCreateActivity(
		$coverPhoto: String = ""
		$category: String = ""
		$capacity: Int!
		$description: String!
		$locationID: ID!
		$name: String!
		$privacy: Int!
		$timeOfEvent: String!
		$userID: ID!
		$views: Int!
	) {
		createActivity(
			input: {
				locationID: $locationID
				name: $name
				userID: $userID
				description: $description
				archived: false
				capacity: $capacity
				category: $category
				coverPhoto: $coverPhoto
				privacy: $privacy
				timeOfEvent: $timeOfEvent
				views: $views
			}
		) {
			id
			archived
			capacity
			category
			coverPhoto
			createdAt
			description
			locationID
			name
			privacy
			timeOfEvent
			updatedAt
			userID
			views
		}
	}
`;

export const customGetActivity = /* GraphQL */ `
	query customGetActivities($id: ID!) {
		getActivity(id: $id) {
			id
			createdAt
			name
			userID
			user {
				id
				name
				lastName
				profilePicURL
			}
			updatedAt
			location {
				id
				lat
				lon
				name
			}
			archived
			capacity
			category
			coverPhoto
			description
			locationID
			privacy
			timeOfEvent
			tripID
			views
			activityUsers {
				items {
					id
				}
			}
			activityLikers {
				items {
					id
				}
			}
		}
	}
`;

export const customListActivities = /* GraphQL */ `
	query customListActivities {
		listActivitys(filter: { archived: { eq: false }, and: { not: { archived: { eq: true } } } }) {
			items {
				capacity
				category
				coverPhoto
				createdAt
				description
				id
				locationID
				location {
					id
					lat
					lon
					name
				}
				name
				privacy
				timeOfEvent
				tripID
				updatedAt
				userID
				user {
					id
					name
					lastName
					profilePicURL
				}
				views
				activityLikers {
					items {
						activityLikerID
						activityID
					}
				}
				activityUsers {
					items {
						id
						activityID
						userID
						status
						user {
							name
							lastName
							id
							profilePicURL
						}
					}
				}
				location {
					googlePlaceID
				}
			}
		}
	}
`;

export const customUpdateActivity = /* GraphQL */ `
	mutation customUpdateActivity(
		$id: ID!
		$coverPhoto: String
		$category: String
		$capacity: Int
		$description: String
		$locationID: ID
		$name: String
		$privacy: Int
		$archived: Boolean
		$timeOfEvent: String
		$userID: ID
		$views: Int
	) {
		updateActivity(
			input: {
				id: $id
				locationID: $locationID
				name: $name
				userID: $userID
				description: $description
				archived: $archived
				capacity: $capacity
				category: $category
				coverPhoto: $coverPhoto
				privacy: $privacy
				timeOfEvent: $timeOfEvent
				views: $views
			}
		) {
			id
			archived
			capacity
			category
			coverPhoto
			createdAt
			description
			locationID
			name
			privacy
			timeOfEvent
			updatedAt
			userID
			views
		}
	}
`;

export const customAcceptActivityRequest = /* GraphQL */ `
	mutation customAcceptActivityRequest($activityID: ID!, $id: ID!, $userID: ID!) {
		updateActivityUser(input: { activityID: $activityID, id: $id, userID: $userID, status: "accepted" }) {
			status
		}
	}
`;

// Might not use this one
export const customGetBuddiesActivities = /* GraphQL */ `
	query customGetBuddiesActivities($id: ID!) {
		getUser(id: $id) {
			requestedBuddies(filter: { status: { eq: "accepted" }, and: { not: { archived: { eq: true } } } }) {
				items {
					requestee {
						createdActivities {
							items {
								id
								name
								coverPhoto
								views
								description
								timeOfEvent
								privacy
								capacity
								archived
								category
								userID
								locationID
								tripID
								createdAt
								updatedAt
							}
						}
					}
				}
			}
			receivedRequests(filter: { status: { eq: "accepted" } }) {
				items {
					requester {
						createdActivities {
							items {
								id
								name
								coverPhoto
								views
								description
								timeOfEvent
								privacy
								capacity
								archived
								category
								userID
								locationID
								tripID
								createdAt
								updatedAt
							}
						}
					}
				}
			}
		}
	}
`;

export const customGetBuddiesTripActivitiesIDs = /* GraphQL */ `
	query customGetBuddiesActivities($id: ID!) {
		getUser(id: $id) {
			requestedBuddies(filter: { status: { eq: "accepted" } }) {
				items {
					requestee {
						createdActivities(filter: { archived: { eq: false } }) {
							items {
								id
							}
						}
						createdTrips(filter: { archived: { eq: false } }) {
							items {
								id
							}
						}
					}
				}
			}
			receivedRequests(filter: { status: { eq: "accepted" } }) {
				items {
					requester {
						createdActivities(filter: { archived: { eq: false } }) {
							items {
								id
							}
						}
						createdTrips(filter: { archived: { eq: false } }) {
							items {
								id
							}
						}
					}
				}
			}
		}
	}
`;

export const customListPublicActivitiesIDs = /* GraphQL */ `
	query customListPublicActivities {
		listActivitys(filter: { privacy: { eq: 2 }, archived: { eq: false } }) {
			items {
				id
			}
		}
	}
`;

export const customListPublicTripsIDs = /* GraphQL */ `
	query customListPublicActivities {
		listTrips(filter: { privacy: { eq: 2 }, archived: { eq: false } }) {
			items {
				id
			}
		}
	}
`;

export const customCreateComment = /* GraphQL */ `
	mutation customCreateComment($postID: ID!, $userID: ID!, $content: String!) {
		createComment(input: { postID: $postID, userID: $userID, content: $content }) {
			id
			content
			createdAt
			postID
			userID
		}
	}
`;

export const customListComments = /* GraphQL */ `
	query customListComments($postID: ID!) {
		listComments(filter: { postID: { eq: $postID } }) {
			items {
				content
				createdAt
				id
				updatedAt
				userID
				user {
					name
					lastName
					profilePicURL
				}
			}
		}
	}
`;

export const customCreateLocation = /* GraphQL */ `
	mutation customCreateLocation(
		$googlePlaceID: String!
		$lat: Float!
		$lon: Float!
		$name: String!
		$streetNumber: Int
		$street: String
		$state: String
		$photo: String
		$ownedBy: ID
		$neighborhood: String
		$firstTouchedBy: ID
		$county: String
		$country: String
		$city: String
	) {
		createLocation(
			input: {
				googlePlaceID: $googlePlaceID
				lat: $lat
				lon: $lon
				name: $name
				streetNumber: $streetNumber
				street: $street
				state: $state
				photo: $photo
				ownedBy: $ownedBy
				neighborhood: $neighborhood
				firstTouchedBy: $firstTouchedBy
				county: $county
				country: $country
				city: $city
			}
		) {
			id
			googlePlaceID
			addressStr: name
			createdAt
			country
			state
			county
			city
			neighborhood
			street
			streetNumber
			photo
			lat
			lon
			firstTouchedBy
			ownedBy
		}
	}
`;

export const customGetLocation = /* GraphQL */ `
	query customGetLocation($id: String!) {
		listLocations(filter: { googlePlaceID: { eq: $id } }) {
			items {
				googlePlaceID
				addressStr: name
				datefirstUsed: createdAt
				country
				state
				county
				city
				neighborhood
				street
				streetNumber
				photo
				lat
				lon
				firstTouchedBy
				ownedBy
			}
		}
	}
`;

export const customUpdateLocation = /* GraphQL */ `
	mutation customUpdateLocation(
		$id: ID!
		$googlePlaceID: String!
		$lat: Float!
		$lon: Float!
		$name: String!
		$streetNumber: Int
		$street: String
		$state: String
		$photo: String
		$ownedBy: ID
		$neighborhood: String
		$firstTouchedBy: ID
		$county: String
		$country: String
		$city: String
	) {
		updateLocation(
			input: {
				id: $id
				googlePlaceID: $googlePlaceID
				lat: $lat
				lon: $lon
				name: $name
				streetNumber: $streetNumber
				street: $street
				state: $state
				photo: $photo
				ownedBy: $ownedBy
				neighborhood: $neighborhood
				firstTouchedBy: $firstTouchedBy
				county: $county
				country: $country
				city: $city
			}
		) {
			id
			googlePlaceID
			addressStr: name
			createdAt
			country
			state
			county
			city
			neighborhood
			street
			streetNumber
			photo
			lat
			lon
			firstTouchedBy
			ownedBy
		}
	}
`;

export const customListUserRequestedActivitiesTrips = /* GraphQL */ `
	query customListUserRequestedActivities($id: ID!) {
		getUser(id: $id) {
			joinedActivities(filter: { status: { eq: "pending" } }) {
				items {
					activityID
				}
			}
			joinedTrips(filter: { status: { eq: "pending" } }) {
				items {
					id
				}
			}
		}
	}
`;

export const customListTrips = /* GraphQL */ `
	query customListTrips {
		listTrips(filter: { archived: { eq: false } }) {
			items {
				id
				name
				privacy
				timeOfEvent
				description
				createdAt
				coverPhoto
				category
				capacity
				updatedAt
				userID
				views
				archived
				cost
				endDate
				startDate
				activities(filter: { archived: { eq: false } }) {
					items {
						id
					}
				}
				tripUser {
					items {
						id
						userID
						status
						user {
							name
							lastName
							id
							profilePicURL
						}
						notifications
					}
				}
				tripPosts(filter: { archived: { eq: false } }) {
					items {
						id
					}
				}
			}
		}
	}
`;

export const customGetCheckedInLocations = /* GraphQL */ `
	query customGetCheckedInLocations($id: ID = "") {
		getUser(id: $id) {
			checkedInLocations {
				items {
					id
					user {
						id
					}
					activity {
						id
					}
					locationID
					createdAt
					checkinTime
					updatedAt
				}
			}
		}
	}
`;

export const customListLocations = /* GraphQL */ `
	query customListLocations {
		listLocations {
			items {
				id
				googlePlaceID
				createdAt
				name
				country
				state
				county
				city
				neighborhood
				street
				streetNumber
				photo
				lat
				lon
				firstTouchedBy
				ownedBy
				updatedAt
			}
		}
	}
`;

export const customListCheckInIDs = /* GraphQL */ `
	query customListCheckInIDs {
		listLocations {
			items {
				usersCheckedIn {
					items {
						userID
						locationID
						activityID
						tripID
						id
					}
				}
			}
		}
	}
`;

export const customArchivePost = /* GraphQL */ `
	mutation customUpdatePost($id: ID!, $archived: Boolean, $content: String, $source: String) {
		updatePost(input: { id: $id, archived: $archived, content: $content, source: $source }) {
			id
			archived
			content
			createdAt
			source
		}
	}
`;

export const customFavePost = /* GraphQL */ `
	mutation customFavePost($postID: ID!, $postLikerID: ID!) {
		createPostLiker(input: { postID: $postID, postLikerID: $postLikerID }) {
			id
			postID
			postLikerID
			createdAt
			updatedAt
		}
	}
`;

export const customGetPostLikerIDs = /* GraphQL */ `
	query customGetPostLikerIDs($id: ID!) {
		getPost(id: $id) {
			postLikers {
				items {
					id
					postID
					postLikerID
				}
			}
		}
	}
`;

export const customDeleteFavePost = /* GraphQL */ `
	mutation customDeleteFavePost($id: ID!) {
		deletePostLiker(input: { id: $id }) {
			id
		}
	}
`;

export const customCreateActivityUser = /* GraphQL */ `
	mutation customCreateActivityUser($activityID: ID!, $userID: ID!, $notifications: Boolean) {
		createActivityUser(input: { activityID: $activityID, userID: $userID, status: "pending", notifications: $notifications }) {
			id
			activityID
			userID
			status
			createdAt
			updatedAt
			notifications
		}
	}
`;

export const customCreateTripUser = /* GraphQL */ `
	mutation customCreateTripUser($tripID: ID!, $userID: ID!, $notifications: Boolean) {
		createTripUser(input: { tripID: $tripID, userID: $userID, status: "pending", notifications: $notifications }) {
			id
			tripID
			userID
			status
			createdAt
			updatedAt
			notifications
		}
	}
`;

export const customGetActivityUsers = /* GraphQL */ `
	query customGetActivityUsers($id: ID!) {
		getActivity(id: $id) {
			activityUsers {
				items {
					id
					activityID
					userID
					notifications
				}
			}
		}
	}
`;

export const customGetTripUsers = /* GraphQL */ `
	query customGetTripUsers($id: ID!) {
		getTrip(id: $id) {
			tripUser {
				items {
					id
					tripID
					userID
					notifications
				}
			}
		}
	}
`;

export const customGetTripUserForDelete = /* GraphQL */ `
	query customGetTripUserForDelete($id: ID!) {
		getTrip(id: $id) {
			tripUser {
				items {
					id
					userID
				}
			}
		}
	}
`;

export const customDeleteActivityUser = /* GraphQL */ `
	mutation customDeleteActivityUser($id: ID!) {
		deleteActivityUser(input: { id: $id }) {
			id
		}
	}
`;

export const customDeleteTripUser = /* GraphQL */ `
	mutation customDeleteTripUser($id: ID!) {
		deleteTripUser(input: { id: $id }) {
			id
		}
	}
`;

export const customUpdateSettings = /* GraphQL */ `
	mutation customUpdateSettings($settings: [Int], $id: ID!) {
		updateUser(input: { settings: $settings, id: $id }) {
			id
			settings
		}
	}
`;

export const customCreateCheckIn = /* GraphQL */ `
	mutation customCreateCheckIn(
		$text: String
		$activityID: ID
		$tripID: ID
		$source: String
		$locationID: ID!
		$anticipatedTime: String
		$complete: Boolean
		$showOnNewsfeed: Boolean
		$userID: ID!
	) {
		createCheckIn(
			input: {
				text: $text
				activityID: $activityID
				tripID: $tripID
				source: $source
				locationID: $locationID
				anticipatedTime: $anticipatedTime
				complete: $complete
				showOnNewsfeed: $showOnNewsfeed
				userID: $userID
			}
		) {
			id
		}
	}
`;

export const customUpdateExp = /* GraphQL */ `
	mutation customUpdateExp($id: ID!, $exp: Int, $level: Int) {
		updateUser(input: { id: $id, exp: $exp, level: $level }) {
			id
			exp
			level
		}
	}
`;

export const customGetJoinedActivity = /* GraphQL */ `
	query customGetJoinedActivity($eq: ID, $id: ID!) {
		getUser(id: $id) {
			joinedActivities(filter: { activityID: { eq: $eq } }) {
				items {
					id
				}
			}
		}
	}
`;

export const customFaveActivity = /* GraphQL */ `
	mutation customFaveActivity($activityID: ID!, $activityLikerID: ID!) {
		createActivityLiker(input: { activityID: $activityID, activityLikerID: $activityLikerID }) {
			id
			activityID
			activityLikerID
			createdAt
			updatedAt
		}
	}
`;

export const customGetActivityLikerIDs = /* GraphQL */ `
	query customGetActivityLikerIDs($id: ID!) {
		getActivity(id: $id) {
			activityLikers {
				items {
					id
					activityID
					activityLikerID
				}
			}
		}
	}
`;
export const customCreateTrip = /* GraphQL */ `
	mutation customCreateTrip(
		$capacity: Int!
		$description: String!
		$name: String!
		$privacy: Int!
		$userID: ID!
		$startDate: String!
		$endDate: String!
		$coverPhoto: String
	) {
		createTrip(
			input: {
				archived: false
				capacity: $capacity
				description: $description
				name: $name
				privacy: $privacy
				views: 0
				userID: $userID
				startDate: $startDate
				endDate: $endDate
				coverPhoto: $coverPhoto
			}
		) {
			id
			name
			description
			capacity
			userID
			privacy
			startDate
			endDate
			coverPhoto
		}
	}
`;

export const customAcceptTripRequest = /* GraphQL */ `
	mutation customAcceptTripRequest($tripID: ID!, $id: ID!, $userID: ID!) {
		updateTripUser(input: { tripID: $tripID, id: $id, userID: $userID, status: "accepted" }) {
			status
		}
	}
`;

export const customCreateStory = /* GraphQL */ `
	mutation customCreateStory($source: String!, $userID: ID!, $locationID: ID, $activityID: ID, $tripID: ID) {
		createStory(
			input: { source: $source, userID: $userID, locationID: $locationID, activityID: $activityID, tripID: $tripID, archived: false, views: 0 }
		) {
			id
		}
	}
`;

export const customListStories = /* GraphQL */ `
	query customListStories {
		listStorys {
			items {
				id
				activityID
				archived
				locationID
				source
				tripID
				userID
				views
				createdAt
				updatedAt
			}
		}
	}
`;

export const customGetUserLikes = /* GraphQL */ `
	query customGetUserLikes($id: ID!) {
		getUser(id: $id) {
			likedPosts {
				items {
					postID
				}
			}
			likedActivities {
				items {
					activityID
				}
			}
		}
	}
`;

export const customCreateFeedback = /* GraphQL */ `
	mutation customCreateFeedback($content: String!, $feedbackType: String!, $rating: Int!, $title: String!, $userID: ID!) {
		createFeedback(input: { content: $content, feedbackType: $feedbackType, rating: $rating, title: $title, userID: $userID }) {
			id
		}
	}
`;

export const customGetActivityPosts = /* GraphQL */ `
	query customGetActivityPosts($id: ID!) {
		getActivity(id: $id) {
			activityPosts(filter: { archived: { eq: false } }) {
				items {
					id
					content
					source
					userID
					views
					createdAt
					updatedAt
					locationID
				}
			}
		}
	}
`;

export const customEditTrip = /* GraphQL */ `
	mutation customEditTrip(
		$archived: Boolean
		$capacity: Int!
		$category: String
		$cost: Int
		$coverPhoto: String
		$description: String
		$startDate: String
		$endDate: String
		$name: String
		$privacy: Int
		$timeOfEvent: String
		$id: ID!
	) {
		updateTrip(
			input: {
				archived: $archived
				capacity: $capacity
				category: $category
				cost: $cost
				coverPhoto: $coverPhoto
				description: $description
				startDate: $startDate
				endDate: $endDate
				name: $name
				privacy: $privacy
				timeOfEvent: $timeOfEvent
				id: $id
			}
		) {
			id
			archived
			capacity
			category
			cost
			coverPhoto
			createdAt
			description
			endDate
			name
			privacy
			startDate
			timeOfEvent
			updatedAt
			userID
			views
			activities(filter: { archived: { eq: false } }) {
				items {
					id
				}
			}
			tripUser {
				items {
					id
				}
			}
			tripPosts {
				items {
					id
				}
			}
		}
	}
`;

export const customUpdateTripID = /* GraphQL */ `
	mutation customUpdateTripID($tripID: ID, $id: ID!) {
		updateActivity(input: { tripID: $tripID, id: $id }) {
			id
		}
	}
`;

export const customArchiveTrip = /* GraphQL */ `
	mutation customArchiveTrip($id: ID!) {
		updateTrip(input: { id: $id, archived: true }) {
			id
		}
	}
`;
