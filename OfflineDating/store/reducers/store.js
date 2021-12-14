import { createStore, combineReducers } from 'redux';
import currentUserReducer from './currentUserReducer';
import eventReducer from './eventReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	currentUser: currentUserReducer,
	events: eventReducer,
	users: userReducer,
});

const configureStore = () => createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default configureStore;
