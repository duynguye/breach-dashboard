import React, { Component } from 'react';

// Import Containers
import HeaderContainer from '../header/container_header';

class MainContainer extends Component {
    render () {
        return (
            <div>
                <HeaderContainer />

                <div>
                    <h1>Body Container</h1>
                    <h1>Counter Component</h1>
                    
                    <img style={{ width: 225 }} src={'./images/jira-white.svg'} />
                </div>

                <h1>Footer Placeholder</h1>
            </div>
        );
    }
}

export default MainContainer;