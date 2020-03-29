import { combineReducers } from 'redux'

import { slideShowSlice } from './slideShowSlice';
import { tournamentSlice } from './tournamentSlice';

export const entitiesReducer = combineReducers({
  slideShow: slideShowSlice.reducer,
  tournament: tournamentSlice.reducer
});
