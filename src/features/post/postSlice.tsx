import { ActionCreator, createAsyncThunk, createSlice, Dispatch, PayloadAction, ThunkAction } from '@reduxjs/toolkit'
import axios from 'axios';
import type { RootState } from '../../app/store'
import { getToken } from '../../utils/Common';
import api from "../../utils/API";
import { actionSheetController } from '@ionic/core';
import { State } from 'ionicons/dist/types/stencil-public-runtime';



// Define the Post type
export interface IPost {
  PostId: number;
  PostBody: string;
  PostedBy: string;
  Likes: number;
}

export interface PostState {
  readonly posts: IPost[];
  readonly loadedPosts: IPost[];
  lastPosition: number,
  perPage: number,
  liked: boolean,
  isLoading: boolean
  error: boolean;
  tempValue: [];
}

// Define the initial state using that type
export const initialState: PostState = {
  posts: [],
  loadedPosts: [],
  lastPosition: 8,
  perPage: 8,
  liked: false,
  isLoading: false,
  error: false,
  tempValue: []
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
    usersSuccess: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
      state.isLoading = false;
    },
    loadInitialPosts: (state, action: PayloadAction<IPost[]>) => {
      state.loadedPosts = action.payload.slice(0, state.perPage);      
    },
    updatePosts: (state, action: PayloadAction<IPost[]>) => {
    state.loadedPosts = action.payload;
    },
    setLastPosition: state => {
      state.lastPosition = state.lastPosition + state.perPage;
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

export enum fetchPostsFeed{
  PUBLIC='public',
  PRIVATE='private',
}

// Action creators are generated for each case reducer function
export const { updateLike, usersSuccess, startLoading, hasError, loadInitialPosts, setLastPosition, updatePosts } = postSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const selectIsLiked = (state: RootState) => state.post.liked
export default postSlice.reducer

//thunk to  handle side effects, if userSuccess goes through then it will return a new object in the reducer
export const fetchPosts = (type:fetchPostsType, feed?:fetchPostsFeed, id?:number, username?:string) => async (dispatch:Dispatch) => {
  const token = getToken();
  dispatch(startLoading());
  try {
    switch(type){
      case fetchPostsType.TIMELINE:
        await api.get(`/posts/public?token=${token}&feed=${feed}`)
        .then((response: { data: IPost[]; }) => dispatch(usersSuccess(response.data)))
        break;
      case fetchPostsType.PROFILE:
        await api.get(`/profile?username=${username}&feed=${feed}`)
        .then((response: { data: IPost[]; }) => dispatch(usersSuccess(response.data)))
        break;
      case fetchPostsType.ID:
        await api.get(`/posts?id=${id}`)
        .then((response: { data: IPost[]; }) => dispatch(usersSuccess(response.data)))
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
