// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken } from '../../utils/Common'
import { fetchPostsFeed } from '../post/postSlice'


export interface Post {
  PostId: number;
  PostBody: string;
  PostedBy: string;
  PostedOn: number;
  Likes: number;
}

type PostsResponse = Post[]

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.postogon.com' }),
  tagTypes: ['Post'],
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getTimelineFeed: builder.query({
      // The URL for the request is 'https://api.postogon.com/posts/public?token=${getToken()}&feed=${feed}'
      query: (feed: fetchPostsFeed) => `/posts/public?token=${getToken()}&feed=${feed}`,
      transformResponse: (data: PostsResponse) => {
        return data},
      //list tags that describe the data in the query
      providesTags: ['Post']
    }),
    getPost: builder.query({
        query: postId => `/posts/${postId}`
    }),
    addNewPost: builder.mutation({
      query: initialPost => ({
        url: '/post',
        method: 'POST',
        // Include the entire post object as the body of the request
        body: initialPost
      }),
      //this basically says that the post tag is invalidated everytime a mutation happens
      invalidatesTags: ['Post']
    })    
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetTimelineFeedQuery, useAddNewPostMutation } = apiSlice