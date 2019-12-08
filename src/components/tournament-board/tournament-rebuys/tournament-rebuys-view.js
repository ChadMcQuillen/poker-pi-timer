import React from 'react';
import styles from '../tournament.module.css';

class TournamentRebuysView extends React.Component {
    render() {
        return (
          <div>
            <div className = { styles.title }>
              <div className = { styles.child }>Rebuys</div>
            </div>
            <div className = { styles.text }>
              <div className = { styles.child }>0</div>
            </div>
          </div>
        );
    }
}

export default TournamentRebuysView;
