import React from 'react';
import styles from './tournament-payouts.module.css';

const places = [ '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th' ];

function mapPayouts( pot, payoutPercentages ) {
    var sum = 0;

    var payouts = payoutPercentages.map( function( payoutPercentage, i ) {
        var amount = Math.floor( 1.0 * pot * payoutPercentage / 100 );
        sum += amount;
        return {
            amount: amount,
            remainder: ( pot * payoutPercentage ) % 1,
            originalIndex: i,
        };
    } );

    // sort by remainder then amount
    if ( sum !== pot ) {
        var parts = payouts.sort( function( a, b ) {
            if ( a.remainder === b.remainder ) {
                return ( a.amount < b.amount ) ? -1 : ( a.amount > b.amount ) ? 1 : 0;
            } else {
                return ( a.remainder < b.remainder ) ? -1 : 1;
            }
        } ).reverse();

        var diff = pot - sum;
        var i = 0;
        while ( i < diff ) {
            parts[ i ].amount++;
            i++;
        }

        payouts = payouts.sort( function( a, b ) {
            return a.originalIndex - b.originalIndex;
        } );
    }
    payouts = payouts.map( payout => payout.amount );

    return payouts.map( function( payout, i ) {
        return <li className = { styles.payout } key = { i }>{ places[ i ] }:  ${ payout }</li>;
    } );
}

class TournamentPayoutsView extends React.Component {
    render() {
        const pot = this.props.pot;
        const payoutPercentages = this.props.payoutPercentages;
        return (
          <ul className = { styles.payouts }>
            { mapPayouts( pot, payoutPercentages ) }
          </ul>
        );
    }
}

export default TournamentPayoutsView;
