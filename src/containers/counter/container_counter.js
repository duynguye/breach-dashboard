import React, { Component } from 'react';
import classnames from 'classnames';

// Custom Component
import Counter from '../../components/counter/counter';

// Custom Styles
import { container } from './container_counter.scss';

class CounterContainer extends Component {
    render () {
        return (
            <div className={classnames('col-sm-4', container)}>
                <Counter />
            </div>
        );
    }
}

export default CounterContainer;