import React from 'react';
import styles from './tournament-blinds.module.css';

class TournamentBlindsView extends React.Component {
    render() {
        return (
          <div>
            <div className = { styles.title }>
              <div className = { styles.child }>Blinds</div>
            </div>
            <div className = { styles.text }>
              <div className = { styles.child }>$5 / $10</div>
            </div>
          </div>
        );
    }
}

export default TournamentBlindsView;
