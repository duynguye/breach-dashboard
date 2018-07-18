import React from 'react';
import classnames from 'classnames';

// Styles
import { notificationContainer, title, content } from './notification.scss';

const Notification = ({ children }) => (
    <div className={classnames('col-sm-4 offset-sm-5', notificationContainer)}>
        <span className={title}>Breach Notifications:</span>
        <p className={content}>{children}</p>
    </div>
);

export default Notification;