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
                         <SinglePost post={post} PostId={post.PostId} PostBody={post.PostBody} PostedBy={post.PostedBy} Likes={post.Likes}></SinglePost>

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