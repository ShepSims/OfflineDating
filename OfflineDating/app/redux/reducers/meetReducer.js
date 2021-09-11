import { STORE_MEET } from '../actions/types';

const initialState = {};

const meetReducer = (state = initialState, action) => {
	switch (action.type) {
		case STORE_MEET:
			return action.data ? action.data : state;
		default:
			return state;
	}
};

export default meetReducer;
