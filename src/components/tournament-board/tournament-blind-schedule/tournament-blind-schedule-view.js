import React from 'react';
import styles from './tournament-blind-schedule.module.css';

class TournamentBlindScheduleView extends React.Component {
    render() {
        return (
          <table className = { styles.blindSchedule }>
            <tbody>
              <tr><td className = { styles.text }>Level 1</td></tr>
              <tr><td className = { styles.text }>$5 / $10</td></tr>
              <tr><td className = { styles.text }>Level 2</td></tr>
              <tr><td className = { styles.text }>$10 / $20</td></tr>
              <tr><td className = { styles.text }>Level 3</td></tr>
              <tr><td className = { styles.text }>$15 / $30</td></tr>
              <tr><td className = { styles.text }>Level 4</td></tr>
              <tr><td className = { styles.text }>$20 / $40</td></tr>
              <tr><td className = { styles.text }>Level 5</td></tr>
              <tr><td className = { styles.text }>$25 / $50</td></tr>
              </tbody>
          </table>
        );
    }
}

export default TournamentBlindScheduleView;
