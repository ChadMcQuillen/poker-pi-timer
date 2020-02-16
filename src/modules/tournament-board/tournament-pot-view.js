import React from 'react';
import styles from './css/tournament.module.css';

export const TournamentPotView = ( { pot } ) => (
  <div>
    <div className = { styles.title }>
      <div className = { styles.child }>Total Pot</div>
    </div>
    <div className = { styles.text }>
      <div className = { styles.child }>${ pot }</div>
    </div>
  </div>
);
