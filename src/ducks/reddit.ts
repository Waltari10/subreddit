import { createReducer, createAction } from "@reduxjs/toolkit";
import { takeEvery, call, put, select } from "redux-saga/effects";

import * as constants from "../constants";

export const createPayload = (payload: any): any => ({ payload });

export const getSubredditError = createAction("GET_SUBREDDIT_ERROR", createPayload);
export const getSubredditSuccess = createAction("GET_SUBREDDIT_SUCCESS", createPayload);
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

    if (state.subreddit !== null) {


      const existingChildren = state.subreddit.data.children;
      
      const newChildren = action.payload.data.children;

      const combinedChildren = [...existingChildren, ...newChildren];

      state.subreddit = {
        ...state.subreddit,
        ...action.payload,
        data: {
          ...action.payload.data,
          children: combinedChildren
        }
      }

    } else {
      state.subreddit = action.payload;
    }
  },
  [getSubreddit.toString()]: (state: State) => {
    state.getSubredditRequestStatus = constants.LOADING;
  },
});

const fetchSubreddit = async (subredditId: string, after: string): Promise<any> => {
  const res = await fetch(
    "http://www.reddit.com/r/" + subredditId + "/hot/.json?after=" + after,
    {
      body: null,
      method: "GET",
    }
  );

  const jsonRes = await res.json();

  return jsonRes;
};

function* handleGetSubredditStart({ payload } : { payload: string }) {


  const after = yield select((state) => state.reddit?.subreddit?.data?.after || '');

  try {
    const data = yield call(fetchSubreddit, payload, after);
    yield put(getSubredditSuccess(data));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
    yield put(getSubredditError(e));
  }
}

function* watchGetSubreddit(): Generator<any, any, any> {
  yield takeEvery(getSubreddit.toString(), handleGetSubredditStart);
}


export default {
  reducer,
  saga: watchGetSubreddit,
  api: {
    fetchSubreddit
  }
};
