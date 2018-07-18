import React, { Component } from 'react';
import classnames from 'classnames';

// Components
import Title from '../../components/title/title';
import Notification from '../../components/notification/notification';
import Overlay from '../../components/overlay/overlay';

// Styles
import { container, header } from './container_header.scss';

class HeaderContainer extends Component {
    render () {
        return (
            <div className={classnames('container-fluid', container)}>
                <div className={classnames('row', header)}>
                    <Title>EMM</Title>
                    <Notification>@digital diva is handling SRP-45694 - Coalition of Interlock Ignition Manufacturers</Notification>
                </div>

                <Overlay />
            </div>
        );
    }
}

export default HeaderContainer;