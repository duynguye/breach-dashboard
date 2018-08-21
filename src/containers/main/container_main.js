import React, { Component } from 'react';
import ProgressBar from 'progressbar.js';

// Import Containers
import HeaderContainer from '../header/container_header';
import BodyContainer from '../body/container_body';
import FooterContainer from '../footer/container_footer';
import CounterContainer from '../counter/container_counter';

// Import Components
import Issues from '../../components/issues/issues';

// Custom Styles
import { container, progressBar, loadingText, loadingScreen } from './container_main.scss';

class MainContainer extends Component {
    constructor (props) {
        super(props);

        this.container = React.createRef();
        this.progress = '';

        this.state = {
            isLoading: true
        };
    }

    componentDidMount () {
        // Loading Screen
        if (this.state.isLoading) {
            this.progress = new ProgressBar.Line(this.container.current, {
                strokeWidth: 5,
                easing: 'easeInOut',
                duration: 4000,
                color: '#f84c00',
                trailColor: '#6d7c7c',
                trailWidth: 5,
                svgStyle: null
            });
    
            this.progress.path.setAttribute('stroke-linecap', 'round');
            this.progress.animate(1, {}, () => {
                this.setState({ isLoading: false });
            });
        }

        // Try and establish a connection to the server.
        const socket = new WebSocket('ws://apperture-dashboard.herokuapp.com:5000/');

        socket.addEventListener('open', (event) => {
            console.log('Server connected!');
            socket.send('Hello!');
        });

        // If the server connects, request the first set of data.

        // If the server fails to connect, continue showing the loading screen.
    }

    render () {
        if (this.state.isLoading) {
            return (
                <div className={loadingScreen}>
                    <h1 className={loadingText}>Loading</h1>
                    <div className={progressBar} ref={this.container}></div>
                </div>
            );

        } else {
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
}

export default MainContainer;