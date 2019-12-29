import React from 'react';
import styles from './tournament-timer.module.css';

function formatTime( value, showHours ) {
    var seconds = value % 60;
    value = Math.trunc( value / 60 );
    var minutes = value % 60;
    value = Math.trunc( value / 60 );
    var hours = value % 24;

    var timerText = ( showHours ? ( hours + ':' ) : '' ) +
                    ( minutes < 10 ? '0' : '' ) + minutes +
                    ':' +
                    ( seconds < 10 ? '0' : '' ) + seconds;
    return timerText;
}

class TournamentTimerView extends React.Component {
    render() {
        const secondsRemaining = this.props.secondsRemaining;
        const showHours = this.props.showHours;
        return (
          <div className = { styles.text }>
            <div className = { `${ secondsRemaining > 5 ? styles.child : styles.childRed }` }>
              { formatTime( secondsRemaining, showHours ) }
            </div>
          </div>
        );
    }
}

export default TournamentTimerView;
