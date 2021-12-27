import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface PostState {
    liked: boolean
  }

// Define the initial state using that type
const initialState: PostState = {
    liked: false
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
    updateLike: (state, action: PayloadAction<boolean>) => {
        state.liked = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { updateLike } = postSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const selectIsLiked = (state: RootState) => state.post.liked
export default postSlice.reducer


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
