import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlug, faBolt } from '@fortawesome/pro-solid-svg-icons';

// Custom Styles
import { container, active } from './updates.scss';

const Updates = ({ time, isActive }) => {
    const lastTime = moment(time).format('h:mm A');
    let timeDifference = '';

    if (moment().isSame(moment(time), 'd')) {
        timeDifference = 'Today';
    }

    return (
        <div className={classnames(container, isActive ? active : '')}>
            <span>Last Update</span>
            <p>{timeDifference} / {lastTime} <FontAwesomeIcon icon={isActive ? faPlug : faBolt} /></p>
        </div>
    )
};

export default Updates;