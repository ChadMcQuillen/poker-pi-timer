import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TournamentBoardView from './components/tournament-board';
import * as serviceWorker from './serviceWorker';
import gql from 'graphql-tag';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from './aws-exports';
import { getTournament } from './graphql/queries';

const client = new AWSAppSyncClient( {
    url: awsconfig.aws_appsync_graphqlEndpoint,
    region: awsconfig.aws_appsync_region,
    auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: awsconfig.aws_appsync_apiKey,
    }
} );

client.query( {
    query: gql( getTournament ),
    variables: {
        id: process.env.REACT_APP_TOURNAMENT_ID
    }
} ).then( ( { data: { getTournament } } ) => {
    ReactDOM.render(<TournamentBoardView tournamentInfo = { getTournament } />, document.getElementById('root'));
} );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
