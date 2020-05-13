import { all } from 'redux-saga/effects';
import { Reducer } from 'redux';
import { combineReducers } from 'redux';

import reddit from './reddit';

export const rootReducer = combineReducers({
  reddit: reddit.reducer, 
  // Add reducers for each duck here
});


// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* sagas() {
  yield all([
    reddit.saga(),
    // Add sagas for each duck here
  ]);
}