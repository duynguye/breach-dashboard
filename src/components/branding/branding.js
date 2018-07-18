import React from 'react';

// Custom Styles
import { container } from './branding.scss';

const Branding = ({ logo }) => (
    <div className={container}>
        <span>Powered By</span>
        <img src={logo} />
    </div>
);

export default Branding;