import React, { Component } from 'react';
import classnames from 'classnames';
import ProgressBar from 'progressbar.js';
import { TweenLite } from 'gsap';

// Custom Styles
import { container, dot, active } from './pagination.scss';

class PaginationButton extends Component {
    constructor (props) {
        super(props);

        this.container = React.createRef();
        this.progress = '';
    }

    componentDidMount () {
        if (this.props.active) {
            setTimeout(() => {
                this.progress = new ProgressBar.Circle(this.container.current, {
                    strokeWidth: 11,
                    easing: 'easeInOut',
                    duration: 1400,
                    color: '#f84c00',
                    trailColor: '#6d7c7c',
                    trailWidth: 4,
                    svgStyle: null
                });
    
                this.progress.path.setAttribute('stroke-linecap', 'round');
                this.progress.animate(1);
            }, 1500);
        }
    }

    render () {
        return <div ref={this.container} className={classnames(dot, this.props.active ? active : '')}></div>;
    }
}

class Pagination extends Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {

    }

    componentDidUpdate () {

    }

    render () {
        return (
            <div className={classnames('col-sm-8', container)}>
                <PaginationButton />
                <PaginationButton active={true} />
                <PaginationButton />
                <PaginationButton />
            </div>
        )
    }
}

export default Pagination;