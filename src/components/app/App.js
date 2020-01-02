import React from 'react';
import './App.css';
import TimerTickService from '../../core/timer-tick-service';
import GraphQLTournamentService from '../../core/graphql-tournament-control-service';
import Tournament from '../../core/tournament';
import TournamentBoardView from '../tournament-board';

class App extends React.Component {
    constructor( props ) {
        super( props );
        this.state = { };
    }

    componentDidMount() {
        this.tournament = new Tournament( new TimerTickService(), new GraphQLTournamentService() );
        this.tournament.tournament.subscribe(
            value => {
                var newState = { ...this.state, ...value };
                this.setState( newState );
            }
        )
    }

    render() {
        if ( this.state.description == null ) {
            return (
              <div>Loading...</div>
            )
        } else {
            const {
                title,
                description,
                buyIn,
                rebuyAmount,
                rebuyThroughLevel,
                levelsAndBreaks,
                currentLevelIndex,
                numberOfEntrants,
                numberOfPlayersRemaining,
                numberOfRebuys,
                payouts,
                secondsRemaining
            } = this.state;
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
