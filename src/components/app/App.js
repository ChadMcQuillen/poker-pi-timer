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
            return (
              <TournamentBoardView tournament = { this.state.tournament } />
            );
        }
    }
}

export default App;
