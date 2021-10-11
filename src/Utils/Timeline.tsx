import axios from "axios";

import { getToken } from "./Common";
import { useState, useCallback } from 'react'

export function useForceUpdate() {
  const [, setTick] = useState(0);
  const update = useCallback(() => {
    setTick(tick => tick + 1);
  }, [])
  return update;
}

//set public post data
export const setPosts = async (token: string, feed: string) => {
  await axios.get(`https://api.postogon.com/posts/public?token=${token}&feed=${feed}`).then(response => {
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