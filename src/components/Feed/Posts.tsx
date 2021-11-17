import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NavLink } from 'react-router-dom';
import { NodeBuilderFlags } from 'typescript';
import Post from '../Timeline/Post';
import Loading from '../Loading/Loading';
import { getToken } from '../../utils/Common';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonNote, IonRefresher, IonRefresherContent, IonRow, useIonViewWillEnter } from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import { chevronDownCircleOutline, pin, walk, warning, wifi, wine } from 'ionicons/icons';


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
        if (props.type == "timeline") {
            const response = await fetch(`https://api.postogon.com/posts/public?token=${token}&feed=${props.feed}`);
            const newData = await response.json();
            setData(newData);
            setAllPosts(newData.slice(0, perPage));
        } else if (props.type == "profile") {
            const response = await fetch(`https://api.postogon.com/profile?username=${props.username}&feed=${props.feed}`);
            const newData = await response.json();
            setData(newData);
            setAllPosts(newData.slice(0, perPage));
        }
        else if (props.type == "id") {
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
        if (props.type == "timeline") {
            const response = await fetch(`https://api.postogon.com/posts/public?token=${token}&feed=${props.feed}`);
            const newData = await response.json();
            setData(newData);
            setAllPosts(newData.slice(0, perPage));
        } else if (props.type == "profile") {
            const response = await fetch(`https://api.postogon.com/profile?username=${props.username}&feed=${props.feed}`);
            const newData = await response.json();
            setData(newData);
            setAllPosts(newData.slice(0, perPage));
        }
        else if (props.type == "id") {
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
            if (posts.length == 1000) {
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
                        <li key={i} className="bg-white px-4 py-6 shadow sm:p-6">
                            <div>
                                <div className="flex space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="animate-pulse rounded-full bg-gray-300 h-10 w-10"></div>
                                    </div>
                                    <div className="min-w-0 flex-1 space-y-1">
                                        <div className="animate-pulse h-4 bg-gray-200 rounded w-2/5"></div>
                                        <div className="animate-pulse h-3 bg-gray-200 rounded w-2/5"></div>
                                    </div>
                                    <div className="flex-shrink-0 self-center flex">
                                        <div className="relative inline-block text-left">
                                            <div>
                                                <div className="animate-pulse bg-gray-200 w-6 h-6"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 space-y-2">

                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                            <div className="mt-6 flex flex-row-reverse justify-between space-x-8">
                                <div className="flex space-x-6">
                                    <span className="inline-flex items-center text-sm">
                                        <div className="inline-flex space-x-2">
                                            <div className="animate-pulse bg-gray-200 w-10 h-4"></div>
                                            <span className="animate-pulse bg-gray-200 w-8 h-4"></span><span className="sr-only">Likes</span>
                                        </div>
                                    </span>
                                    <span className="inline-flex items-center text-sm">
                                        <div className="inline-flex space-x-2">
                                            <div className="animate-pulse bg-gray-200 w-10 h-4"></div>
                                            <span className="animate-pulse bg-gray-200 w-8 h-4"></span><span className="sr-only">Comments</span>
                                        </div>
                                    </span>
                                </div>
                                <div className="flex text-sm">
                                    <span className="inline-flex items-center text-sm">
                                        <div className="inline-flex space-x-2">
                                            <div className="animate-pulse bg-gray-200 w-10 h-4"></div>
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
                    {originalContent.length > maxLength ? <button className="ml-1 text-blue-600 hover:text-blue-400 focus:text-blue-500 transition focus:outline-none" onClick={() => setCollapsed(!isCollapsed)}>{isCollapsed ? 'Show less' : 'Show more'}</button> : null}</div>
            )
        }

        function openOptions() {
            console.log("clicked");
        }

        return (
            <div className="">
                <div className="mb-40 mt-20">
                    <div className="bg-white" id="cardHeader">
                        <div className="flex">
                            <div className="flex items-center">
                                <div className="w-10 h-10 font-bold text-center transition text-white bg-gray-700 bg-center mr-2 border-4 border-gray-500 rounded-full cursor-pointer select-none hover:opacity-80">
                                    <div className="my-1">?</div>
                                    <span className="flex transition -my-4 mx-5 animate-bounce focus:opacity-50 focus:outline-none select-none"></span>
                                </div>

                                <div>
                                    {" "}
                                    <div className="flex items-center">
                                        <p className="mr-1 font-bold text-black cursor-pointer hover:underline">
                                            Username
                                        </p>
                                    </div>
                                    <div className="flex items-center transition duration-500 transform hover:-translate-y-1"></div>
                                    <div className="flex items-center mt-1 text-xs text-gray-600">
                                        <p>Bio / Status</p>
                                        <p className="ml-1 mr-1">•</p>
                                        <p>2 seconds ago</p>
                                    </div>
                                </div>
                            </div>

                            <div className="ml-auto flex items-start">
                                <button className="overflow-hidden focus:outline-none">
                                    <svg
                                        className="h-4 leading-none text-gray-500 cursor-pointer fill-current title-font hover:text-gray-700"
                                        viewBox="0 0 60 60"
                                        xmlns="https://www.w3.org/2000/svg"
                                    >
                                        <path d="M8 22c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zM52 22c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zM30 22c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white text-black" id="cardContent">
                        <div>
                            <p className="text-sm antialiased break-words sm:subpixel-antialiased md:antialiased">
                                ewewew
                            </p>
                        </div>
                        <div className="flex flex-row-reverse">
                            <p className="text-xs text-gray-400 transition hover:text-gray-500">
                                School '22, Studying Engineering 💻
                            </p>
                        </div>
                    </div>

                    <div className="bg-white text-black" id="cardFooter">
                        <div className="flex w-full justify-start border-t border-gray-100 border-opacity-50">
                            <div className="flex flex-row-reverse">
                                <div>🔒</div>
                            </div>
                            <div className="flex justify-end w-full ">
                                <div className="like unliked focus:outline-none"></div>
                                <span className="text-gray-400 ml-2">14 </span>
                            </div>
                        </div>
                    </div>
                </div>

                <p>
                    <IonRefresher className="" slot="fixed" onIonRefresh={doRefresh}>
                        <IonRefresherContent
                        >
                        </IonRefresherContent>
                    </IonRefresher>   </p>
                <IonList>
                    {posts && posts.length > 0 && !loading ? allPosts.map((post: iPosts) =>
                        <li key={post.PostId} className="bg-white px-4 py-6 shadow sm:p-6">
                            <div>
                                <div className="flex space-x-3">
                                    <div className="flex-shrink-0">
                                        <NavLink to={"/profile/" + post.PostedBy}><div className="w-10 h-10 font-bold text-center transition text-white bg-gray-700 bg-center mr-2 border-4 border-gray-500 rounded-full cursor-pointer select-none hover:opacity-80">
                                            <div className="my-1">?</div>
                                            <span className="flex transition -my-4 mx-5 animate-bounce focus:opacity-50 focus:outline-none select-none"></span>
                                        </div></NavLink></div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-900"><NavLink to={"/profile/" + post.PostedBy} className="hover:underline">{post.PostedBy}</NavLink></p>
                                        <p className="text-sm text-gray-500"><a href="#" className="hover:underline"><time dateTime="2020-12-09T11:43:00">--</time></a></p>
                                    </div>
                                    <div className="flex-shrink-0 self-center flex">
                                        <div className="relative inline-block text-left">
                                            <div className="text-black">
                                                ewewew
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 text-gray-700 space-y-4 whitespace-pre-line text-sm antialiased break-words sm:subpixel-antialiased md:antialiased">
                                {trimText(post.PostBody)}
                            </div>


                            <div className="flex w-full items-center">

                                <div className="flex justify-end ml-auto items-center">
                                    <p className="text-xs text-gray-400 transition hover:text-gray-500">Bio goes here</p>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-row-reverse justify-between">
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
                                                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="font-medium text-gray-900"></span><span className="sr-only">replies</span>
                                        </button>
                                    </span>
                                </div>
                                <div className="flex text-sm">
                                    <span className="inline-flex items-center text-sm">
                                        <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
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
                    {RenderPosts()}
                </ul>
            </div></React.Fragment>
    );
}

export default Posts;