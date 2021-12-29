import { STORE_CURRENT_USER, EDIT_PROFILE, UPDATE_USER } from '../actions/types';

const initialState = {
	lastUpdate: new Date(Date.now()),
	id: 0, // User's id
	name: 'Shep Sims', // User's name
	profilePic: 'https://generalssports.com/images/2019/11/7/Sims_Web.jpg', // User's profile picture stored as a string
	acceptedEULA: false,
	matches: {},
	instagram: '@shep_sims',
	phone: '3049821999',
	role: 'owner',
};

const currentUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case STORE_CURRENT_USER:
			return {
				...state,
				id: action.data.id,
				fname: action.data.fname,
				lname: action.data.lname,
				profilePic: action.data.profilePic,
				instagram: action.data.instagram,
				phone: action.data.phone,
				role: action.data.role,
			};
		case EDIT_PROFILE:
			return {
				...state,
				profilePic: action.data.profilePic,
				instagram: action.data.instagram,
				phone: action.data.phone,
			};
		case UPDATE_USER:
			return {
				...state,
				matches: action.data.matches,
			};
		default:
			return state;
	}
};
export default currentUserReducer;
