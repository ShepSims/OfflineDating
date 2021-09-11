import { STORE_MESSAGES } from '../actions/types';

const initialState = {};

const messageReducer = (state = initialState, action) => {
	switch (action.type) {
		case STORE_MESSAGES:
			return action.data ? action.data : state;
		default:
			return state;
	}
};

export default messageReducer;
