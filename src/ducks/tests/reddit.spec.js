import reddit, * as actions from '../reddit';
import { expectSaga } from 'redux-saga-test-plan';
// import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';


describe('reddit sagas', () => {

  it('Should test fetch subreddit', () => {

    const subreddit = {
      posts: []
    }

    return expectSaga(reddit.saga)
      .withReducer(reddit.reducer)

      // Mock fetchReddit
      .provide([[
        matchers.call.fn(reddit.api.fetchSubreddit), subreddit,
      ]])

      // Dispatch action for saga
      .dispatch(actions.getSubreddit())

      // Final output
      .hasFinalState({
        getSubredditRequestStatus: 'SUCCESS',
        subreddit,
      })

      .run();
  });

});
