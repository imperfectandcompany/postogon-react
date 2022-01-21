import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { getToken } from '../../utils/Common';
import api from "../../utils/API";



// Define the Post type
export interface IPost {
  PostId: number;
  PostBody: string;
  PostedBy: string;
  PostedOn: number;
  Likes: number;
}

export interface PostState {
  readonly posts: IPost[],
  readonly loadedPosts: IPost[],
  perPage: number,
  lastPosition: number,
  liked: boolean,
  isLoading: boolean
  error: boolean;
}

// Define the initial state using that type
export const initialState: PostState = {
  posts: [],
  loadedPosts: [],
  lastPosition: 8,
  perPage: 8,
  liked: false,
  isLoading: true,
  error: false
}

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
    fetchSuccess: (state, action: PayloadAction<IPost[]>) => {
      //initialize post position in case of refresh
      state.lastPosition = state.perPage;
      //all posts
      state.posts = action.payload; 
      //sort by earliest timestamp for chronological order!
      state.posts = state.posts.sort((x, y) => y.PostedOn - x.PostedOn);
      //get the first 8 posts
      state.loadedPosts = state.posts.slice(0, state.perPage);
      state.isLoading = false;
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
    updateLike: (state, action: PayloadAction<boolean>) => {
      state.liked = action.payload
    },
    getPosts: (state, action: PayloadAction<IPost>) => {
      state.posts.push(action.payload)
    },
  }
})


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

// Action creators are generated for each case reducer function
export const { updateLike, loadPosts, fetchSuccess, updatePosition, startLoading, stopLoading, hasError } = postSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const selectIsLiked = (state: RootState) => state.post.liked
export default postSlice.reducer

//thunk to  handle side effects, if userSuccess goes through then it will return a new object in the reducer
export const fetchPosts = (type:fetchPostsType, feed?:string, id?:number, username?:string) => async (dispatch:Dispatch) => {
  const token = getToken();
  dispatch(startLoading());
  try {
    switch(type){
      case fetchPostsType.TIMELINE:
        await api.get(`/posts/public?token=${token}&feed=${feed}`)
        .then((response: { data: IPost[]; }) => dispatch(fetchSuccess(response.data)))
        break;
      case fetchPostsType.PROFILE:
        await api.get(`/profile?username=${username}&feed=${feed}`)
        .then((response: { data: IPost[]; }) => dispatch(fetchSuccess(response.data)))
        break;
      case fetchPostsType.ID:
        await api.get(`/posts?id=${id}`)
        .then((response: { data: IPost[]; }) => dispatch(fetchSuccess(response.data)))
        break;        
    }
  } catch (err) {
    dispatch(hasError(err))
  }
}





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
