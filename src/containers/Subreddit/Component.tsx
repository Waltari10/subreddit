import React, { useEffect, useCallback } from 'react';
import { 
  StyleSheet, Text, View, Button,
  ActivityIndicator,
  FlatList
} from 'react-native';
import Component from './Component';
import Post from '../../components/Post';


import * as constants from '../../constants';


export interface SubredditComponentProps {
  getSubreddit: Function;
  subreddit: Subreddit;
  getSubredditRequestStatus?: string;
  postsArr: Array<Post>; // Array of posts
}

const SubredditComponent: React.SFC<SubredditComponentProps> = ({ 
  getSubreddit,
  subreddit,
  getSubredditRequestStatus,
  postsArr,
}) => {
  
  useEffect(() => {
    getSubreddit('ClimateActionPlan');
  }, [])

  return (
    <View style={styles.container}>

      {
        getSubredditRequestStatus === constants.LOADING && <ActivityIndicator size={100}></ActivityIndicator>
      }
      {
        getSubredditRequestStatus === constants.SUCCESS && (
          <FlatList
            style={styles.list}
            data={postsArr}
            renderItem={({ item }) => <Post post={item} />}
            keyExtractor={item => item.id}
          >
          </FlatList>
        )
      }
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    backgroundColor: '#e8f9ea',
    width: '100%',
    height: '100%',
    alignContent: 'center',
    alignItems: 'center'
  },
  list: {
    width: '100%',
    maxWidth: 800,
  }
});


export default SubredditComponent;

