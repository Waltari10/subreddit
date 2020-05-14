import React, { useEffect } from 'react';
import { 
  StyleSheet, View,
  ActivityIndicator,
  FlatList
} from 'react-native';
import Post from '../../components/Post';


import * as constants from '../../constants';


export interface SubredditComponentProps {
  getSubreddit: Function;
  subreddit: Subreddit;
  getSubredditRequestStatus?: string;
  postsArr: Array<PostData>; // Array of posts
}

const SubredditComponent: React.SFC<SubredditComponentProps> = ({ 
  getSubreddit,
  getSubredditRequestStatus,
  postsArr,
}) => {
  
  useEffect(() => {
    getSubreddit('ClimateActionPlan');
  }, [])

  return (
    <View style={styles.container}>

      {
        (
          getSubredditRequestStatus === constants.LOADING &&
          postsArr.length === 0
        )&& (
          <ActivityIndicator style={styles.loadingIndicator} size={100}/>
        )
      }
      {
        postsArr.length !== 0 && <FlatList
          refreshing={getSubredditRequestStatus === constants.LOADING}
          style={styles.list}
          data={postsArr}
          renderItem={({ item }) => <Post post={item} />}
          keyExtractor={item => item.id}
          bounces={false}
          onEndReachedThreshold={0.2}
          onEndReached={() => {
            // Doesn't work on expo browser...
              if (getSubredditRequestStatus !== constants.LOADING) {
                getSubreddit('ClimateActionPlan')
              }
          }}
        >
        </FlatList>
      }
    </View>
  );
}
 
const styles = StyleSheet.create({
  loadingIndicator: {
    position: 'absolute',
    top: '40%',
  },
  container: {
    // paddingTop: 8,
    backgroundColor: '#e8f9ea',
    width: '100%',
    height: '100%',
    alignContent: 'center',
    alignItems: 'center'
  },
  list: {
    width: '100%',
    height: '100%',
    maxWidth: 800,
  }
});


export default SubredditComponent;

