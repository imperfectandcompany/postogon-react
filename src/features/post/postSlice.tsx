import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { getToken } from '../../utils/Common';
import api from "../../utils/API";
import axios from 'axios';
import { useGetTimelineFeedQuery } from '../api/apiSlice';
import { useAppSelector } from '../../app/hooks';



// Define the Post type
export interface IPost {
  posts: [];
  PostId: number;
  PostBody: string;
  IsLiked: boolean;
  PostedBy: string;
  PostedOn: number;
  Likes: number;
  Comments: number;
}



export interface PostState {
  readonly posts: IPost[],
  readonly loadedPosts: IPost[],
  perPage: number,
  lastPosition: number,
  feed: fetchPostsFeed,
  isLoading: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined
}

export enum fetchPostsType{
  TIMELINE='TIMELINE',
  PROFILE='PROFILE',
  ID='ID'
}

export enum fetchPostsFeed {
  PUBLIC = 'public',
  PRIVATE = 'private',
  result = "result"
}

// Define the initial state using that type
export const initialState: PostState = {
  posts: [],
  loadedPosts: [],
  lastPosition: 8,
  feed: fetchPostsFeed.PUBLIC,
  perPage: 8,
  isLoading: true,
  status: 'idle',
  error: null
}

export const fetchPosts =  createAsyncThunk('posts/fetchPosts', async (feed:any) => {
  const response = await axios.get(`https://api.postogon.com/posts/public?token=${getToken()}&feed=${feed}`)
  return response.data
})

export const postSlice = createSlice({
  name: 'post',
  /*state represents the state of the store
  initial value is the initial state of the
  application
  */
  initialState,
  /*we don't edit the store directly, there is a process:
  first dispatch the action into the reducer
  then we look at the action and change the state
  on that store based on the action
  passed in the reducer so the store knows which
  */
  reducers: {
    startLoading: state => {
      state.isLoading = true;
    },
    stopLoading: state => {
      state.isLoading = false;
    },    
    changeFeed: (state, action) => {
      state.feed = action.payload;
    },  
    loadPosts: state => {
      //take the previous value of loadedposts and add the last position by the next 8 (basically the next page) to get the next set of posts
      state.loadedPosts = [...state.loadedPosts, ...state.posts.slice(state.lastPosition, state.lastPosition + state.perPage)]
    },
    updatePosition: state => {
      //keep track of the last position
      state.lastPosition = state.lastPosition + state.perPage;
      //after position is updated, set loading as false
      state.isLoading = false;      
    },        
    hasError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateLike: (state, action) => {
      const postId  = action.payload;
      const existingPost = state.loadedPosts.find(post => post.PostId === postId);
      if (existingPost) {
        existingPost.IsLiked ? existingPost.Likes-- : existingPost.Likes++;
        existingPost.IsLiked= !existingPost.IsLiked;
      }
    },
    getPosts: (state, action: PayloadAction<IPost>) => {
      state.posts.push(action.payload);
    },
  },
    extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = state.posts.concat(action.payload)
      //initialize post position in case of refresh
      state.lastPosition = state.perPage;
      //all posts
      state.posts = action.payload; 
      //sort by earliest timestamp for chronological order!
      state.posts = state.posts.sort((x, y) => y.PostedOn - x.PostedOn);
      //get the first 8 posts
      state.loadedPosts = state.posts.slice(0, state.perPage);
      state.isLoading = false;        
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})




// Action creators are generated for each case reducer function
export const { updateLike, loadPosts, changeFeed, updatePosition, startLoading, stopLoading, hasError } = postSlice.actions

export default postSlice.reducer

export const selectAllPosts = (state: RootState) => state.post.posts;


/*action is just a javascript object
Normally type is in caps and is descriptive
what is type meant to do? We want to like a post
then we have an optional load of data

Business requirements:
    Data needed when a user likes a post:
        The ID of the user (retrievable from authedcontext.tsx)
        The ID of the post (retrievable from the post)
    Logic and validation:
        To be added----

const postAction = { type: 'LIKE_POST', postId: 1, User: 1}
*/

/*take the store created above and use
 the dispatch() method and pass the actual action
 we want to dispatch, in this case postAction
 postAction is then sent to the reducer
 */
