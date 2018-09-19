import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPauseCircle, faPause } from '@fortawesome/pro-regular-svg-icons';
import moment from 'moment';

// Custom Styles
import { container, issue, ticket, station, status, inactive, inprogress } from './issues.scss';

const Issue = ({ srp, pod, callLetters, running, handled, remaining }) => {
    let negative = (remaining < 0);
    let duration = moment.duration(Math.abs(remaining), 'milliseconds');
    let output = '';

    if (duration.asDays() >= 1) {
        output += `${Math.ceil(duration.asDays())}d `;
    }

    output += `${duration.hours()}hr `;
    
    if (duration.asDays() < 1) {
        output += `${duration.minutes()}m`;
    }

    return (
        <div className={issue}>
            <div className={classnames(ticket, handled ? inprogress : '' )}>
                <span>Ticket Number</span>
                <p>SRP-{srp}</p>
            </div>

            <div className={station}>
                <span>POD / Station</span>
                <p>{pod} {callLetters}</p>
            </div>

            <div className={classnames(status, running ? '' : inactive )}>
                { running ? <FontAwesomeIcon icon={faClock} /> : <FontAwesomeIcon icon={faPauseCircle} /> }
                <p>{ negative ? `-${output}` : output }</p>
            </div>
        </div>
    );
};

class Issues extends Component {
    constructor (props) {
        super(props);

        console.log('Issues module loaded');
    }

    render () {
        const issues = this.props.issues.map((issue) => {
            return <Issue srp={issue.srp} key={issue._id} pod={issue.pod} callLetters={issue.station} handled={issue.handled} running={!issue.isPaused} remaining={issue.remaining} />;
        });

        return (
            <div className={classnames('col-sm-7 offset-sm-1', container)}>
                { issues }
            </div>
        );
    }
}

const mapStateToProps = ({ issues }) => ({
    issues
});

export default connect(mapStateToProps, null)(Issues);