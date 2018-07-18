import React, { Component } from 'react';
import classnames from 'classnames';

// Custom Components
import BackgroundImage from '../../components/background_image/background_image';
import Overlay from '../../components/overlay/overlay';

// Custom Styles
import { container, content } from './container_body.scss';

class BodyContainer extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className={classnames('container-fluid', container)}>
                <BackgroundImage src={'/images/generic-background.jpg'} />
                <Overlay />

                <div className={classnames('row', content)}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default BodyContainer;