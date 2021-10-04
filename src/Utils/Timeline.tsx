import axios from "axios";

import { getToken } from "./Common";


//set public post data
export const setPosts = (token: string, feed: string) => {
      axios.get(`https://api.postogon.com/posts/public?token=${token}&feed=${feed}`).then(response => {
        sessionStorage.setItem("feed"+feed+"posts", JSON.stringify(response.data));
      }).catch(error => {  
        console.log("nay");
      });
}

//get public post data
export const getPosts = (feed: string) => {
  const token = getToken();
  if (!token) {
    return;
  }
  setPosts(token, feed);
  console.log(feed +" posts set!")
  const feedPosts = sessionStorage.getItem("feed"+feed+"posts");
  if (feedPosts) return JSON.parse(feedPosts);
  else return null;
}