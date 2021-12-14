import { STORE_USERS } from '../actions/types';

const initialState = {};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case STORE_USERS:
			return action.data ? action.data : state;
		default:
			return state;
	}
};

export default userReducer;
