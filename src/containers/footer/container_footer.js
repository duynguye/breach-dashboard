import React, { Component } from 'react';
import classnames from 'classnames';

// Redux
import { connect } from 'react-redux';

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
                    <Pagination total={5} current={3} />

                    <div className={classnames('col-sm-4', contentRight )}>
                        <Updates time={new Date()} isActive={this.props.connected} />
                        <Branding logo={'/images/jira-white.svg'} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ connected }) => ({
    connected
});

export default connect(mapStateToProps)(FooterContainer);