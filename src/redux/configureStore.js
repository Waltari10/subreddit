/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import { rootReducer, sagas } from '../ducks';

const sagaMiddleware = createSagaMiddleware();

function configureStoreProd(initialState) {
  const middlewares = [sagaMiddleware];

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(sagas);

  return store;
}

function configureStoreDev(initialState) {
  const middlewares = [
    reduxImmutableStateInvariant(),
    sagaMiddleware,
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  sagaMiddleware.run(sagas);

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./rootReducer', () => {
  //     const nextRootReducer = require('./rootReducer').default; // eslint-disable-line global-require
  //     store.replaceReducer(nextRootReducer);
  //   });
  // }

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
