import React from 'react'
import styles from '../tournament.module.css'

class TournamentLevelView extends React.Component {
    render() {
        return (
          <div>
            <div className={styles.title}>
              <div className={styles.child}>Level</div>
            </div>
            <div className={styles.text}>
              <div className={styles.child}>1</div>
            </div>
          </div>
        )
    }
}

export default TournamentLevelView
