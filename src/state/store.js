import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from 'state/reducers';

const middlewares = [ thunk ];

const store = createStore( rootReducer, applyMiddleware( ...middlewares ));

store.subscribe( () => console.log( store.getState() ));

export default store;
