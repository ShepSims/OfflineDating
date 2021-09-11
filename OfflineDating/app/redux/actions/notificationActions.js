import { STORE_NOTIFICATIONS } from './types';

export const storeNotifications = (notifications) => ({
	type: STORE_NOTIFICATIONS,
	data: notifications,
});
