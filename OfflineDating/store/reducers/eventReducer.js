import { STORE_EVENTS } from '../actions/types';
import moment from 'moment';
const initialState = {
	0: {
		id: 0,
		ref: 0,
		title: 'Get HIIT on',
		description: 'Come get hiit on by the hottest singles in your area',
		date: moment(new Date(Date.now())).format('MMM Do, YYYY'),
		time: moment(new Date(Date.now())).format('hh:mm A'),
		location: 'PB Gym',
		coverPhoto:
			'https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/blogs/3762/images/DUDfOeTOqk6vh7L84WGw_group_fitness.jpg',
	},
	1: {
		id: 1,
		ref: 1,
		title: 'Hike Potato Chip',
		description: 'Celebrate Good Times Come On!',
		date: moment(new Date(Date.now() + 1000000000)).format('MMM Do, YYYY'),
		time: moment(new Date(Date.now() + 1000000000)).format('hh:mm A'),
		location: 'Mt. Pringle',
		coverPhoto:
			'https://images.prismic.io/weekendsherpa/YWNmODdhZDctOTU3My00NzQwLWE0MzYtZjk0ZDQwZWVmMWRi_-?auto=compress%2Cformat&rect=0%2C0%2C5184%2C3456&w=1080&h=1080&fit=crop',
	},
};
const eventReducer = (state = initialState, action) => {
	switch (action.type) {
		case STORE_EVENTS:
			return action.data ? action.data : state;
		default:
			return state;
	}
};

export default eventReducer;
