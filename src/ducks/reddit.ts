import { createReducer, createAction } from "@reduxjs/toolkit";
import { takeEvery, all, call, put } from "redux-saga/effects";

import * as constants from "../constants";

export const createPayload = (payload: any): any => ({ payload });

export const getSubredditError = createAction(
  "GET_SUBREDDIT_ERROR",
  createPayload
);
export const getSubredditSuccess = createAction(
  "GET_SUBREDDIT_SUCCESS",
  createPayload
);
export const getSubreddit = createAction("GET_SUBREDDIT_START", createPayload);

interface State {
  subreddit?: Subreddit | any;
  getSubredditRequestStatus: string | null;
}

const initialState = {
  subreddit: null,
  getSubredditRequestStatus: null,
};

const reducer = createReducer(initialState, {
  [getSubredditError.toString()]: (state: State) => {
    state.getSubredditRequestStatus = constants.ERROR;
  },
  [getSubredditSuccess.toString()]: (state: State, action: any) => {
    state.getSubredditRequestStatus = constants.SUCCESS;
    state.subreddit = action.payload;
  },
  [getSubreddit.toString()]: (state: State) => {
    state.getSubredditRequestStatus = constants.LOADING;
  },
});

const fetchSubreddit = async (subredditId: string): Promise<any> => {
  const res = await fetch(
    "https://gateway.reddit.com/desktopapi/v1/subreddits/" + subredditId + "?rtj=only&redditWebClient=web2x&app=web2x-client-production&allow_over18=&include=identity%2Cprefs%2CprefsAccount%2CstructuredStyles%2CprefsSubreddit&geo_filter=PT&layout=card",
    {
      body: null,
      method: "GET",
    }
  );

  const jsonRes = await res.json();

  return jsonRes;
};

function* getSubredditStart({ payload } : { payload: string }) {
  try {
    const data = yield call(fetchSubreddit, payload);
    yield put(getSubredditSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(getSubredditError(e));
  }
}

function* watchGetSubreddit(): Generator<any, any, any> {
  yield takeEvery(getSubreddit.toString(), getSubredditStart);
}

function* saga(): Generator<any, any, any> {
  yield all([watchGetSubreddit()]);
}

export default {
  reducer,
  saga,
  api: {
    fetchSubreddit
  }
};
