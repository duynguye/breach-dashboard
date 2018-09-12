// Import Action Type
import { SET_CONNECTION_STATUS } from '../constants/action_types';

// Reducer
export default function (state = false, action) {
    switch (action.type) {
        case SET_CONNECTION_STATUS:
            return action.connected;

        default:
            return state;
    }
}