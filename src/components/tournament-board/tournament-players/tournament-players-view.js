import React from 'react';
import styles from '../tournament.module.css';

const TournamentPlayersView = ( { numberOfPlayersRemaining } ) => (
  <div>
    <div className = { styles.title }>
      <div className = { styles.child }>Players In</div>
    </div>
    <div className = { styles.text }>
      <div className = { styles.child }>{ numberOfPlayersRemaining }</div>
    </div>
  </div>
);

export default TournamentPlayersView;
