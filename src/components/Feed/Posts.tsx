import React, { useEffect, useState } from 'react';
import { fetchPosts, fetchPostsFeed, fetchPostsType, initialState, IPost, loadPosts, startLoading, stopLoading, updateLike, updatePosition } from '../../features/post/postSlice';
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
    const [isLiked, setIsLiked] = useState(false);



    
    const dispatch = useAppDispatch();

    
      
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
        dispatch(fetchPosts(props.type, props.feed));
        setTimeout(() => {
            event.detail.complete();
        }, 500);
    }

    //fetch posts based on if the feed changes, this called function itializes with isLoading as true and finishes with isLoading as false.
    useEffect(() => {
        dispatch(fetchPosts(props.type, props.feed));
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


    //if loading is true and post type is not id
    if (isLoading && !props.id && loadedPosts.length <= 0) {
        return loadSkeletonView(8, "Recent posts");
    }

    //if loading is true and post type is id
    if (isLoading && props.id && loadedPosts.length <= 0) {
        return loadSkeletonView(1, "Post");
    }



    const AddPostToLikes = (e: React.MouseEvent<HTMLIonIconElement, MouseEvent> | React.MouseEvent<HTMLIonButtonElement, MouseEvent>, feed: string, postID: string,) => {
        e.stopPropagation();
        //add post like to backend...
        setIsLiked(isLiked ? false : true);
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
                            {isLoading ? null: loadHeader("Recent posts")}
                            {posts && posts.length > 0 && !isLoading ? loadedPosts.map((post: IPost, index: number) =>
                              <SinglePost key={index} PostedOn={post.PostedOn} PostBody={post.PostBody} PostedBy={post.PostedBy} Likes={post.Likes} PostId={post.PostId} />
                           ) : loadSkeletonView(loadedPosts.length+8, "Still Loading")}
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
