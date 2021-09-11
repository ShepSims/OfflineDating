import { STORE_MESSAGES } from './types';

export const storeMessages = (messages) => (
    {
        type: STORE_MESSAGES,
        data: messages,
    }
);