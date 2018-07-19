import React from 'react';
import classnames from 'classnames';

// Styles
import { notificationContainer, title, content } from './notification.scss';

const Notification = ({ children }) => (
    <div className={classnames('col-sm-4 offset-sm-5', notificationContainer)}>
        <span className={title}>Breach Notifications:</span>
        <marquee className={content}><span>{children}</span></marquee>
    </div>
);

export default Notification;