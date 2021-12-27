import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getToken } from '../../utils/Common';
import { RefresherEventDetail } from '@ionic/core';
import { useIonViewWillEnter, IonRefresher, IonRefresherContent, IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonContent } from '@ionic/react';
import SinglePost from './Post/SinglePost';
import skeletonPost from './skeletonPost';
import PostLike from '../../features/post/postLike';

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
                        <li key={i} >
                            {skeletonPost()}
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

        return (
            <>
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
                </>
        )

    }

    return (
        <React.Fragment>
            <div>dfa
                <PostLike></PostLike>
                <ul>
                    {RenderPosts()}
                </ul>
            </div></React.Fragment>
    );
}

export default Posts;