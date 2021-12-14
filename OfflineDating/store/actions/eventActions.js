import { STORE_EVENTS } from './types';

export const storeEvents = (events) => ({
	type: STORE_EVENTS,
	data: events,
});
