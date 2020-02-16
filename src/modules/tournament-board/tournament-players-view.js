import React from 'react';
import styles from './css/tournament.module.css';

export const TournamentPlayersView = ( { numberOfPlayersRemaining } ) => (
  <div>
    <div className = { styles.title }>
      <div className = { styles.child }>Players In</div>
    </div>
    <div className = { styles.text }>
      <div className = { styles.child }>{ numberOfPlayersRemaining }</div>
    </div>
  </div>
);
