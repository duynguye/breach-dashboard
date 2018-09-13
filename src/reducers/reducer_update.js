// Import Action Type
import { SET_LAST_UPDATE } from '../constants/action_types';

// Reducer
export default function (state = new Date(), action) {
    switch (action.type) {
        case SET_LAST_UPDATE:
            return action.update;

        default:
            return state;
    }
}