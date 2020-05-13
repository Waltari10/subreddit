import React, { useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { selectPostsArray } from './selectors';
import Component from './Component';
import { getSubreddit } from '../../ducks/reddit';

const RedditContainer = () => {

  const dispatch = useDispatch();
  const subreddit: any = useSelector((state: any) => state.reddit.subreddit);
  const getSubredditRequestStatus: string = useSelector((state: any) => state.reddit.getSubredditRequestStatus);
  const postsArr = useSelector(selectPostsArray); 


  const fetchSubredditMemoized = useCallback(
    (subredditId: string) => dispatch(getSubreddit(subredditId)),
    [dispatch],
  );
  
  return (<Component 
    getSubreddit={fetchSubredditMemoized}
    subreddit={subreddit}
    getSubredditRequestStatus={getSubredditRequestStatus}
    postsArr={postsArr}
  />);
}
 
export default RedditContainer;

