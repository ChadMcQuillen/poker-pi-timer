import { all } from 'redux-saga/effects';

import { graphQLSaga,
         graphQLWaitForTournamentSaga,
         graphQLSubscriptionSaga } from './graphQLSaga';
import { timerSaga } from './timerSaga';
import { tournamentSaga } from './tournamentSaga';

export function* rootSaga() {
  yield all([
    graphQLSaga(),
    graphQLWaitForTournamentSaga(),
    graphQLSubscriptionSaga(),
    timerSaga(),
    tournamentSaga()
  ]);
};
