import React, { useEffect, useMemo, useState } from 'react';
import { fetchPosts, fetchPostsFeed, fetchPostsType, fetchSuccess, initialState, IPost, loadPosts, startLoading, stopLoading, updateLike, updatePosition } from '../../features/post/postSlice';
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
import { useGetTimelineFeedQuery } from '../../features/api/apiSlice';
import Post from '../Timeline/Post';
import { setMaxListeners } from 'process';



interface PostProps {
    feed: fetchPostsFeed;
    type: fetchPostsType;
    username?: string;
    id?: string;
}

function Posts(props: PostProps) {

    const {
        data: posts = [],
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
        refetch
      } = useGetTimelineFeedQuery(props.feed);


      function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        refetch();
        setTimeout(() => {
          event.detail.complete();
        }, 1000);
      }


      
      let content

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


      const sortedPosts = useMemo(() => {
        const sortedPosts = posts.slice()
        // Sort posts in descending chronological order
        sortedPosts.sort((x, y) => y.PostedOn - x.PostedOn)
        return sortedPosts
      }, [posts]);



    if (isLoading) {
        content = loadSkeletonView(1, "Still Loading");
      } else if (isSuccess) {
        const renderedPosts = sortedPosts.map((post: IPost, index: number) => (
            <SinglePost key={index} PostedOn={post.PostedOn} PostBody={post.PostBody} PostedBy={post.PostedBy} Likes={post.Likes} PostId={post.PostId} />
        ))
        content = <div ><IonList className="relative bg-white divide-y shadow-lg divide-gray-50">{renderedPosts}              </IonList></div>
      } else if (isError) {
        content = <div>{error?.toString()}</div>
      }
    return (
        <React.Fragment>
            <div>
            <ul>
            <IonRefresher slot="fixed" disabled={isFetching} onIonRefresh={doRefresh}>
        <IonRefresherContent
pullingIcon={arrowDownCircle}
pullingText="Pull to refresh"
refreshingSpinner="dots"
refreshingText="Refreshing...">
</IonRefresherContent>
        </IonRefresher>
            {content}
            </ul>

            </div></React.Fragment>
    );
}

export default Posts;

