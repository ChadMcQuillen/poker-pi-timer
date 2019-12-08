import React from 'react';
import styles from './tournament-timer.module.css';

class TournamentTimerView extends React.Component {
    render() {
        return (
          <div className = { styles.text }>
            <div className = { styles.child }>20:00</div>
          </div>
        );
    }
}

export default TournamentTimerView;
