import { eventChannel } from 'redux-saga';
import { all, call, put, take, takeEvery } from 'redux-saga/effects';
import gql from 'graphql-tag';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';

import awsconfig from 'aws-exports';
import { getTournament, getActiveTournament } from 'graphql/queries';
import { updateActiveTournament } from '../graphql/mutations';
import { onCreateActiveTournament,
         onUpdateActiveTournament } from '../graphql/subscriptions';

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

function subscribeToTournament( id ) {
  return eventChannel( emitter => {

    const observable = client.subscribe({
      query: gql( onUpdateActiveTournament ),
      variables: {
        id: id
      }
    });

    const processActiveTournamentUpdate = function( value ) {
      const {
        data: {
          onUpdateActiveTournament: {
            currentLevelIndex,
            numberOfEntrants,
            numberOfPlayersRemaining,
            numberOfRebuys,
            state,
            ...payouts
          }
        }
      } = value;
      let tournament = {
        currentLevelIndex,
        numberOfEntrants,
        numberOfPlayersRemaining,
        numberOfRebuys,
        state,
        payouts: buildPayouts( payouts )
      };
      emitter( { type: 'UPDATE_TOURNAMENT', update: tournament } );
    };

    observable.subscribe({
      next: processActiveTournamentUpdate,
      complete: console.log,
      error: console.log
    });

    return () => {}
  });
}

function subscribeToCreateTournament() {
  return eventChannel( emitter => {

    const observable = client.subscribe( { query: gql( onCreateActiveTournament ) } );

    const processActiveTournament = function( value ) {
      const {
        data: {
          onCreateActiveTournament: {
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
      } = value;
      let tournament = {
        id,
        tournamentId,
        currentLevelIndex,
        numberOfEntrants,
        numberOfPlayersRemaining,
        numberOfRebuys,
        state,
        payouts: buildPayouts( payouts )
      };
      fetchActiveTournamentInfo( tournament )
      .then( tournament => {
        emitter( { type: 'NEW_TOURNAMENT', update: tournament } );
      });
    };

    observable.subscribe({
      next: processActiveTournament,
      complete: console.log,
      error: console.log
    });

    return () => {}
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

export function* subscribeToTournamentUpdates( { update: { id } } ) {
  const channel = yield call( subscribeToTournament, id );
  while ( true ) {
    const action = yield take( channel );
    yield put( action );
  }
}

export function* graphQLSaga() {
  yield all([
    takeEvery( 'FETCH_TOURNAMENT', fetchTournament ),
    takeEvery( 'NEW_TOURNAMENT', subscribeToTournamentUpdates ),
    takeEvery( 'DB_UPDATE_TOURNAMENT', dbUpdateTournament )
  ]);
  const channel = yield call( subscribeToCreateTournament );
  while ( true ) {
    const action = yield take( channel );
    yield put( action );
  }
}
