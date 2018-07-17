// Breach Dashboard
// -- This application will run from a monitor be responsible for display data received from the Server.
import React from 'react';
import ReactDOM from 'react-dom';

// Import Core Font Awesome Library
import '@fortawesome/fontawesome-svg-core';

// Import Custom Styles
import './index.scss';

// Custom Imports
import MainContainer from './containers/main/container_main';

ReactDOM.render(
    <MainContainer />
, document.getElementById('app'));