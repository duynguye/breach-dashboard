import React from 'react';

const Notification = ({ children }) => (
    <div className='col-sm-4 offset-sm-8'>
        <span>Breach Notifications</span>
        <p>{children}</p>
    </div>
);

export default Notification;