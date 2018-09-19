import { ADD_ISSUE, REMOVE_ISSUE, UPDATE_ISSUE, SET_ISSUE_HANDLED } from '../constants/action_types';

const issue = (state, action) => {
    switch (action.type) {
        case ADD_ISSUE:
            return {...action.issue};
    }
};

export default function (state = [], action) {
    switch (action.type) {
        case ADD_ISSUE:
            return [
                ...state,
                issue(undefined, action)
            ];

        case REMOVE_ISSUE:
        case UPDATE_ISSUE:
        case SET_ISSUE_HANDLED:

        default:
            return state;
    }
}