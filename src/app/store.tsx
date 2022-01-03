import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'
import postReducer from "../features/post/postSlice"
import postogonApi from './services/postogon'
import thunk from "redux-thunk";
import { apiSlice } from '../features/api/apiSlice';


 export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [postogonApi.reducerPath]: postogonApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    post: postReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})



export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch




