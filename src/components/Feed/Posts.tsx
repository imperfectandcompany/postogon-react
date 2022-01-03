import React, { Dispatch, useEffect, useMemo, useState } from 'react';
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
import { Z_FILTERED } from 'zlib';
import { fetchPostsFeed, fetchPostsType, initialState, IPost } from '../../features/post/postSlice';
import { useGetTimelineFeedQuery } from '../../features/api/apiSlice';
import Loading from '../Loading/Loading';
import Post from '../Timeline/Post';
import { phonePortraitSharp } from 'ionicons/icons';
import CreatePost from '../Timeline/CreatePost';


interface PostProps {
    feed: fetchPostsFeed;
    type: string;
    username?: string;
    id?: string;
}

function Posts(props: PostProps) {




    const [loading, setLoading] = useState(true);
    const [allPosts, setAllPosts] = useState<IPost[]>(initialState.posts);

    const perPage = 8;
    const [lastPosition, setLastPosition] = useState(perPage);
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

    /*data is the response from the api
    isLoading indicates if the hook is making the first request
    isFetching is a boolean indicating if the hook is currently making a request
    isSuccess is a boolean that indicates if the hook has made a successful request AND has cached data available (in this case, 'data' should be defined)
    isError is a boolean indicating  if the last request had an error
    error: is a serialized error object.
    */
    const {
        data: posts = [],
        isLoading,
        isSuccess,
        isFetching,
        isError,
        error,
        refetch
      } = useGetTimelineFeedQuery(props.feed);

    const sortedPosts = useMemo(() => {
        const sortedPosts = posts;
        return sortedPosts
      }, [posts])

      useEffect(() => {
        loadPosts();
    }, [props.feed]);

    useIonViewWillEnter(() => {
        loadPosts();
    });
    
    //load more posts
    const loadPosts = () => {
        setTimeout(() => {
            setAllPosts((prev:any[] = []) => [
                ...prev,
                ...sortedPosts.slice(lastPosition, lastPosition + perPage),
            ]);
        }, 200);
        setLoading(false);
        setLastPosition(lastPosition + perPage);
    };

    const loadData = (ev: any) => {
        setLoading(true);
        setTimeout(() => {
            loadPosts();
            ev.target.complete();
            if (sortedPosts.length === 1000) {
                setInfiniteDisabled(true);
            }
        }, 500);
    }
      let content
      if (isLoading) {
        content = <Loading />
      } else if (isSuccess) {

          const renderedPosts =<>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent
          refreshingSpinner="dots">
        </IonRefresherContent>
      </IonRefresher>
                <IonList>         
         {!loading ? allPosts.map((post:IPost, index:number) =>
            <SinglePost key={index} PostedOn={post.PostedOn} PostBody={post.PostBody} PostedBy={post.PostedBy} Likes={post.Likes} PostId={post.PostId} />
        ) : loadSkeletonPosts(sortedPosts.length)}
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

        content = <div className={isFetching ? "opacity-10 transition" : "opacity-100 transition"}>{renderedPosts}</div>

      } else if (isError && error !== undefined) {
          console.log(error);
        content = <div>{error.toString()}</div>
      }

    useIonViewWillEnter(() => {
        loadPosts();
    });

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        setLoading(true);
        refetch();
        setTimeout(() => {
            setLoading(false);
            event.detail.complete();
        }, 1000);
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



    return (
        <React.Fragment>
            <div>

                <CreatePost></CreatePost>
            <button onClick={refetch}>Refetch Posts</button>

      {content}
                <ul>
                </ul>
            </div></React.Fragment>
    );
}

export default Posts;