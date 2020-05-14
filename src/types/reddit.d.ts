

interface Subreddit {
    kind: string;
    data: SubredditData;
    after: string;
    before: string;
    dist: number;
    subRedditAboutInfo: Record<string, SubredditAboutInfo>;
}

interface SubredditData {
    children: Array<PostDTO>;
}


interface SubredditAboutInfo {
    accountsActive: number;
    publicDescription: string;
    subscribers: number;
    created: number;
}

interface PostDTO {
    kind: string;
    data: PostData;
}


interface PostData {
    id: string;
    subreddit: string;
    title: string;
    subreddit_name_prefixed: string;
    thumbnail_height: number;
    upvote_ratio: number;
    thumbnail_width: number;
    score: number;
    thumbnail: string;
    created: number; 
    num_comments: number;
    author: string;
    created_utc: number;
    link_flair_text: string;
    link_flair_type: string;
    link_flair_background_color: string;
}
