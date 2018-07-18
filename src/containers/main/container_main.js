import React, { Component } from 'react';

// Import Containers
import HeaderContainer from '../header/container_header';
import BodyContainer from '../body/container_body';
import FooterContainer from '../footer/container_footer';
import CounterContainer from '../counter/container_counter';

// Import Components
import Issues from '../../components/issues/issues';

// Custom Styles
import { container } from './container_main.scss';

class MainContainer extends Component {
    render () {
        return (
            <div className={container}>
                <HeaderContainer />

                <BodyContainer>
                    <Issues />
                    <CounterContainer />
                </BodyContainer>

                <FooterContainer />
            </div>
        );
    }
}

export default MainContainer;