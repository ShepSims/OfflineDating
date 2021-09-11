import { axiosInstance } from '../../app/axiosAPI';
import { storeActivities } from '../redux/actions/activityActions';
import { storeNotifications } from '../redux/actions/notificationActions';
import { storeTrips } from '../redux/actions/tripActions';
import { updateUser } from '../redux/actions/currentUserActions';
import { storeNewsfeed } from '../redux/actions/newsfeedActions';
import { storePosts } from '../redux/actions/postActions';
import { storeLocations } from '../redux/actions/locationActions';
import { storeStories } from '../redux/actions/storyActions';
import { storeCheckIns } from '../redux/actions/checkInActions';

export function equalArrays(arr1, arr2) {
	if (arr1.length == arr2.length) {
		for (let i = 0; i < arr1.length; i++) {
			if (arr1[i] != arr2[i]) return false;
		}
		return true;
	} else {
		return false;
	}
}

export function wait(timeout) {
	return new Promise((resolve) => setTimeout(resolve, timeout));
}

export function isNullEmptyUndef(item) {
	return item === '' || item === undefined || item === null;
}

export function determinePFP(pfp, placeholderPfp) {
	if (isNullEmptyUndef(pfp)) {
		return placeholderPfp;
	} else {
		return { uri: pfp };
	}
}

export function calculateAge(birthday) {
	var today = new Date();
	var age = today.getFullYear() - birthday.getFullYear();
	var m = today.getMonth() - birthday.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
		age--;
	}
	return age;
}

