import { delay, put, select, take } from 'redux-saga/effects';

import { getTournament } from 'state/entities/tournamentSlice';

export function* timerSaga() {
  while ( yield take( 'START_TIMER' ) ) {
    while ( true ) {
      yield delay( 1000 );
      let tournament = yield select( getTournament );
      if ( tournament.state === 'running' ) {
        yield put( { type: 'TIMER_TICK' } );
      } else {
        break;
      }
    }
  }
}
