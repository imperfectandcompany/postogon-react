import { PostsStore } from "../data/PostsStore";
import { getToken } from "./Common";

export const fetchPosts = async () => {

    const feeds = ["public", "private"];
    var posts:any = [];

    feeds.forEach( async feed => {
        posts = await fetchPostsByFeed(feed);
            PostsStore.update(s => {s.posts = posts});
    });

    return posts;
}

const fetchPostsByFeed = async (feed: string) => {
    const token = getToken();
    const response = await fetch(`https://api.postogon.com/posts/public?token=${token}&feed=${feed}`);
    const data = await response.json();
    return data;
}

