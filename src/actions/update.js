import { SET_LAST_UPDATE } from '../constants/action_types';

// Action Creators
export const setLastUpdate = (update) => ({
    type: SET_LAST_UPDATE,
    update
});