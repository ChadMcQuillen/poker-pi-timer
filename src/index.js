import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TimerTickService from './core/timer-tick-service';
import GraphQLTournamentService from './core/graphql-tournament-control-service';
import Tournament from './core/tournament';
import TournamentBoardView from './components/tournament-board';
import * as serviceWorker from './serviceWorker';

var tournament = new Tournament( new TimerTickService(), new GraphQLTournamentService() );
tournament.tournament.subscribe(
    value => {
        if ( value.hasOwnProperty( 'tournamentInfo' ) ) {
            ReactDOM.render(<TournamentBoardView tournament = { value } />, document.getElementById('root'));
        }
    }
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
