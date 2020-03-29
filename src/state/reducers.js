import { combineReducers } from 'redux'

import { entitiesReducer } from './entities/reducers';

export const rootReducer = combineReducers({
  entities: entitiesReducer
});
