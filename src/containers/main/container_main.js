import React, { Component } from 'react';
import ProgressBar from 'progressbar.js';

// Import Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setConnectionStatus } from '../../actions';

// Import Containers
import HeaderContainer from '../header/container_header';
import BodyContainer from '../body/container_body';
import FooterContainer from '../footer/container_footer';
import CounterContainer from '../counter/container_counter';

// Import Components
import Issues from '../../components/issues/issues';

// Custom Styles
import { container, progressBar, loadingText, loadingScreen } from './container_main.scss';

// Constants
const __PING__ = 0x9;
const __PONG__ = 0xA;
const __AUTH__ = 0x1b;
const __LOGIN__ = 0x1c;
const __SUCCESS__ = 0x1d;
const __FAILED__ = 0x1e;

class MainContainer extends Component {
    constructor (props) {
        super(props);

        this.container = React.createRef();
        this.progress = '';
        this.heartbeat;
        this.socket;

        this.state = {
            isLoading: true
        };
    }

    componentDidMount () {
        // Setup Progress Bar
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

        this.initializeConnection();
    }

    initializeConnection () {
        // Try and establish a connection to the server.
        let socket = new WebSocket('wss://localhost:8443/');

        // Loading Screen
        socket.addEventListener('open', (event) => {
            console.log('Server connected!');
            this.props.setConnectionStatus(true);
        });

        // Ping the server every minute
        this.heartbeat = setInterval(() => {
            if (this.socket) {
                let payload = {
                    type: __PING__,
                    id: 1
                };

                socket.send(JSON.stringify(payload));
            }
        }, 1000);

        socket.addEventListener('message', (event) => {
            let data = JSON.parse(event.data);
            
            // Listen for Authentication Requests
            if (data.type === __AUTH__) {
                let url_params = new URLSearchParams(window.location.search);

                // This will send relevant information to the Server and tell it which location it is at.
                const credentials = {
                    type: __LOGIN__,
                    location: url_params.get('id'),
                    key: 'ABCDEFGHIJKLMNOP'
                };

                socket.send(JSON.stringify(credentials));
            }

            // Listen to success
            if (data.type === __SUCCESS__) {
                this.progress.animate(1, {}, () => {
                    this.setState({
                        isLoading: false
                    }, () => this.props.setConnectionStatus(true));
                })
            }

            // Listen for the heartbeat
            if (data.type === __PONG__) {

            }
        });

        socket.addEventListener('close', (event) => {
            this.props.setConnectionStatus(false);

            setTimeout(() => {
                console.log('Attempting Connection');
                this.initializeConnection();
            }, 10000);
        });
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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setConnectionStatus }, dispatch);
}

export default connect(null, mapDispatchToProps)(MainContainer);