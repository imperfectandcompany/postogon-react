import { useEffect, useState } from 'react';
import Posts from '../Feed/Posts';
import { getToken, getUser } from '../../Utils/Common';
import { useParams } from 'react-router';
import React from 'react';
import { NavLink } from 'react-router-dom';

import axios from 'axios';
import Loading from '../Loading/Loading';


type ProfileParams = {
    username: string;
};


export const RedirectToProfile = (props: { history: string[]; }) => {
    props.history.push('/profile/'+getUser());
}

function Profile () {

    const tabs = [
        { name: 'Posts', path: 'posts', current: true },
        { name: 'About', path: 'about', current: false },
      ]

    const [currentTab, setTab] = React.useState('Posts')
    const { username }= useParams<ProfileParams>();
    const [loading, setUserLoading] = useState(true);
    const [validUser, setValidUser] = useState(false);
    const [currentFeed, setFeed] = useState("public");

    const [isaContact, setContact] = useState(false);

    useEffect(() => {
        axios.get(`https://api.postogon.com/user?username=${username}`).then(response => {
            setValidUser(true);
            const token = getToken();
            axios.get(`https://api.postogon.com/user?contact=${username}&token=${token}`).then(response => {
              setContact(true);
            }).catch(error => {
              setContact(false);
            })
            setUserLoading(false);    
            console.log(isaContact);
            console.log("Valid profile loaded");
        }).catch(error => {
            setValidUser(false);
            setUserLoading(false);
            console.log("Error! Profile does not exist.");
        });
      }, []);



      if (!validUser && loading) {
        return <div className="content"><Loading></Loading></div>
      }

      function LoadPosts(){
        return(
            <div>
            <Posts feed={currentFeed} username={username} type="profile"></Posts></div>
        )
    }      

      function loadAbout(){
          return(
            <div className="sm:col-span-2 px-4">
            <dt className="text-sm font-medium text-gray-500">
              About
            </dt>
            <dd className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
              <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
              <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
            </dd>
          </div>
          )
      }

    return (
      <div>
          {validUser ?
         <div>
             <div>
         <div className="mx-auto flex items-center bg-gray-100 w-full">

<div className="flex justify-start w-1/2 text-sm">
    <ul className=" flex justify-between flex-1 md:flex-none items-center uppercase select-none items-baseline">
        <li className="mr-2">
            <a className="inline-block bg-white py-3 px-2 border-blue-600 border-b text-gray-800 no-underline font-medium leading-5 text-base cursor-default" href="post.html">Overview</a>
        </li>
        <li className="mr-2">
            <a className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:underline py-2 px-2" href="#">About</a>
        </li>
        <li className="mr-2">
            <a className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:underline py-2 px-2" href="#">Likes</a>
        </li>
                  
    </ul>
</div>
<div className="flex w-1/2 justify-end mr-1">
   <form action="../profile/ezsulky" method="post">
    </form>
</div>
</div>             
            <div>
              <img className="h-32 w-full object-cover lg:h-48" src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="">
            </img>
            </div>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                <div className="flex">
                    <div className="h-24 w-24 font-semibold text-center ring-4 ring-white sm:h-32 sm:w-32 transition text-white bg-gray-700 bg-center mr-2 border-8 border-gray-500 rounded-full cursor-pointer select-none">
                    <div className="my-1 text-7xl  sm:text-8xl ">?</div>
                    </div>
                </div>
                <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                  <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 truncate">
                    {username}
                    </h1>
                  </div>
                  <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <button type="button" className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                      <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span>Message</span>
                    </button>
                    <button type="button" className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                      <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span>Follow</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 truncate">
                  {username}
                </h1>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-2 2xl:mt-5">
            <div className="border-b border-gray-200">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className=" flex" aria-label="Tabs">
                  {tabs.map((tab) => (
                        <button
                          key={tab.name}
                          onClick={() => setTab(tab.name)}
                          className={ tab.name === currentTab ? 'border-yellow-500 text-gray-900 whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm'}
                        >
                          {tab.name}
                        </button>    
                  ))}              
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 max-w-5xl mx-auto sm:px-6 lg:px-8">
            <dl className="">

                    {currentTab === 'Posts' ? 
                                            <nav className="relative  shadow flex " aria-label="Tabs">
                                            <button onClick={() => setFeed("public")}
                                            className={currentFeed == "public" ? "border-yellow-400 border-b rounded-b-none text-gray-500 hover:text-gray-700  rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10" : "text-gray-500 hover:text-gray-700 rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"}>
                                            <span>Public</span>
                                          </button>{isaContact ?                                           <button onClick={() => setFeed("private")}
                                            className={currentFeed == "private" ? "border-yellow-400 border-b rounded-b-none text-gray-500 hover:text-gray-700  rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10" : "text-gray-500 hover:text-gray-700 rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"}>
                                            <span>Private</span>
                                          </button>: null}
                                      </nav>
                    :null}
            {currentTab === 'Posts' ?
 LoadPosts() : null}
                {currentTab === 'About' ? loadAbout() : null}
            </dl>
          </div></div>
          : <div className="flex flex-col w-1/2 items-center justify-center mx-auto mt-4">
    <div className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700" role="alert">
        <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
        <div>
            <span className="font-medium">Error!</span> Profile does not exist.
        </div>
    </div>
    <NavLink to={'/home'} >
      <div className="text-white rounded-md hover:opacity-80 transition px-6 py-2 bg-yellow-500 text-lg text-center  mx-auto ">Go Home</div>
      </NavLink>

          </div> }
  </div>
      
      
    )
  }

export default Profile;