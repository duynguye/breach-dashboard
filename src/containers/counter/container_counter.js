import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

// Custom Component
import Counter from '../../components/counter/counter';

// Custom Styles
import { container } from './container_counter.scss';

class CounterContainer extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className={classnames('col-sm-4', container)}>
                <Counter total={this.props.issues.length} direction='down' />
            </div>
        );
    }
}

const mapStateToProps = ({ issues }) => ({
    issues
});

export default connect(mapStateToProps, null)(CounterContainer);