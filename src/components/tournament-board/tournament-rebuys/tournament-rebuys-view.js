import React from 'react';
import styles from '../tournament.module.css';

const TournamentRebuysView = ( { numberOfRebuys } ) => (
  <div>
    <div className = { styles.title }>
      <div className = { styles.child }>Rebuys</div>
    </div>
    <div className = { styles.text }>
      <div className = { styles.child }>{ numberOfRebuys }</div>
    </div>
  </div>
);

export default TournamentRebuysView;
