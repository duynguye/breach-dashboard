import { combineReducers } from 'redux';

// Import Reducers
import connectionReducer from './reducer_connection';
import updateReducer from './reducer_update';

const reducers = combineReducers({
    connected: connectionReducer,
    lastUpdate: updateReducer
});

export default reducers;