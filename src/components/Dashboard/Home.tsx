import { getUser, getEmail } from '../../Utils/Common'
import Post from '../Feed/Post';


const user = {
  name: getUser(),
  email: getEmail(),
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

 function Home(props: { history: string[]; }) {
  return (
<div>

<div className="mt-4">
    Posts
   <h1 className="sr-only">Recent posts</h1>
<Post></Post>
</div>

</div>
    );
}

export default Home;