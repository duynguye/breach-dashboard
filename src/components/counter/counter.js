import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/pro-regular-svg-icons';

// Custom Stlyes
import { container } from './counter.scss';

const Counter = () => {
    return (
        <div className={container}>
            <FontAwesomeIcon icon={faArrowUp} />
            <h1 style={{ fontSize: '20rem', fontWeight: 100 }}>5</h1>
        </div>
    );
};

export default Counter;
