// Import Action Type
import { SET_TITLE } from '../constants/action_types';

// Reducer
export default function (state = 'Loading...', action) {
    switch (action.type) {
        case SET_TITLE:
            return action.title;

        default:
            return state;
    }
}