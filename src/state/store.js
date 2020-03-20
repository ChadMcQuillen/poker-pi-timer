import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk';

import { rootReducer } from 'state/reducers';
import { rootSaga } from 'sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [ thunk, sagaMiddleware ];

const store = createStore( rootReducer, applyMiddleware( ...middlewares ));

store.subscribe( () => console.log( store.getState() ));

sagaMiddleware.run( rootSaga );

export default store;
