import { useState } from 'react';
import Posts from '../Feed/Posts';
import { } from '@heroicons/react/outline'

 function Home() {

  const [feed, setFeed] = useState("public");

  const hook = (feed: string) => {
    setFeed(feed);
  }

  return (
<div>

<div className="">

   <h1 className="sr-only">Recent posts</h1>

<div className="flex">
{feed === "public" ? <div className="flex"><button className="hover:bg-gray-100 hover:text-blue-600 font-bold ripple-bg-white text-blue-500 select-none py-4 px-6 border-b border-gray-200 block cursor-default" onClick={()=> {hook("public")}}>Public</button> <button className="hover:bg-gray-100 hover:text-blue-600 py-4 px-6 text-gray-500 border-b border-gray-200 block select-none" onClick={()=> {hook("private")}}>Private</button></div> : <div className="flex"><button className="hover:bg-gray-100 hover:text-blue-600  py-4 px-6 text-gray-500 border-b border-gray-200 block" onClick={()=> {hook("public")}}>Public</button> <button className="hover:bg-gray-100 ripple-bg-white select-none  cursor-default hover:text-blue-600 font-bold text-blue-500 py-4 px-6 border-b border-gray-200 block select-none" onClick={()=> {hook("private")}}>Private</button></div>}

</div>
<Posts feed={feed} type="timeline"></Posts>

</div>

</div>
    );
}

export default Home;