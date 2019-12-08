import React from 'react';
import styles from '../tournament.module.css';

class TournamentLevelView extends React.Component {
    render() {
        const levelTitle = this.props.levelTitle;
        const level = this.props.level;
        return (
          <div>
            <div className = { styles.title }>
              <div className = { styles.child }>{ levelTitle }</div>
            </div>
            <div className = { styles.text }>
              <div className = { styles.child }>{ level }</div>
            </div>
          </div>
        );
    }
}

export default TournamentLevelView;
