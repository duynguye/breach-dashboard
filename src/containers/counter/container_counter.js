import React, { Component } from 'react';

class CounterContainer extends Component {
    render () {
        return (
            <div className='col-sm-4'>
                <span>^</span>
                <h1 style={{ fontSize: '20rem', fontWeight: 100 }}>17</h1>
            </div>
        );
    }
}

export default CounterContainer;