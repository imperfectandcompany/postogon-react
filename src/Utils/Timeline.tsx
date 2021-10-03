import axios from "axios";

import { getToken } from "./Common";


// get public post data
export const getPublicPosts = () => {
const token = getToken();
axios.get(`https://api.postogon.com/posts?token=${token}`).then(response => {
  sessionStorage.setItem('feedOnePosts', response.data);
}).catch(error => {
  console.log("nay");
});
}

//set public post data
export const setPublicPosts = () => {
  const feedPosts = sessionStorage.getItem('feedOnePosts');
  if (feedPosts) return feedPosts;
  else return null;
}