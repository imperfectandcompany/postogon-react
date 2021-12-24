import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getToken } from '../../utils/Common';
import { RefresherEventDetail } from '@ionic/core';
import { useIonViewWillEnter, IonRefresher, IonRefresherContent, IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonContent } from '@ionic/react';
import SinglePost from './Post/SinglePost';

interface PostProps {
    feed: string;
    type: string;
    username?: string;
    id?: string;
}


function Posts(props: PostProps) {


    const [loading, setLoading] = useState(true);
    const [posts, setData] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const perPage = 8;
    const [lastPosition, setLastPosition] = useState(perPage);
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

    const getData = async () => {
        const token = getToken();
        if (props.type ==="timeline") {
            const response = await fetch(`https://api.postogon.com/posts/public?token=${token}&feed=${props.feed}`);
            const newData = await response.json();
            setData(newData);
            setAllPosts(newData.slice(0, perPage));
        } else if (props.type === "profile") {
            const response = await fetch(`https://api.postogon.com/profile?username=${props.username}&feed=${props.feed}`);
            const newData = await response.json();
            setData(newData);
            setAllPosts(newData.slice(0, perPage));
        }
        else if (props.type === "id") {
            const response = await fetch(`https://api.postogon.com/posts?id=${props.id}`);
            const newData = await response.json();
            setData(newData);
            setAllPosts(newData.slice(0, perPage));
        }
    };

    useEffect(() => {
        getData();
    }, [props.feed]);


    const refreshData = async () => {
        const token = getToken();
        if (props.type === "timeline") {
            const response = await fetch(`https://api.postogon.com/posts/public?token=${token}&feed=${props.feed}`);
            const newData = await response.json();
            setData(newData);
            setAllPosts(newData.slice(0, perPage));
        } else if (props.type === "profile") {
            const response = await fetch(`https://api.postogon.com/profile?username=${props.username}&feed=${props.feed}`);
            const newData = await response.json();
            setData(newData);
            setAllPosts(newData.slice(0, perPage));
        }
        else if (props.type === "id") {
            const response = await fetch(`https://api.postogon.com/posts?id=${props.id}`);
            const newData = await response.json();
            setData(newData);
            setAllPosts(newData.slice(0, perPage));
        }
    }

    useIonViewWillEnter(() => {
        loadPosts();
    });

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        setLoading(true);
        refreshData();
        setTimeout(() => {
            setLoading(false);
            event.detail.complete();
        }, 1000);
    }


    //load more posts
    const loadPosts = () => {
        setTimeout(() => {
            setAllPosts((prev) => [
                ...prev,
                ...posts.slice(lastPosition, lastPosition + perPage),
            ]);
        }, 200);
        setLoading(false);
        setLastPosition(lastPosition + perPage);
    };

    const loadData = (ev: any) => {
        setLoading(true);
        setTimeout(() => {
            loadPosts();
            console.log('Loaded data');
            ev.target.complete();
            if (posts.length === 1000) {
                setInfiniteDisabled(true);
            }
        }, 500);
    }

    //function to load skeleton posts
    function loadSkeletonPosts(n: number) {
        return (
            <div>
                <ul className="">
                    {[...Array(n)].map((object, i) => (
                        <li key={i} className="px-4 py-6 bg-white shadow sm:p-6">
                            <div>
                                <div className="flex space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-1">
                                        <div className="w-2/5 h-4 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="w-2/5 h-3 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div className="flex self-center flex-shrink-0">
                                        <div className="relative inline-block text-left">
                                            <div>
                                                <div className="w-6 h-6 bg-gray-200 animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 space-y-2">

                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
                            </div>
                            <div className="flex flex-row-reverse justify-between mt-6 space-x-8">
                                <div className="flex space-x-6">
                                    <span className="inline-flex items-center text-sm">
                                        <div className="inline-flex space-x-2">
                                            <div className="w-10 h-4 bg-gray-200 animate-pulse"></div>
                                            <span className="w-8 h-4 bg-gray-200 animate-pulse"></span><span className="sr-only">Likes</span>
                                        </div>
                                    </span>
                                    <span className="inline-flex items-center text-sm">
                                        <div className="inline-flex space-x-2">
                                            <div className="w-10 h-4 bg-gray-200 animate-pulse"></div>
                                            <span className="w-8 h-4 bg-gray-200 animate-pulse"></span><span className="sr-only">Comments</span>
                                        </div>
                                    </span>
                                </div>
                                <div className="flex text-sm">
                                    <span className="inline-flex items-center text-sm">
                                        <div className="inline-flex space-x-2">
                                            <div className="w-10 h-4 bg-gray-200 animate-pulse"></div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    //if loading is true and post type is id
    if (loading && props.id) {
        loadSkeletonPosts(1);
    }

    //load posts with infinite scrolling
    function RenderPosts() {

        interface iPosts {
            post: iPosts
            PostId: number;
            PostBody: string;
            PostedBy: string;
            Likes: number;
            To_Whom: number;
        }

        const [isCollapsed, setCollapsed] = useState(false);

        function trimText(text: string) {
            const maxLength = 140;
            const originalContent = text.trim();
            const content = originalContent.slice(0, maxLength);

            return (

                <div>
                    <span className="whitespace-pre-line">{isCollapsed ? originalContent : content}</span>
                    {originalContent.length > maxLength ? <button className="ml-1 text-blue-600 transition hover:text-blue-400 focus:text-blue-500 focus:outline-none" onClick={() => setCollapsed(!isCollapsed)}>{isCollapsed ? 'Show less' : 'Show more'}</button> : null}</div>
            )
        }

        return (
            <div className="">  



      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent
          refreshingSpinner="dots">
        </IonRefresherContent>
      </IonRefresher>
                <IonList>
                    {posts && posts.length > 0 && !loading ? allPosts.map((post: iPosts) =>
                        <li key={post.PostId} className="px-4 py-6 bg-white shadow sm:p-6">
                            <div>
                                <div className="flex space-x-3">
                                    <div className="flex-shrink-0">
                                        <NavLink to={"/profile/" + post.PostedBy}><div className="w-10 h-10 mr-2 font-bold text-center text-white transition bg-gray-700 bg-center border-4 border-gray-500 rounded-full cursor-pointer select-none hover:opacity-80">
                                            <div className="my-1">?</div>
                                            <span className="flex mx-5 -my-4 transition select-none animate-bounce focus:opacity-50 focus:outline-none"></span>
                                        </div></NavLink></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900"><NavLink to={"/profile/" + post.PostedBy} className="hover:underline">{post.PostedBy}</NavLink></p>
                                        <p className="text-sm text-gray-500"><a className="hover:underline"><time dateTime="2020-12-09T11:43:00">--</time></a></p>
                                    </div>
                                    <div className="flex self-center flex-shrink-0">
                                        <div className="relative inline-block text-left">
                                            <div className="text-black">
                                                ewewew
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 space-y-4 text-sm antialiased text-gray-700 break-words whitespace-pre-line sm:subpixel-antialiased md:antialiased">
                                {trimText(post.PostBody)}
                            </div>


                            <div className="flex items-center w-full">

                                <div className="flex items-center justify-end ml-auto">
                                    <p className="text-xs text-gray-400 transition hover:text-gray-500">Bio goes here</p>
                                </div>
                            </div>

                            <div className="flex flex-row-reverse justify-between mt-6">
                                <div className="flex space-x-6">
                                    <span className="inline-flex items-center text-sm">
                                        <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                                            </svg>
                                            <span className="font-medium text-gray-900">{post.Likes}</span><span className="sr-only">likes</span>
                                        </button>
                                    </span>
                                    <span className="inline-flex items-center text-sm">
                                        <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                                                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="font-medium text-gray-900"></span><span className="sr-only">replies</span>
                                        </button>
                                    </span>
                                </div>
                                <div className="flex text-sm">
                                    <span className="inline-flex items-center text-sm">
                                        <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                                                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
                                            </svg>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </li>
                    ) : loadSkeletonPosts(allPosts.length)}
                </IonList>
                <IonInfiniteScroll
                    onIonInfinite={loadData}
                    threshold="100px"
                    disabled={isInfiniteDisabled}
                >
                    <IonInfiniteScrollContent
                        loadingSpinner="lines-small"
                    ></IonInfiniteScrollContent>
                </IonInfiniteScroll>
            </div>
        )

    }

    return (
        <React.Fragment>
            <div>
                <ul>
                    <SinglePost></SinglePost>
                    {RenderPosts()}
                </ul>
            </div></React.Fragment>
    );
}

export default Posts;