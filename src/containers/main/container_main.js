import React, { Component } from 'react';

// Import Containers
import HeaderContainer from '../header/container_header';
import BodyContainer from '../body/container_body';

class MainContainer extends Component {
    render () {
        return (
            <div>
                <HeaderContainer />

                <div>
                    <BodyContainer>
                        <h1>Body Container</h1>
                    </BodyContainer>
                    
                    <h1>Counter Component</h1>
                    
                    <img style={{ width: 225 }} src={'./images/jira-white.svg'} />
                </div>

                <h1>Footer Placeholder</h1>
            </div>
        );
    }
}

export default MainContainer;