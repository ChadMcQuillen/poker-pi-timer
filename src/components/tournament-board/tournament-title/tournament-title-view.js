import React from 'react'
import styles from './tournament-title-view.module.css'

class TournamentTitleView extends React.Component {
    render() {
        return (
          <div>
            <div className={styles.title}>
              <div className={styles.child}>Friday Night Poker</div>
            </div>
            <div className={styles.description}>
              <div className={styles.child}>$20 Buy-In (1 Re-Buy Through Level 5)</div>
            </div>
          </div>
        )
    }
}

export default TournamentTitleView
