import { EDIT_PROFILE, STORE_CURRENT_USER, UPDATE_USER } from './types';

export const storeCurrentUser = (user) => ({
	type: STORE_CURRENT_USER,
	data: user,
});

export const editProfile = (profileInfo) => ({
	type: EDIT_PROFILE,
	data: profileInfo,
});

export const updateUser = (user) => ({
	type: UPDATE_USER,
	data: user,
});
