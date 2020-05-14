import { createSelector } from 'reselect';

const getPostIds = (state: any) => state.reddit.subreddit?.postIds || [];
const getPosts = (state: any) => state.reddit.subreddit?.posts || [];


export const selectPostsArray = createSelector(
  getPostIds,
  getPosts,
  (postIds, posts) => {

    if (!postIds || !posts) {
      return [];
    }

    return postIds.map((id: string) => posts[id]);
  },
);