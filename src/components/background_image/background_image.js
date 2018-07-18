import React from 'react';

// Custom Styles
import { container, background } from './background_image.scss';

const BackgroundImage = ({ src }) => (
    <div className={container}>
        <div className={background} style={{ backgroundImage: `url(${src})` }}></div>
    </div>
);

export default BackgroundImage;