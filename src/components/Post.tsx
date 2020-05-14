import * as React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Icon from 'react-native-vector-icons/Octicons';


import { 
  StyleSheet, Text, View, Image, StyleProp, ImageStyle,
  TextStyle, ViewStyle
} from 'react-native';

export interface SubredditComponentProps {
  getSubreddit: Function;
  subreddit: Subreddit;
  getSubredditRequestStatus?: string;
  postsArr: Array<PostData>; // Array of posts
}

interface PostProps {
  post: PostData;
}

function Post({ post }: PostProps) {

  const isFlair = !!post.link_flair_text;

  const imgStyle: StyleProp<ImageStyle> = { 
    marginTop: 4, 
    alignSelf: 'flex-start', 
    width: post.thumbnail_width, 
    height: post.thumbnail_height,
    borderWidth: 1,
    borderColor: 'rgb(35, 142, 55)',
    borderRadius: 4,
    marginBottom: 16,
  };

  const flairContainerStyle: StyleProp<ViewStyle> = isFlair ? {
    backgroundColor: post.link_flair_background_color || 'transparent',
    borderRadius: 40,
    paddingTop: 4,
    paddingBottom: 4,
    marginRight: 4,
    paddingRight: 8,
    paddingLeft: 8,
    overflow: 'hidden',
    alignSelf: 'flex-start'

  } : null;

  const flairStyle: StyleProp<TextStyle> = isFlair ? {
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden'
  } : null;

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
        <Text style={styles.postedBy}>Posted by {post.author} {formatDistanceToNow(post.created * 1000)} ago</Text>
        
        {isFlair && (
          <View
            style={flairContainerStyle}
          >
            <Text
              style={flairStyle}
            >{post.link_flair_text}</Text>
          </View>
        )}  
        <Text style={styles.title}>
          {post.title}
        </Text>

        <View style={styles.commentContainer}>
          <Icon style={styles.commentIcon} name="comment" size={16} color="#878a8c" />
          <Text style={styles.comments}>{post.num_comments} comments</Text>
        </View>
      </View>

      {post.thumbnail && <Image
        style={imgStyle}
        source={{
          uri: post.thumbnail,
        }}  
      ></Image>}
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
    paddingRight: 4,
    alignContent: 'center',
    alignItems: 'center',
    width: 50
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
    fontSize: 12,
    fontWeight: '700'
  },
  item: {
    flexDirection: "row",
    backgroundColor: 'white',
    padding: 0,
    paddingLeft: 4,
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
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8
  },
});

export default Post;