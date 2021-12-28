import React, { Dispatch, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getToken } from '../../utils/Common';
import { RefresherEventDetail } from '@ionic/core';
import { useIonViewWillEnter, IonRefresher, IonRefresherContent, IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonContent } from '@ionic/react';
import SinglePost from './Post/SinglePost';
import skeletonPost from './skeletonPost';
import PostLike from '../../features/post/postLike';
import { ActionCreator, ThunkAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { useCheckIfUserExistsByUsernameQuery } from '../../app/services/postogon';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPosts, fetchPostsFeed, fetchPostsType, initialState, IPost, loadInitialPosts, setLastPosition, updatePosts } from '../../features/post/postSlice';


interface PostProps {
    feed: fetchPostsFeed;
    type: fetchPostsType;
    username?: string;
    id?: string;
}

function Posts(props: PostProps) {

    const [loading, setLoading] = useState(true);
    const {posts, isLoading, loadedPosts, lastPosition, perPage} = useAppSelector(state => state.post);
    const [allPosts, setAllPosts] = useState(initialState.posts);
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);


    const dispatch = useAppDispatch()


    
  /*  const refreshData = async () => {
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
    } */


    const getData = async () => {
        //get posts based on type and feed
        dispatch(fetchPosts(props.type, props.feed));
        //load first page of posts
        dispatch(loadInitialPosts);
        console.log(loadedPosts);
    };

    useIonViewWillEnter(() => {
        loadPosts();
    });

    
    useEffect(() => {
        getData();
    }, [props.feed]);
   

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        setLoading(true);
        setAllPosts(posts.slice(0, perPage));
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
        updatePosts(allPosts);
        dispatch(setLastPosition);
    };
    
    const loadData = (ev: any) => {
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
        }

        return (
            <>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent
          refreshingSpinner="dots">
        </IonRefresherContent>
      </IonRefresher>
                <IonList>
                    {posts && posts.length > 0 && !loading ? loadedPosts.map((post) =>
                        <li key={post.PostId} className="px-4 py-6 bg-white shadow sm:p-6">
                         <SinglePost PostId={post.PostId} PostBody={post.PostBody} PostedBy={post.PostedBy} Likes={post.Likes}></SinglePost>
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
            <div>
            <PostLike></PostLike>
                <ul>
                    {RenderPosts()}
                </ul>
            </div></React.Fragment>
    );
}

export default Posts;