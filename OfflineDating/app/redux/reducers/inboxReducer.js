import { STORE_INBOX } from '../actions/types';

const initialState = {};

const inboxReducer = (state = initialState, action) => {
	switch (action.type) {
		case STORE_INBOX:
			return action.data ? action.data : state;
		default:
			return state;
	}
};

export default inboxReducer;
