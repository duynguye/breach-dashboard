import React, { Component } from 'react';

// Custom Components
import BackgroundImage from '../../components/background_image/background_image';

class BodyContainer extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>
                <BackgroundImage src={'/images/generic-background.jpg'} />
                
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default BodyContainer;