export function updateState(dispatch, currentUser, trips, activities, notifications, posts, stories, newsfeed, locations, checkIns) {
	console.log(
		'\n\n\n\n    ------------------------------------------------------------------------------------------------\n------------------------------------------------update------------------------------------------------\n    ------------------------------------------------------------------------------------------------\n\n',
		'State Before Update\n',
		currentUser.lastUpdate,
		'\n\n Name: ',
		currentUser.fname,
		'\n\n          Activities: ',
		currentUser.activities,
		'\n          Trips: ',
		currentUser.trips,
		// '\n          Badges: ', currentUser.badges,
		// '\n          Bio: ', currentUser.bio,
		// '\n          Birthday: ', currentUser.birthday,
		'\n          Buddies: ',
		currentUser.buddies,
		'\n          Conversations: ',
		currentUser.conversations,
		'\n          Last Update: ',
		currentUser.lastUdate,
		'\n          Posts: ',
		currentUser.posts
	);

	axiosInstance.get('updateState/', { params: { last_update: currentUser.lastUpdate } }).then((res) => {
		console.log(
			'\n\n\n\nResponse Updates: \n ',
			res.data.last_active,
			'\n          Name: ',
			res.data.currentUser.first,
			'\n          Activities: ',
			res.data.activities,
			'\n          Trips: ',
			res.data.trips,
			'\n          Inbox: ',
			res.data.inbox,
			'\n          Last Update: ',
			res.data.currentUser.last_active,
			'\n          Posts: ',
			res.data.posts,
			'\n          Notifications: ',
			res.data.notifications,
			'\n          Locations',
			res.data.locations
		);

		// * // // * // // * // // * // // * // // * // // * //

		//  Redux Store updates

		// * // // * // // * // // * // // * // // * // // * //

		for (let id in res.data.activities) {
			activities[id] = res.data.activities[id];

			// This set of if-else conditions checks if the updated item ID is in the correct currentUser.activities redux lists based on the updated data
			// and corrects any changes

			if (
				res.data.activities[id].attendees.includes(currentUser.id) &&
				res.data.activities[id].archived == false &&
				res.data.activities[id].created_by != currentUser.id
			) {
				if (!currentUser.activities['joined'].includes(id)) {
					currentUser.activities['joined'].push(parseInt(id));
				}

				// If in shouldn't be in joined, make sure its not there
			} else {
				if (currentUser.activities['joined'].includes(id)) {
					const index = currentUser.activities['joined'].indexOf(id);
					if (index > -1) {
						currentUser.activities['joined'].splice(index, 1);
					}
				}
			}
			// Same for public
			if (
				res.data.activities[id].privacy == 2 &&
				res.data.activities[id].archived == false &&
				res.data.activities[id].created_by != currentUser.id &&
				!res.data.activities[id].attendees.includes(currentUser.id)
			) {
				if (!currentUser.activities['public'].includes(id)) {
					currentUser.activities['public'].push(parseInt(id));
				}
			} else {
				if (currentUser.activities['public'].includes(id)) {
					const index = currentUser.activities['public'].indexOf(id);
					if (index > -1) {
						currentUser.activities['public'].splice(index, 1);
					}
				}
			}
			// Same for friends
			if (
				res.data.activities[id].privacy > 0 &&
				currentUser.buddies.buddies.includes(res.data.activities[id].created_by) &&
				res.data.activities[id].archived == false &&
				res.data.activities[id].created_by != currentUser.id
			) {
				if (!currentUser.activities['friends'].includes(id)) {
					currentUser.activities['friends'].push(parseInt(id));
				}
			} else {
				if (currentUser.activities['friends'].includes(id)) {
					const index = currentUser.activities['friends'].indexOf(id);
					if (index > -1) {
						currentUser.activities['friends'].splice(index, 1);
					}
				}
			}

			// Same for own
			if (res.data.activities[id].created_by == currentUser.id) {
				if (!currentUser.activities['own'].includes(id)) {
					currentUser.activities['own'].push(parseInt(id));
				}
			} else {
				if (currentUser.activities['own'].includes(id)) {
					const index = currentUser.activities['own'].indexOf(id);
					if (index > -1) {
						currentUser.activities['own'].splice(index, 1);
					}
				}
			}

			// and same for requests
			if (!res.data.activities[id].requests.includes(currentUser.id) && currentUser.activities.requested.includes(id)) {
				const index = currentUser.activities['requested'].indexOf(id);
				if (index > -1) {
					currentUser.activities['requested'].splice(index, 1);
				}
			}
		}

		for (let id in res.data.trips) {
			trips[id] = res.data.trips[id];

			// This set of if-else conditions checks if the updated item ID is in the correct currentUser.activities redux lists based on the updated data
			// and corrects any changes

			if (
				res.data.trips[id].members.includes(currentUser.id) &&
				res.data.trips[id].archived == false &&
				res.data.trips[id].created_by != currentUser.id
			) {
				if (!currentUser.trips['joined'].includes(id)) {
					currentUser.trips['joined'].push(parseInt(id));
				}

				// If in shouldn't be in joined, make sure its not there
			} else {
				if (currentUser.trips['joined'].includes(id)) {
					const index = currentUser.trips['joined'].indexOf(id);
					if (index > -1) {
						currentUser.trips['joined'].splice(index, 1);
					}
				}
			}
			// Same for public
			if (
				res.data.trips[id].privacy == 2 &&
				res.data.trips[id].archived == false &&
				res.data.trips[id].created_by != currentUser.id &&
				!res.data.trips[id].members.includes(currentUser.id)
			) {
				if (!currentUser.trips['public'].includes(id)) {
					currentUser.trips['public'].push(parseInt(id));
				}
			} else {
				if (currentUser.trips['public'].includes(id)) {
					const index = currentUser.trips['public'].indexOf(id);
					if (index > -1) {
						currentUser.trips['public'].splice(index, 1);
					}
				}
			}
			// Same for friends
			if (
				res.data.trips[id].privacy > 0 &&
				currentUser.buddies.buddies.includes(res.data.trips[id].created_by) &&
				res.data.trips[id].archived == false &&
				res.data.trips[id].created_by != currentUser.id
			) {
				if (!currentUser.trips['friends'].includes(id)) {
					currentUser.trips['friends'].push(parseInt(id));
				}
			} else {
				if (currentUser.trips['friends'].includes(id)) {
					const index = currentUser.trips['friends'].indexOf(id);
					if (index > -1) {
						currentUser.trips['friends'].splice(index, 1);
					}
				}
			}

			// Same for own
			if (res.data.trips[id].created_by == currentUser.id) {
				if (!currentUser.trips['own'].includes(id)) {
					currentUser.trips['own'].push(parseInt(id));
				}
			} else {
				if (currentUser.trips['own'].includes(id)) {
					const index = currentUser.trips['own'].indexOf(id);
					if (index > -1) {
						currentUser.trips['own'].splice(index, 1);
					}
				}
			}

			// and same for requests
			if (!res.data.trips[id].requests.includes(currentUser.id) && currentUser.trips.requested.includes(id)) {
				const index = currentUser.trips['requested'].indexOf(id);
				if (index > -1) {
					currentUser.trips['requested'].splice(index, 1);
				}
			}
		}
		for (let id in res.data.checkins) {
			checkIns[id] = res.data.checkins[id];
		}
		for (let id in res.data.notifications) {
			notifications[id] = res.data.notifications[id];
		}
		for (let id in res.data.posts) {
			posts[parseInt(id)] = res.data.posts[id];
			if (newsfeed.posts.includes(id) && res.data.posts[id].archived == true) {
				const index = newsfeed.posts.indexOf(id);
				if (index > -1) {
					newsfeed.posts.splice(index, 1);
				}
			}
			if (!newsfeed.posts.includes(parseInt(id)) && res.data.posts[id].archived == false) {
				newsfeed.posts.push(id);
				console.log('adding to newsfeed posts');
			}
		}
		for (let id in res.data.locations) {
			locations[res.data.locations[id].google_place_id] = res.data.locations[id];
		}
		for (let id in res.data.stories) {
			stories[parseInt(id)] = res.data.stories[id];
			newsfeed.stories.push(id);
		}
		currentUser.lastUpdate == new Date(Date.now());
		currentUser.buddies = res.data.currentUser.buddies;
		dispatch(updateUser(currentUser));
		dispatch(storeActivities(activities));
		dispatch(storeTrips(trips));
		dispatch(storeNotifications(notifications));
		dispatch(storeNewsfeed(newsfeed));
		dispatch(storePosts(posts));
		dispatch(storeStories(stories));
		dispatch(storeLocations(locations));
		dispatch(storeCheckIns(checkIns));
	}, []);
}
