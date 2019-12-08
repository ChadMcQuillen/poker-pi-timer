import React from 'react';
import styles from '../tournament.module.css';

class TournamentPlayersView extends React.Component {
    render() {
        const numberOfPlayersRemaining = this.props.numberOfPlayersRemaining;
        return (
          <div>
            <div className = { styles.title }>
              <div className = { styles.child }>Players In</div>
            </div>
            <div className = { styles.text }>
              <div className = { styles.child }>{ numberOfPlayersRemaining }</div>
            </div>
          </div>
        );
    }
}

export default TournamentPlayersView;
