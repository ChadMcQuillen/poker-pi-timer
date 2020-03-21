import { all, put, select, takeEvery } from 'redux-saga/effects';

import { getTournament, tournamentSlice } from 'state/entities/tournamentSlice';

function* timerTick() {
  let tournament = yield select( getTournament );
  let update = {
    secondsRemaining: tournament.secondsRemaining - 1
  }
  if ( update.secondsRemaining === 0 ) {
    if ( tournament.currentLevelIndex < tournament.levelsAndBreaks.length - 1 ) {
        update.currentLevelIndex = tournament.currentLevelIndex + 1;
        update.secondsRemaining = tournament.levelsAndBreaks[ tournament.currentLevelIndex ].levelTime * 60;
        const updateLevel = {
          id: tournament.id,
          currentLevelIndex: update.currentLevelIndex
        };
        yield put({
          type: 'DB_UPDATE_TOURNAMENT',
          update: updateLevel
        });
    } else {
        update.state = 'done';
    }
  }
  yield put( tournamentSlice.actions.update( update ) );
}

function* updateTournament( { update } ) {
  let tournament = yield select( getTournament );
  if ( update.state && update.state !== tournament.state ) {
    let stateTransition = tournament.state + '-to-' + update.state;
    switch ( stateTransition ) {
      case 'loading-to-pending':
        update.secondsRemaining = update.levelsAndBreaks[ 0 ].levelTime * 60;
        break;
      case 'pending-to-running':
      case 'paused-to-running':
        yield put( { type: 'START_TIMER' } );
        break;
      case 'running-to-paused':
      case 'pending-to-done':
      case 'running-to-done':
      case 'paused-to-done':
        // valid state transition, but no need to do anything
        break;
      default:
        console.log( 'invalid state transition:  ', stateTransition );
    }
    if ( tournament.currentLevelIndex && tournament.currentLevelIndex !== update.currentLevelIndex ) {
      update.secondsRemaining = tournament.levelsAndBreaks[ update.currentLevelIndex ].levelTime * 60;
    }
  }
  yield put( tournamentSlice.actions.update( update ) );
}

export function* tournamentSaga() {
  yield all([
    takeEvery( 'NEW_TOURNAMENT', updateTournament ),
    takeEvery( 'UPDATE_TOURNAMENT', updateTournament ),
    takeEvery( 'TIMER_TICK', timerTick )
  ]);

}
