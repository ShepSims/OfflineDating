import { createStore, combineReducers } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import currentUserReducer from './reducers/currentUserReducer';
import inboxReducer from './reducers/inboxReducer';
import userReducer from './reducers/userReducer';
import activityReducer from './reducers/activityReducer';
import meetReducer from './reducers/meetReducer';
import newsfeedReducer from './reducers/newsfeedReducer';
import postReducer from './reducers/postReducer';
import storyReducer from './reducers/storyReducer';
import tripReducer from './reducers/tripReducer';
import notificationReducer from './reducers/notificationReducer';
import checkInReducer from './reducers/checkInReducer';
import locationReducer from './reducers/locationReducer';

const rootReducer = combineReducers({
	currentUser: currentUserReducer,
	inbox: inboxReducer,
	activities: activityReducer,
	meet: meetReducer,
	newsfeed: newsfeedReducer,
	posts: postReducer,
	stories: storyReducer,
	trips: tripReducer,
	users: userReducer,
	notifications: notificationReducer,
	checkIns: checkInReducer,
	locations: locationReducer
});

const configureStore = () => createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),);

export default configureStore;
