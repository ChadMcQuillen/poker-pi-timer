import { delay, put, select } from 'redux-saga/effects';

import { getDisplayIndex,
         getImages,
         slideShowSlice } from 'state/entities/slideShowSlice';
import { getTournament } from 'state/entities/tournamentSlice';

export function* slideShowSaga() {
  while ( true ) {
    yield delay( 60000 );
    let tournament = yield select( getTournament );
    if ( tournament.state === 'loading' ) {
      let displayIndex = yield select( getDisplayIndex );
      let images = yield select( getImages );
      displayIndex += 1;
      if ( displayIndex === images.length ) {
        displayIndex = 0;
      }
      yield put( slideShowSlice.actions.updateDisplayIndex( { displayIndex: displayIndex } ) );
    } else {
      break;
    }
  }
}
