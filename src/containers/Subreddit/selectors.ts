import { createSelector } from 'reselect';

const getPosts = (state: any) => state.reddit.subreddit?.data?.children || [];


export const selectPostsArray = createSelector(
  getPosts,
  (posts) => {

    if (!posts) {
      return [];
    }

    return posts.map((post: PostDTO) => post.data);
  },
);