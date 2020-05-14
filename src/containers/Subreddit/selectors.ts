import { createSelector } from 'reselect';

const getPosts = (state: any) => state.reddit.subreddit?.data?.children || [];
const getRequestStatus = (state: any) => state.reddit.getSubredditRequestStatus;


export const selectPostsArray = createSelector(
  getPosts,
  getRequestStatus,
  // RequestStatus included here in order to make FlatList Data change on request status change so it's rerendered
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (posts, requestStatus) => {

    if (!posts) {
      return [];
    }
    return posts.map((post: PostDTO) => post.data);
  },
);