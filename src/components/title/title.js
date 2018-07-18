import React from 'react';
import classnames from 'classnames';

// Custom Style
import { title } from './title.scss';

const Title = ({ children }) => (
    <div className={classnames('col-sm-3', title)}>
        <h1>{children}</h1>
    </div>
);

export default Title;