import { useState } from 'react';
import { getUser, getEmail } from '../../Utils/Common'
import Post from '../Feed/Post';


const user = {
  name: getUser(),
  email: getEmail(),
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

 function Home(props: { history: string[]; }) {

  const [feed, setFeed] = useState("public");

  const hook = (feed: string) => {
    setFeed(feed);
  }

  return (
<div>

<div className="mt-4">
    Posts
    <br></br>
   <h1 className="sr-only">Recent posts</h1>
   <div>
     

<button onClick={()=> {hook("public")}}>Public Post</button>
<button onClick={()=> {hook("private")}}>Private Post</button>

</div>
<Post feed={feed}></Post>

</div>

</div>
    );
}

export default Home;