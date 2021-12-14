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
		description: 'a thin slice of potato that has been either deep fried or baked until crunchy',
		date: moment(new Date(Date.now() + 1000000000)).format('MMM Do, YYYY'),
		time: moment(new Date(Date.now() + 1000000000)).format('hh:mm A'),
		location: 'Mt. Pringle',
		coverPhoto:
			'https://images.prismic.io/weekendsherpa/YWNmODdhZDctOTU3My00NzQwLWE0MzYtZjk0ZDQwZWVmMWRi_-?auto=compress%2Cformat&rect=0%2C0%2C5184%2C3456&w=1080&h=1080&fit=crop',
	},
	2: {
		id: 2,
		ref: 1,
		title: 'Surf n Swing',
		description: "When was the last time you got lei'd?!",
		date: moment(new Date(Date.now() + 2000000000)).format('MMM Do, YYYY'),
		time: moment(new Date(Date.now() + 1500000000)).format('hh:mm A'),
		location: 'Sunset Cliffs',
		coverPhoto:
			'https://ctl.s6img.com/society6/img/VCWHgf6VAZKK_DNDilS4rDth-AA/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/dfde97d205904017b08f266b793d697c/~~/vintage-beach-party-1-prints.jpg?wait=0&attempt=0',
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
