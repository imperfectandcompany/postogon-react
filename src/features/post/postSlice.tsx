import { ActionCreator, createAsyncThunk, createSlice, Dispatch, PayloadAction, ThunkAction } from '@reduxjs/toolkit'
import axios from 'axios';
import type { RootState } from '../../app/store'
import { getToken } from '../../utils/Common';
import api from "../../utils/API";



// Define the Post type
export interface IPost {
  PostId: number;
  PostBody: string;
  PostedBy: string;
  Likes: number;
}

interface PostState {
  readonly posts: IPost[];
  liked: boolean,
  isLoading: boolean
  error: boolean;
}

// Define the initial state using that type
const initialState: PostState = {
  posts: [],
  liked: false,
  isLoading: false,
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
    usersSuccess: (state, action) => {
      state.posts = action.payload;
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

// Action creators are generated for each case reducer function
export const { updateLike, usersSuccess, startLoading, hasError } = postSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const selectIsLiked = (state: RootState) => state.post.liked
export default postSlice.reducer

//thunk to  handle side effects, if userSuccess goes through then it will return a new object in the reducer
export const fetchPosts = () => async (dispatch:Dispatch) => {
  const token = getToken();
  const feed = "public";
  dispatch(startLoading());
  try {
    await api.get(`/posts/public?token=${token}&feed=${feed}`)
      .then((response: { data: IPost; }) => dispatch(usersSuccess(response.data)))
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
