import React, { useEffect, useState } from 'react';
import { fetchPosts, fetchPostsFeed, fetchPostsType, hasError, initialState, IPost, loadPosts, selectAllPosts, startLoading, stopLoading, updateLike, updatePosition } from '../../features/post/postSlice';
import SinglePost from './Post/SinglePost';
import api from "../../utils/API";
import { getToken } from '../../utils/Common';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { IonAvatar, IonButton, IonFooter, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonListHeader, IonRefresher, IonRefresherContent, IonRippleEffect, IonSkeletonText, RefresherEventDetail, StackContext,  useIonViewDidEnter,  useIonViewDidLeave,  useIonViewWillEnter,  useIonViewWillLeave,  withIonLifeCycle } from '@ionic/react';
import skeletonPost from './skeletonPost';
import Loading from '../Loading/Loading';
import CreatePost from '../Timeline/CreatePost';
import MoreOptions from './MoreOptions';
import { bookmarkOutline, paperPlaneOutline, chatbubblesOutline, heart, heartOutline, chevronDownCircleOutline, arrowDownCircle, chevronDownCircle, chevronDownCircleSharp } from 'ionicons/icons';
import { useDispatch, useSelector } from 'react-redux';

interface PostProps {
    feed: fetchPostsFeed;
    type: fetchPostsType;
    username?: string;
    id?: string;
}

function Posts(props: PostProps) {

    const loadedPosts = useAppSelector(state => state.post.loadedPosts);
    const posts = useAppSelector(state => state.post.posts);
    const error = useAppSelector(state => state.post.error);
    const feed = useAppSelector(state => state.post.feed);
    const isLoading = useAppSelector(state => state.post.isLoading)
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);


    const dispatch = useDispatch();

    const postStatus = useAppSelector(state => state.post.status);

      useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(startLoading());
      dispatch(fetchPosts(props.feed));
    }
  }, [postStatus, dispatch])
      
    //load more posts
    const morePosts = () => {
        setTimeout(() => {
            dispatch(loadPosts());
            dispatch(stopLoading());            
        }, 0);
        dispatch(updatePosition());
    };

    const loadData = (ev: any) => {
        dispatch(startLoading());
        setTimeout(() => {
            morePosts();
            console.log('Loaded data');
            ev.target.complete();
            if (posts.length === loadedPosts.length-8) {
                setInfiniteDisabled(true);
            }
        }, 0);
    }

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        //force refetch of posts, this called function itializes with isLoading as true and finishes with isLoading as false.
        dispatch(fetchPosts(props.feed));
        setTimeout(() => {
            event.detail.complete();
        }, 500);
    }

    //fetch posts based on if the feed changes, this called function itializes with isLoading as true and finishes with isLoading as false.
    useEffect(() => {
        dispatch(fetchPosts(props.feed));
    }, [props.feed]);

    const loadSkeletonHeader = (title:string) => {
        return (
            <IonListHeader>
                <IonLabel>
                    <div className=" custom-skeleton">
                        <IonSkeletonText animated style={{ width: '37%' }} />
                    </div>
                </IonLabel>
            </IonListHeader>
        )
    }

    const loadHeader = (title:string) => {
        return (
            <IonListHeader>
                <IonLabel>
                {title}
                </IonLabel>
            </IonListHeader>
        )
    }

    //function to load skeleton posts
    function loadSkeletonPosts(n: number) {
        return (
            <div>
                    {[...Array(n)].map((array, index) => (
                        <div key={index} >
                            {skeletonPost()}
                        </div>
                    ))}

            </div>
        )
    }

    function loadSkeletonView(amt: number, header: string): JSX.Element {
        return <>{
            loadSkeletonHeader(header)}{
            loadSkeletonPosts(amt) }  </>
      }


    let content

    if (postStatus === 'loading') {
      content = loadSkeletonView(loadedPosts.length+8, "Still Loading");

    }
    if(isLoading){
        content = loadSkeletonView(loadedPosts.length+8, "Still Loading");
    }
    else if (postStatus === 'succeeded') {
      content = loadedPosts.map((post, index) => (
        <SinglePost key={index} Comments={post.Comments} PostedOn={post.PostedOn} PostBody={post.PostBody} PostedBy={post.PostedBy} Likes={post.Likes} PostId={post.PostId} posts={[]} IsLiked={post.IsLiked} />
      ))
    } else if (postStatus === 'failed') {
        dispatch(hasError(error))
      content = <div>{error}</div>
    }

    return (
        <React.Fragment>
            <div>
                <ul>
                    <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent
          pullingIcon={arrowDownCircle}
          pullingText="Pull to refresh"
          refreshingSpinner="dots"
          refreshingText="Refreshing...">
        </IonRefresherContent>
                    </IonRefresher>
                    <IonList className="relative bg-white divide-y shadow-lg divide-gray-50">
                        <div className="snap-y snap-mandatory">
                            {postStatus === "loading" ? null: loadHeader("Recent posts")}
                            {content}
                        </div>
                    </IonList>
                    <IonInfiniteScroll
                        onIonInfinite={loadData}
                        threshold="99%"
                        disabled={isInfiniteDisabled}
                    >
                        <IonInfiniteScrollContent
                            loadingSpinner="dots"
                        ></IonInfiniteScrollContent>
                    </IonInfiniteScroll>
                </ul>
            </div></React.Fragment>
    );
}

export default Posts;
