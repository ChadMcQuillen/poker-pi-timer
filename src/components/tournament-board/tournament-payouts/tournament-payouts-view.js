import React from 'react';
import styles from './tournament-payouts.module.css';

class TournamentPayoutsView extends React.Component {
    render() {
        return (
          <ul className = { styles.payouts }>
            <li className = { styles.payout }>1st:  $120</li>
            <li className= { styles.payout }>2nd:  $60</li>
            <li className = { styles.payout }>3rd:  $20</li>
          </ul>
        );
    }
}

export default TournamentPayoutsView;
