// Breach Dashboard
// -- This application will run from a monitor be responsible for display data received from the Server.
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// Import Core Font Awesome Library
import '@fortawesome/fontawesome-svg-core';

// Import Custom Styles
import './index.scss';

// Custom Imports
import MainContainer from './containers/main/container_main';

// Import All Reducers
import reducers from './reducers';

// Create the Store
const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <MainContainer />
    </Provider>
, document.getElementById('app'));