import React from 'react';
import styles from './css/tournament.module.css';

export const TournamentPlayersView = ( { numberOfPlayersRemaining } ) => (
  <React.Fragment>
    <div className = { styles.title }>
      <div className = { styles.child }>Players In</div>
    </div>
    <div className = { styles.text }>
      <div className = { styles.child }>{ numberOfPlayersRemaining }</div>
    </div>
  </React.Fragment>
);
