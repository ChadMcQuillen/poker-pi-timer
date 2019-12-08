import React from 'react';
import styles from '../tournament.module.css';

class TournamentRebuysView extends React.Component {
    render() {
        const numberOfRebuys = this.props.numberOfRebuys;
        return (
          <div>
            <div className = { styles.title }>
              <div className = { styles.child }>Rebuys</div>
            </div>
            <div className = { styles.text }>
              <div className = { styles.child }>{ numberOfRebuys }</div>
            </div>
          </div>
        );
    }
}

export default TournamentRebuysView;
