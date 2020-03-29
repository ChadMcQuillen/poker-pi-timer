import { all } from 'redux-saga/effects';

import { graphQLSaga } from './graphQLSaga';
import { slideShowSaga } from './slideShowSaga';
import { timerSaga } from './timerSaga';
import { tournamentSaga } from './tournamentSaga';

export function* rootSaga() {
  yield all([
    graphQLSaga(),
    slideShowSaga(),
    timerSaga(),
    tournamentSaga()
  ]);
};
