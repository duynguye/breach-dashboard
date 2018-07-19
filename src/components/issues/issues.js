import React, { Component } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPauseCircle, faPause } from '@fortawesome/pro-regular-svg-icons';
import moment from 'moment';

// Custom Styles
import { container, issue, ticket, station, status, inactive, inprogress } from './issues.scss';

const Issue = ({ srp, pod, callLetters, running, handled }) => (
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
            <p>2d 3hr</p>
        </div>
    </div>
);

class Issues extends Component {
    render () {
        return (
            <div className={classnames('col-sm-7 offset-sm-1', container)}>
                <Issue srp={'45694'} pod={4} callLetters={'KFOX'} handled={false} running={true} />
                <Issue srp={'49905'} pod={4} callLetters={'WBFF'} handled={false} running={false} />
                <Issue srp={'5505'} pod={4} callLetters={'WBMA'} handled={true} running={true} />
                <Issue srp={'44419'} pod={4} callLetters={'WLOS'} handled={false} running={false} />
            </div>
        );
    }
}

export default Issues;