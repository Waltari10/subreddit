
interface Post {
    title: string;
    id: string;
    numComments: number;
    created: number;
    score: number;
    isLocked: boolean;
    author: string; // author name
    authorId: string;
    postId: string;
    upvoteRatio: number;
    viewCount: number;
    goldCount: number;
    id: string;
    isSponsored: boolean;
    permalink: string;
    flair: Array<Flair>;
    thumbnail: Thumbnail;
}

interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

interface Subreddit {
    posts: Record<string, Post>;
    postIds: Array<string>;
    listingSort: string;
    subRedditAboutInfo: Record<string, SubredditAboutInfo>;
}


interface SubredditAboutInfo {
    accountsActive: number;
    publicDescription: string;
    subscribers: number;
    created: number;
}


interface Flair {
    text: string; 
    type: string; // Text (what else?) 
    textColor: string; // dark /what else
    backgroundColor: string; // hex"#edeff1"
    templateId: string; //"f70d1f56-bba7-11e9-adb0-0e7eae8dcdb0"
}

  