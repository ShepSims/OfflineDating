import { STORE_MEET } from './types';

export const storeMeet = (meet) => (
    {
        type: STORE_MEET,
        data: meet,
    }
);