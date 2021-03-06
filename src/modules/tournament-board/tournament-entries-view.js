import React from 'react';
import styles from './css/tournament.module.css';

export const TournamentEntriesView = ( { numberOfEntries } ) => (
  <React.Fragment>
    <div className = { styles.title }>
      <div className = { styles.child }>Entries</div>
    </div>
    <div className = { styles.text }>
      <div className = { styles.child }>{ numberOfEntries }</div>
    </div>
  </React.Fragment>
);
