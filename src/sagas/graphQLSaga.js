import { eventChannel } from 'redux-saga';
import { all, call, put, take, takeEvery } from 'redux-saga/effects';
import gql from 'graphql-tag';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';

import awsconfig from 'aws-exports';
import { getTournament, getActiveTournament } from 'graphql/queries';
import { updateActiveTournament } from '../graphql/mutations';
import { onUpdateActiveTournament } from '../graphql/subscriptions';

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: awsconfig.aws_appsync_apiKey,
  }
});

function buildPayouts( {
    payout1, payout2, payout3, payout4, payout5, payout6, payout7, payout8, payout9 } ) {
    var payouts = [
        payout1,
        payout2,
        payout3,
        payout4,
        payout5,
        payout6,
        payout7,
        payout8,
        payout9
    ];
    payouts = payouts.filter( value => {
        return value > 0;
    } );
    if ( payouts.reduce( ( a, b ) => a + b, 0 ) !== 100 ) {
        payouts = [ 100 ];
    }
    return payouts;
}

function fetchActiveTournamentInfo( tournament ) {
  return new Promise( ( resolve, reject ) => {
    client.query({
      query: gql( getTournament ),
      fetchPolicy: 'network-only',
      variables: {
        id: tournament.tournamentId
      }
    }).then( result => {
      const { id, ...tournamentInfo } = result.data.getTournament;
      tournament = {
        ...tournament,
        tournamentId: id,
        ...tournamentInfo
      };
      resolve( tournament );
    });
  });
}

function fetchActiveTournament() {
  return new Promise( ( resolve, reject ) => {
    client.query({
      query: gql( getActiveTournament ),
      fetchPolicy: 'network-only',
      variables: {
        id: process.env.REACT_APP_TOURNAMENT_ID
      }
    }).then( result => {
      const {
        data: {
          getActiveTournament: {
            id,
            tournamentId,
            currentLevelIndex,
            numberOfEntrants,
            numberOfPlayersRemaining,
            numberOfRebuys,
            state,
            ...payouts
          }
        }
      } = result;
      let tournament = {
            id,
            tournamentId,
            currentLevelIndex,
            numberOfEntrants,
            numberOfPlayersRemaining,
            numberOfRebuys,
            state,
      };
      tournament.payouts = buildPayouts( payouts );
      resolve( tournament );
    });
  });
}

function* fetchTournament() {
  const tournament = yield fetchActiveTournament()
  .then( result => fetchActiveTournamentInfo( result ));
  yield put( { type: 'UPDATE_TOURNAMENT', update: tournament } );
}

function subscribeToTournament() {
  return eventChannel( emitter => {
    client.subscribe( { query: gql( onUpdateActiveTournament ),
      variables: {
        id: process.env.REACT_APP_TOURNAMENT_ID
      }})
      .subscribe({
        next: ({
          data: {
            onUpdateActiveTournament: {
            currentLevelIndex,
            numberOfEntrants,
            numberOfPlayersRemaining,
            numberOfRebuys,
            state
          }
        },
        data: {
          onUpdateActiveTournament
        }
      }) => {
        var payouts = buildPayouts( onUpdateActiveTournament );
        var update = {
          currentLevelIndex: currentLevelIndex,
          numberOfEntrants: numberOfEntrants,
          numberOfPlayersRemaining: numberOfPlayersRemaining,
          numberOfRebuys: numberOfRebuys,
          payouts: payouts,
          state: state
        };
        return emitter( { type: 'UPDATE_TOURNAMENT', update: update } )
      }
    });
    return () => {
    }
  });
}

function dbUpdateTournament( update ) {
  var variables = {};
  variables.input = { ...update.update };
  variables.input.id = update.update.id;
  client.mutate({
    mutation: gql( updateActiveTournament ),
    variables: variables
  })
  .then( result => {
    console.log( 'results of mutation: ', result );
  })
  .catch( console.error );
}

export function* graphQLSubscriptionSaga() {
  const channel = yield call( subscribeToTournament );
  while ( true ) {
    const action = yield take( channel );
    yield put( action );
  }
}

export function* graphQLSaga() {
  yield all([
    takeEvery( 'FETCH_TOURNAMENT', fetchTournament ),
    takeEvery( 'DB_UPDATE_TOURNAMENT', dbUpdateTournament )
  ]);
}
