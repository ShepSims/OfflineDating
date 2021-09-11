import { STORE_NOTIFICATIONS } from '../actions/types';

const initialState = {};

const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case STORE_NOTIFICATIONS:
			return action.data ? action.data : state;
		default:
			return state;
	}
};

export default notificationReducer;
