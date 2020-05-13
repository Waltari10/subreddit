import * as React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Icon from 'react-native-vector-icons/Octicons';

// const myIcon = <Icon name="rocket" size={30} color="#900" />;


import { 
  StyleSheet, Text, View, Image, StyleProp, ImageStyle, 
} from 'react-native';

export interface SubredditComponentProps {
  getSubreddit: Function;
  subreddit: Subreddit;
  getSubredditRequestStatus?: string;
  postsArr: Array<Post>; // Array of posts
}

interface PostProps {
  post: Post;
}

function Post({ post }: PostProps) {


  const imgStyle: StyleProp<ImageStyle> = { 
    marginTop: 16, 
    alignSelf: 'flex-end', 
    width: post.thumbnail?.width, 
    height: post.thumbnail?.height,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(35, 142, 55)',
    borderRadius: 4,
    marginBottom: 16,
  };

  return (
    <View style={styles.item}>

      <View style={styles.scoreContainer}>
        <Icon name="arrow-up" size={20} color="#878a8c" />
        <Text style={styles.score}>{post.score}</Text>
        <Icon name="arrow-down" size={20} color="#878a8c" />
      </View>

      <View 
        style={{ flex: 1, flexShrink: 1 }}
      >
        <Text style={styles.postedBy}>Posted by {post.author} {formatDistanceToNow(post.created)} ago</Text>
        <Text style={styles.title}>
          {post.flair.length !== 0 && (
            <Text
              style={{
                // color: post.flair[0].textColor,
                backgroundColor: post.flair[0].backgroundColor,
                borderRadius: 16,
                fontSize: 12,
                paddingTop: 4,
                paddingBottom: 4,
                marginRight: 4,
                paddingRight: 8,
                paddingLeft: 8,
                fontWeight: '700',
              }}
            >{post.flair[0].text}</Text>
          )}  
          {post.title}
        </Text>

        <View style={styles.commentContainer}>
          <Icon style={styles.commentIcon} name="comment" size={16} color="#878a8c" />
          <Text style={styles.comments}>{post.numComments} comments</Text>
        </View>
      </View>

      <Image
        style={imgStyle}
        source={{
          uri: post.thumbnail?.url,
        }}  
      ></Image>
    </View>
  );
}


const styles = StyleSheet.create({
  commentIcon: {
    marginRight: 4,
  },
  commentContainer: {
    flexDirection: 'row',
  },
  scoreContainer: {
    flexDirection: 'column',
    paddingRight: 14,
    alignContent: 'center',
    alignItems: 'center',
    width: 40
  },
  postedBy: {
    color: 'rgb(120, 124, 126)',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 8
  },
  comments: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgb(135, 138, 140)',
    marginBottom: 8
  },
  score: {
    fontsize: 12,
    fontWeight: '700'
  },
  item: {
    maxWidth: 800,
    flexDirection: "row",
    backgroundColor: 'white',
    padding: 0,
    paddingLeft: 14,
    paddingTop: 8,
    paddingRight: 8,
    marginVertical: 4,
    marginHorizontal: 24,
    borderWidth: 1,
    borderRadius: 4,
    borderStyle: 'solid',
    borderColor: '#ccc'
  },
  title: {
    flexDirection: 'column',
    flex: 1, 
    flexWrap: 'wrap',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8
  },
});

export default Post;