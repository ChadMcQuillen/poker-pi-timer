import React from 'react';
import styles from './css/tournament.module.css';

export const TournamentLevelView = ( { levelTitle, level } ) => (
  <React.Fragment>
    <div className = { styles.title }>
      <div className = { styles.child }>{ levelTitle }</div>
    </div>
    <div className = { styles.text }>
      <div className = { styles.child }>{ level }</div>
    </div>
  </React.Fragment>
);
