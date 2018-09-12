import { SET_CONNECTION_STATUS } from '../constants/action_types';

// Action Creators
export const setConnectionStatus = (connected) => ({
    type: SET_CONNECTION_STATUS,
    connected
});