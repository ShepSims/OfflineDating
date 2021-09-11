import { STORE_INBOX } from './types';

export const storeInbox = (inbox) => (
    {
        type: STORE_INBOX,
        data: inbox,
    }
);