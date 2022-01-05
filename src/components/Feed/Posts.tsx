import React, { useEffect, useState } from 'react';
import { fetchPosts, fetchPostsFeed, fetchPostsType, initialState, IPost, loadPosts, startLoading, stopLoading, updateLike, updatePosition } from '../../features/post/postSlice';
import SinglePost from './Post/SinglePost';
import api from "../../utils/API";
import { getToken } from '../../utils/Common';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonRefresher, IonRefresherContent, RefresherEventDetail, StackContext, useIonViewWillEnter } from '@ionic/react';
import skeletonPost from './skeletonPost';
import Loading from '../Loading/Loading';



interface PostProps {
    feed: fetchPostsFeed;
    type: fetchPostsType;
    username?: string;
    id?: string;
}

function Posts(props: PostProps) {

    const loadedPosts = useAppSelector(state => state.post.loadedPosts)
    const posts = useAppSelector(state => state.post.posts)
    const isLoading = useAppSelector(state => state.post.isLoading)
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);


    const dispatch = useAppDispatch();

    useIonViewWillEnter(() => {
        loadPosts();
    });

    //load more posts
    const morePosts = () => {
        setTimeout(() => {
            dispatch(loadPosts());
        }, 200);
        dispatch(updatePosition());
        dispatch(stopLoading());
    };

    const loadData = (ev: any) => {
        dispatch(startLoading());
        setTimeout(() => {
            morePosts();
            console.log('Loaded data');
            ev.target.complete();
            if (posts.length === 1000) {
                setInfiniteDisabled(true);
            }
        }, 500);
    }



    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        //force refetch of posts, this called function itializes with isLoading as true and finishes with isLoading as false.
        dispatch(fetchPosts(props.type, props.feed));
        setTimeout(() => {
            event.detail.complete();
        }, 1000);
    }

    //fetch posts based on if the feed changes, this called function itializes with isLoading as true and finishes with isLoading as false.
    useEffect(() => {
        dispatch(fetchPosts(props.type, props.feed));
    }, [props.feed]);

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

    //if loading is true and post type is not id
if(isLoading && !props.id && loadedPosts.length <= 0){
    console.log(loadedPosts.length);
    return loadSkeletonPosts(8);  
 }
 
 //if loading is true and post type is id
 if(isLoading && props.id && loadedPosts.length <= 0){
    return loadSkeletonPosts(1);  
 }  


    return (
        <React.Fragment>
            <div>
                <div className="font-bold text-black bg-white">
                    {isLoading ? " loading" : " loaded"}
                </div>
                <ul>
                    <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                        <IonRefresherContent
                            refreshingSpinner="dots">
                        </IonRefresherContent>
                    </IonRefresher>
                    <IonList>
                        {posts && posts.length > 0 && !isLoading ? loadedPosts.map((post: IPost, index: number) =>
                            <li key={post.PostId} className="px-4 py-6 bg-white shadow sm:p-6">
                                <SinglePost key={index} PostedOn={post.PostedOn} PostBody={post.PostBody} PostedBy={post.PostedBy} Likes={post.Likes} PostId={post.PostId} />
                            </li>
                        ) : loadSkeletonPosts(loadedPosts.length)}
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
                </ul>
            </div></React.Fragment>
    );
}

export default Posts;

