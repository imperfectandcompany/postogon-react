import { useState } from 'react';
import { getUser, getEmail } from '../../Utils/Common'
import Post from '../Feed/Post';
import { LockOpenIcon as LockOOutline, LockClosedIcon as LockCOutline, LockClosedIcon } from '@heroicons/react/outline'

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

   <h1 className="sr-only">Recent posts</h1>

<div className="flex">
{feed == "public" ? <div className="flex"><button className="hover:bg-gray-100 hover:text-blue-600 font-bold ripple-bg-white text-blue-500 select-none py-4 px-6 border-b border-gray-200 block cursor-default" onClick={()=> {hook("public")}}>Public</button> <button className="hover:bg-gray-100 hover:text-blue-600 py-4 px-6 text-gray-500 border-b border-gray-200 block select-none" onClick={()=> {hook("private")}}>Private</button></div> : <div className="flex"><button className="hover:bg-gray-100 hover:text-blue-600  py-4 px-6 text-gray-500 border-b border-gray-200 block" onClick={()=> {hook("public")}}>Public</button> <button className="hover:bg-gray-100 ripple-bg-white select-none  cursor-default hover:text-blue-600 font-bold text-blue-500 py-4 px-6 border-b border-gray-200 block select-none" onClick={()=> {hook("private")}}>Private</button></div>}

</div>
<Post feed={feed}></Post>

</div>

</div>
    );
}

export default Home;