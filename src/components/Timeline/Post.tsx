import { useParams } from 'react-router';
import { fetchPostsFeed, fetchPostsType } from '../../features/post/postSlice';
import Posts from '../Feed/Posts';

type ProfileParams = {
    id: string;
};


function Post () {
    const { id }= useParams<ProfileParams>();


    return(
    <div><Posts type={fetchPostsType.ID} feed={fetchPostsFeed.PUBLIC} id={id}></Posts></div>
    )
  }

export default Post;