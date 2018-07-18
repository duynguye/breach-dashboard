import React, { Component } from 'react';
import classnames from 'classnames';

// Components
import Title from '../../components/title/title';
import Notification from '../../components/notification/notification';

// Styles
import { container, header, overlayContainer, overlay } from './container_header.scss';

const Overlay = () => (
    <div className={classnames('row', overlayContainer)}>
        <div className={classnames('col-sm-7 offset-sm-1', overlay)}>
            
        </div>
    </div>
);

class HeaderContainer extends Component {
    render () {
        return (
            <div className={classnames('container-fluid', container)}>
                <div className={classnames('row', header)}>
                    <Title>EMM</Title>
                    <Notification>@natalie is handling SRP-45694</Notification>
                </div>

                <Overlay />
            </div>
        );
    }
}

export default HeaderContainer;