import { combineReducers } from 'redux';

// Import Reducers
import connectionReducer from './reducer_connection';
import updateReducer from './reducer_update';
import issueReducer from './reducer_issue';
import titleReducer from './reducer_title';

const reducers = combineReducers({
    connected: connectionReducer,
    lastUpdate: updateReducer,
    issues: issueReducer,
    title: titleReducer
});

export default reducers;