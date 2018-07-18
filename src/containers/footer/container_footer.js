import React, { Component } from 'react';
import classnames from 'classnames';

// Custom Components
import Overlay from '../../components/overlay/overlay';
import Branding from '../../components/branding/branding';
import Updates from '../../components/updates/updates';
import Pagination from '../../components/pagination/pagination';

// Custom Styles
import { container, contentRight, wrapper } from './container_footer.scss';

class FooterContainer extends Component {
    render () {
        return (
            <div className={classnames('container-fluid', container)}>
                <Overlay />

                <div className={classnames('row', wrapper)}>
                    <Pagination total={4} current={2} />

                    <div className={classnames('col-sm-4', contentRight )}>
                        <Updates time={new Date()} isActive={true} />
                        <Branding logo='images/jira-white.svg' />
                    </div>
                </div>
            </div>
        )
    }
}

export default FooterContainer;