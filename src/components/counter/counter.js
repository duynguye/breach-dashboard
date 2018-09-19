import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/pro-regular-svg-icons';

// Custom Stlyes
import { container } from './counter.scss';

const Counter = ({ total, direction }) => {
    return (
        <div className={container}>
            <FontAwesomeIcon icon={ direction === 'up' ? faArrowUp : faArrowDown } className={ direction === 'up' ? 'up' : 'down' } />
            <h1 style={{ fontSize: '20rem', fontWeight: 100 }}>{total}</h1>
        </div>
    );
};

export default Counter;
