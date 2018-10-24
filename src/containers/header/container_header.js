import React, { Component } from 'react';
import { connect } from 'react-redux';
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
                    <Title>{ this.props.title }</Title>
                    <Notification></Notification>
                </div>

                <Overlay />
            </div>
        );
    }
}

const mapStateToProps = ({ title }) => ({
    title
});

export default connect(mapStateToProps, null)(HeaderContainer);