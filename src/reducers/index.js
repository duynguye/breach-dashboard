import { combineReducers } from 'redux';

// Import Reducers
import connectionReducer from './reducer_connection';

const reducers = combineReducers({
    connected: connectionReducer
});

export default reducers;