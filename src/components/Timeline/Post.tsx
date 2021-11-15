import { useParams } from 'react-router';
import Posts from '../Feed/Posts';

type ProfileParams = {
    id: string;
};


function Post () {
    const { id }= useParams<ProfileParams>();


    return(
    <div><Posts type="id" feed="public" id={id}></Posts></div>
    )
  }

export default Post;