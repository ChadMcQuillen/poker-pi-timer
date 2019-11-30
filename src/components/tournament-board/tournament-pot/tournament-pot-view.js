import React from 'react'
import styles from '../tournament.module.css'

class TournamentPotView extends React.Component {
    render() {
        return (
          <div>
            <div className={styles.title}>
              <div className={styles.child}>Total Pot</div>
            </div>
            <div className={styles.text}>
              <div className={styles.child}>$200</div>
            </div>
          </div>
        )
    }
}

export default TournamentPotView
