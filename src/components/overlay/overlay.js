import React from 'react';
import classnames from 'classnames';

// Custom Styles
import { overlayContainer, overlay } from './overlay.scss';

const Overlay = () => (
    <div className={classnames('row', overlayContainer)}>
        <div className={classnames('col-sm-7 offset-sm-1', overlay)}></div>
    </div>
);

export default Overlay;