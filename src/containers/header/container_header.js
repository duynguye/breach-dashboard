import React, { Component } from 'react';

// Components
import Title from '../../components/title/title';
import Notification from '../../components/notification/notification';

class HeaderContainer extends Component {
    render () {
        return (
            <div className='container'>
                <div className='row'>
                    <Title>EMM</Title>
                    <Notification>@natalie is handling SRP-45694</Notification>
                </div>
            </div>
        );
    }
}

export default HeaderContainer;