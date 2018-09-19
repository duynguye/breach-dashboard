import { ADD_ISSUE, REMOVE_ISSUE, UPDATE_ISSUE, SET_ISSUE_HANDLED } from '../constants/action_types';

export const addIssue = (issue) => ({
    type: ADD_ISSUE,
    issue
});

export const removeIssue = (srp) => ({
    type: REMOVE_ISSUE,
    srp
});

export const setIssueHandled = (srp, handled) => ({
    type: SET_ISSUE_HANDLED,
    srp,
    handled
});