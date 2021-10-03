import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUser, getEmail, getToken } from '../../Utils/Common'
import { getPublicPosts, setPublicPosts } from '../../Utils/Timeline';


const user = {
  name: getUser(),
  email: getEmail(),
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}




function Post() {
   const [posts, setPosts] = useState<iPosts[]>([])
   const token = getToken();


   interface iPosts {
      PostId: number;
      PostBody: string;
      PostedBy: string;
      Likes: number;
  }
  
   const hook = () => {
      axios.get(`https://api.postogon.com/posts?token=${token}`).then(response => {
         console.log(response.data);
      }).catch(error => {
        console.log("nay");
      });
    }

useEffect(hook, [])
   
  return (
<div>
<button onClick={hook}>Get posss</button>
   <ul role="list" className="space-y-4">
   {posts && posts.length > 0 ? posts.map((post)=> 
      <li key={post.PostId} className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
         <article aria-labelledby="post-title-81614">
            <div>
               <div className="flex space-x-3">
                  <div className="flex-shrink-0"><img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt=""></img></div>
                  <div className="min-w-0 flex-1">
                     <p className="text-sm font-medium text-gray-900"><a href="#" className="hover:underline">{post.PostedBy}</a></p>
                     <p className="text-sm text-gray-500 select-none"><a href="#" className="hover:underline"><time>xxx</time></a></p>
                  </div>
                  <div className="flex-shrink-0 self-center flex">
                     <div className="relative inline-block text-left">
                        <div>
                           <button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600" id="headlessui-menu-button-4" type="button" aria-haspopup="true" aria-expanded="false">
                              <span className="sr-only">Open options</span>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                                 <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                              </svg>
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="mt-2 text-sm text-gray-700 space-y-4">
               <p>{post.PostBody}</p>
            </div>
            <div className="mt-6 flex justify-between space-x-8">
               <div className="flex space-x-6">
                  <span className="inline-flex items-center text-sm">
                     <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                           <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                        </svg>
                        <span className="font-medium text-gray-900">{post.Likes}</span><span className="sr-only">likes</span>
                     </button>
                  </span>
                  <span className="inline-flex items-center text-sm">
                     <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                           <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                        </svg>
                        <span className="font-medium text-gray-900">0</span><span className="sr-only">replies</span>
                     </button>
                  </span>
               </div>
               <div className="flex text-sm">
                  <span className="inline-flex items-center text-sm">
                     <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                           <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
                        </svg>
                        <span className="font-medium text-gray-900">Share</span>
                     </button>
                  </span>
               </div>
            </div>
         </article>
      </li>):null}
   </ul>
</div>
    );
}

export default Post;