import { STORE_USERS } from './types';

export const storeUsers = (users) => ({
	type: STORE_USERS,
	data: users,
});
