import React from 'react';
import styles from '../tournament.module.css';

class TournamentEntriesView extends React.Component {
    render() {
        const numberOfEntries = this.props.numberOfEntries;
        return (
          <div>
            <div className = { styles.title }>
              <div className = { styles.child }>Entries</div>
            </div>
            <div className = { styles.text }>
              <div className = { styles.child }>{ numberOfEntries }</div>
            </div>
          </div>
        );
    }
}

export default TournamentEntriesView;
