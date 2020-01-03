import React from 'react';
import styles from '../tournament.module.css';

const TournamentLevelView = ( { levelTitle, level } ) => (
  <div>
    <div className = { styles.title }>
      <div className = { styles.child }>{ levelTitle }</div>
    </div>
    <div className = { styles.text }>
      <div className = { styles.child }>{ level }</div>
    </div>
  </div>
);

export default TournamentLevelView;
