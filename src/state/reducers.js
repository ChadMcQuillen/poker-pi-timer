import { combineReducers } from 'redux'

import { tournamentSlice } from 'state/entities/tournamentSlice';

export const rootReducer = combineReducers({
  entities: tournamentSlice.reducer
});
