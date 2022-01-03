import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


interface Post {
  id: number
  name: string
}
type PostsResponse = Post[]

export const postogonApi = createApi({
  reducerPath: 'postogonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://postogon.com/' }),
  endpoints: builder => ({
    checkIfUserExistsByUsername: builder.query({
      query: (name: string) => `user?username=${name}`}),
  }),
})


export const { useCheckIfUserExistsByUsernameQuery } = postogonApi
export default postogonApi
