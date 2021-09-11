import { STORE_CURRENT_USER, EDIT_PROFILE, UPDATE_USER, UPDATE_SETTINGS } from '../actions/types';
import { calculateAge } from '../../config/functions';
import { classic, selectTheme } from '../../config/themes';

const initialState = {
	lastUpdate: new Date(Date.now()),
	id: 0, // User's id
	firstName: '', // User's last name
	lastName: '', // User's first name
	profilePic: '', // User's profile picture stored as a string
	birthday: new Date(Date.now()), // Birthday stored as a date
	age: 0, // Age derived from birthday
	blockedUsers: {},
	blockedByUsers: {},
	matches: [], // List of matches' ids
	conversations: [], // List of conversation ids
	settings: [], // Array of integers that represent settings
	theme: classic, // An object that contains the color palette for the app derived from settings[5]
};

const currentUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case STORE_CURRENT_USER:
			return {
				...state,
				lastUpdate: new Date(Date.now()),
				id: action.data.id,
				firstName: action.data.firstName,
				lastName: action.data.lastName,
				profilePic: action.data.profilePic,
				birthday: new Date(action.data.birthday),
				age: calculateAge(new Date(action.data.birthday)),
				matches: action.data.matches,
				blockedUsers: action.data.blockedUsers,
				blockedByUsers: action.data.blockedByUsers,
				conversations: action.data.conversations,
				settings: action.data.settings,
				theme: selectTheme(action.data.settings[5]),
			};
		case EDIT_PROFILE:
			return {
				...state,
				birthday: new Date(action.data.birthday),
				age: calculateAge(new Date(action.data.birthday)),
				profilePic: action.data.profilePic,
			};
		case UPDATE_USER:
			return {
				...state,
				id: action.data.id,
				lastUpdate: action.data.lastUpdate,
				profilePic: action.data.profilePic,
				birthday: action.data.birthday,
				age: calculateAge(new Date(action.data.birthday)),
				conversations: action.data.conversations,
				matches: action.data.matches,
				blockedUsers: action.data.blockedUsers,
				blockedByUsers: action.data.blockedByUsers,
			};
		case UPDATE_SETTINGS:
			return {
				...state,
				settings: action.data,
				theme: selectTheme(action.data[5]),
			};
		default:
			return state;
	}
};
export default currentUserReducer;
