import React, { Component } from 'react';

// Import Containers
import HeaderContainer from '../header/container_header';
import BodyContainer from '../body/container_body';
import FooterContainer from '../footer/container_footer';

class MainContainer extends Component {
    render () {
        return (
            <div style={{ height: '100%' }}>
                <HeaderContainer />

                <BodyContainer>
                    
                </BodyContainer>

                <FooterContainer />
            </div>
        );
    }
}

export default MainContainer;