import React from 'react';
import './App.css';
import TimerTickService from '../../core/timer-tick-service';
import GraphQLTournamentService from '../../core/graphql-tournament-control-service';
import Tournament from '../../core/tournament';
import TournamentBoardView from '../tournament-board';

class App extends React.Component {
    constructor( props ) {
        super( props );

        this.loading = true;

        this.tournament = new Tournament( new TimerTickService(), new GraphQLTournamentService() );
        this.tournament.tournament.subscribe(
            value => {
                if ( value.hasOwnProperty( 'tournamentInfo' ) ) {
                    this.loading = false;
                    this.setState( { tournament: value } );
                }
            }
        )
    }

    render() {
        if ( this.loading ) {
            return (
              <div>Loading...</div>
            )
        } else {
            const {
                tournamentInfo: {
                    title,
                    description,
                    buyIn,
                    rebuyAmount,
                    rebuyThroughLevel,
                    levelsAndBreaks
                },
                currentLevelIndex,
                numberOfEntrants,
                numberOfPlayersRemaining,
                numberOfRebuys,
                payouts,
                secondsRemaining
            } = this.state.tournament;
            return (
              <TournamentBoardView
                title = { title }
                description = { description }
                buyIn = { buyIn }
                rebuyAmount = { rebuyAmount }
                rebuyThroughLevel = { rebuyThroughLevel }
                numberOfEntrants = { numberOfEntrants }
                numberOfPlayersRemaining = { numberOfPlayersRemaining }
                numberOfRebuys = { numberOfRebuys }
                currentLevelIndex = { currentLevelIndex }
                levelsAndBreaks = { levelsAndBreaks }
                payouts = { payouts}
                secondsRemaining = { secondsRemaining } />
            );
        }
    }
}

export default App;
