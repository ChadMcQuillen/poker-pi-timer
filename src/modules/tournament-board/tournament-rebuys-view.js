import React from 'react';
import styles from './css/tournament.module.css';

export const TournamentRebuysView = ( { numberOfRebuys } ) => (
  <div>
    <div className = { styles.title }>
      <div className = { styles.child }>Rebuys</div>
    </div>
    <div className = { styles.text }>
      <div className = { styles.child }>{ numberOfRebuys }</div>
    </div>
  </div>
);
