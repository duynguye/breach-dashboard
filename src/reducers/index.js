import { combineReducers } from 'redux';

// Import Reducers
import connectionReducer from './reducer_connection';
import updateReducer from './reducer_update';
import issueReducer from './reducer_issue';

const reducers = combineReducers({
    connected: connectionReducer,
    lastUpdate: updateReducer,
    issues: issueReducer
});

export default reducers;