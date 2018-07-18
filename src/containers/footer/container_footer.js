import React, { Component } from 'react';
import classnames from 'classnames';

// Custom Components
import Overlay from '../../components/overlay/overlay';
import Branding from '../../components/branding/branding';

// Custom Styles
import { container } from './container_footer.scss';

class FooterContainer extends Component {
    render () {
        return (
            <div className={classnames('container-fluid', container)}>
                <Overlay />

                <div className='row'>
                    <div className='col-sm-8'>Pagination</div>
                    <div className='col-sm-4'>
                        <div>Last Updates</div>
                        <Branding logo='images/jira-white.svg' />
                    </div>
                </div>
            </div>
        )
    }
}

export default FooterContainer;