import React from 'react'
import styles from './tournament-next-level.module.css'

class TournamentNextLevelView extends React.Component {
    render() {
        return (
          <div className={styles.text}>
            <div className={styles.child}>Next Level:  $10 / $20</div>
          </div>
        )
    }
}

export default TournamentNextLevelView
