import React from 'react';
import styles from './css/tournament-title-view.module.css';

export const TournamentTitleView = ( { title, description } ) => (
  <React.Fragment>
    <div className = { styles.title }>
      <div className= { styles.child }>{ title }</div>
    </div>
    <div className = { styles.description }>
      <div className= { styles.child }>{ description }</div>
    </div>
  </React.Fragment>
);
