import React, { useRef, useState } from 'react';
import MoreOptions from '../MoreOptions';
import { bookmarkOutline, chatbubbleEllipses, chatbubbleOutline, chatbubblesOutline, chevronBack, ellipseOutline, ellipsisHorizontal, ellipsisVertical, ellipsisVerticalCircle, ellipsisVerticalSharp, heart, heartOutline, optionsOutline, paperPlaneOutline, reload, sendOutline, shareOutline } from 'ionicons/icons';
import styles from "./SinglePost.module.css"; // Import css modules stylesheet as styles
import { IPost, startLoading, stopLoading, updateLike } from '../../../features/post/postSlice';
import Posts from '../Posts';
import { render } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useIonViewWillLeave, IonModal, IonHeader, IonToolbar, IonButton, IonIcon, IonTitle, IonContent, IonCard, IonRow, IonCol, IonItem, IonAvatar, IonLabel, IonCardContent, IonNote, IonFooter, IonThumbnail } from '@ionic/react';
import { State } from 'ionicons/dist/types/stencil-public-runtime';
import { useUpdatePostLikeMutation } from '../../../features/api/apiSlice';
import { getToken } from '../../../utils/Common';



function SinglePost(props: IPost) {
    const [viewMoreDetails, setViewMoreDetails] = useState(false);
    const postLikeRef = useRef<HTMLDivElement>(null);
    const [addPostLike, { isLoading,  }] = useUpdatePostLikeMutation();
    const canSave = [props.PostId, getToken()].every(Boolean) && !isLoading

    //implement a check to see if user owns the post...
    const AddPostToLikes = async (e: React.MouseEvent<HTMLIonIconElement, MouseEvent> | React.MouseEvent<HTMLIonButtonElement, MouseEvent>, postID: number, isLiked: boolean) => {
        e.stopPropagation();
        if (canSave) {  
            try {
                await addPostLike({ postId: postID, isLiked: isLiked, token: getToken()}).unwrap();
            } catch (err) {
              console.error('Failed to like the post: ', err)
            }
            dispatch(updateLike(postID));            
          }     
    }


  
    const dispatch = useAppDispatch();

    useIonViewWillLeave(() => {
        dispatch(stopLoading());
    });


    const [isCollapsed, setCollapsed] = useState(false);

    function trimText(text: string) {
        const maxLength = 140;
        const originalContent = text.trim();
        const content = originalContent.slice(0, maxLength);
        return (
            <div>
                <span className="whitespace-pre-line">{isCollapsed ? originalContent : content}</span>
                {originalContent.length > maxLength ? <button className="pl-1 text-blue-600 transition active:opacity-50 hover:text-blue-400 focus:text-blue-500 focus:outline-none" onClick={(e) => readMorePostHandler(e)}>{isCollapsed ? 'Show less' : 'Show more'}</button> : null}</div>
        )
    }

    function readMorePostHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation();
        setCollapsed(!isCollapsed);
    }

    function viewMoreDetailsHandler(e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) {
        e.stopPropagation();
        setViewMoreDetails(false);
    }

    const renderModal = () => {
        return (
            <IonModal
                onDidDismiss={() => setViewMoreDetails(false)}
                isOpen={viewMoreDetails}
                swipeToClose={true}
            >
                <IonHeader class="ion-no-border" >
                    <IonToolbar color="white" class={`${styles['removeBorderRadius']}`}>
                        <IonButton slot="start" fill="clear" color="pprimary" onClick={(e) => viewMoreDetailsHandler(e)}>
                            <IonIcon icon={chevronBack}></IonIcon>
                        </IonButton>
                        <IonTitle>Comments</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent color="white">
                    {renderModalContent()}
                </IonContent>
            </IonModal>
        );
    }


    const renderModalContent = () => {
        return (
            <IonCard id={`${props.PostId}`} button={!viewMoreDetails} class={`${styles['removeBorderRadius']}` + " ion-no-margin"}>
                <div className="bg-gray-50">
                    <IonHeader>
                        <IonItem lines="none">
                            <IonAvatar slot="start">
                                <img src="https://via.placeholder.com/300" />
                            </IonAvatar>
                            <IonLabel>
                                <h2 className="font-bold text-black">{props.PostedBy}</h2>
                                <h4 className="text-gray-400">@username</h4>
                            </IonLabel>
                            <MoreOptions isOwner={false} />
                        </IonItem>
                    </IonHeader>
                    <IonCardContent>
                        <div className={`${styles['post-content']}` + " antialiased text-gray-900 sm:subpixel-antialiased md:antialiased"}>
                            {trimText(`${props.PostBody}`)}
                            <IonRow className="justify-end">
                                <IonNote className="mt-3 text-xs text-gray-400 transition hover:text-gray-500">School '22, Studying Engineering ????</IonNote>
                            </IonRow>    </div>

                    </IonCardContent>
                    <IonFooter>

                        <div className={`${styles['post-footer']}`}>
                            <IonRow className="ion-align-self-center ion-justify-content-between">
                                <div>
                                    <IonButton fill="clear" color="medium">
                                        <IonIcon icon={bookmarkOutline} />
                                    </IonButton>
                                    <IonButton fill="clear" color="medium">
                                        <IonIcon icon={paperPlaneOutline} />
                                    </IonButton>
                                </div>

                                <div>
                                    <IonButton fill="clear" color="medium">
                                        <IonIcon icon={chatbubblesOutline} />
                                    </IonButton>
                                    <IonButton fill="clear" color={props.IsLiked ? "danger" : "medium"} onClick={(e) => AddPostToLikes(e, props.PostId, props.IsLiked)}>
                                        <IonIcon icon={props.IsLiked ? heart : heartOutline} />
                                        {props.IsLiked ? <IonIcon color="danger" style={{ position: "absolute", display: `${props.IsLiked ? "" : "none"}` }} className="animate__animated animate__fadeOutTopRight" icon={heart} /> : null}
                                    </IonButton>
                                </div>
                            </IonRow>
                        </div>
                    </IonFooter>
                </div>
            </IonCard>
        );
    }

    const renderCard = () => {
        return (
            <div className="flex flex-col cursor-default ios ion-activatable hover:cursor-pointer active:cursor-default active:bg-gray-100 " onClick={() => (setViewMoreDetails(true))}>
                <div className="sticky top-0 z-40 flex items-center text-sm font-semibold text-gray-900 snap-start bg-gray-50/5 backdrop-blur-sm ring-1 ring-gray-50">
                    <IonHeader>
                        <IonItem lines="none">
                            <IonThumbnail slot="start">
                                <img className="my-auto rounded-full shrink-0" src="https://via.placeholder.com/150" alt="" />
                            </IonThumbnail>
                            <IonLabel color="dark" >
                                <span className="font-bold text-gray-800">{props.PostedBy}</span>
                                <div><span className="text-xs text-gray-900/50 font-regular">{props.PostedOn} ??? 4h ago</span></div>
                            </IonLabel>
                            <div className="text-black" slot="end" >
                                <MoreOptions isOwner={false} />
                            </div>
                        </IonItem>
                    </IonHeader>
                </div>
                <IonCardContent className="sticky inset-0 z-30 text-gray-900 snap-start bg-gray-50/10 backdrop-blur-sm ring-1 ring-gray-50">
                    <div className="">
                        <div  slot="end" className=" ion-padding-bottom">{trimText(`${props.PostBody}`)}</div>
                        <IonRow className="ion-padding-top">
                            <IonNote className="text-xs text-gray-400 transition text-light hover:text-gray-500">School '22, Studying Engineering ????</IonNote>
                        </IonRow>
                    </div>
                </IonCardContent>
                <div className="sticky bottom-0 z-20 flex items-center text-sm font-semibold text-gray-900 transition">
                    <IonFooter>
                        <IonItem className={`${styles['IonItemColor']}`} lines="none" >
                            <IonButton fill="clear" slot="start" color="medium">
                                <IonIcon icon={bookmarkOutline} />
                            </IonButton>
                            <IonButton fill="clear" slot="end" color={props.IsLiked ? "danger" : "medium"} onClick={(e) => AddPostToLikes(e, props.PostId, props.IsLiked)}>
                                <IonIcon icon={props.IsLiked ? heart : heartOutline} />
                                {props.IsLiked ? <IonIcon color="danger" style={{ position: "absolute", display: `${props.IsLiked ? "" : "none"}` }} className="animate__animated animate__fadeOutTopRight" icon={heart} /> : null}
                                <span className={props.IsLiked ? "ml-1 font-black" : "ml-1"}>{props.Likes}</span>                            
                            </IonButton>
                            <IonButton fill="clear" slot="end" className="" color="medium">
                                <IonIcon icon={chatbubblesOutline} />
                                <span className="ml-1">0</span>
                            </IonButton>

                        </IonItem>
                    </IonFooter>
                </div>
            </div>
        );
    }

    const renderOldCard = () => {
        return (
            <div className="flex flex-col cursor-default hover:cursor-pointer active:cursor-default active:bg-gray-100 " onClick={() => (setViewMoreDetails(true))}>
                <div className="sticky top-0 z-40 flex items-center px-4 py-3 text-sm font-semibold text-gray-900 snap-start bg-gray-50/5 backdrop-blur-sm ring-1 ring-gray-400/10">
                    <IonHeader>
                        <div className="flex items-center justify-between group">
                            <div className="flex">
                                <img className="w-12 h-12 rounded-full shrink-0" src="https://via.placeholder.com/150" alt="" />
                                <div className="ml-3 transition">
                                    <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-300/50">{props.PostedBy}
                                        <span className="font-medium text-gray-800/25 group-hover:text-gray-100"> @daweurfd</span></p>
                                    <p className="text-sm font-medium text-gray-500/75 group-hover:text-gray-100">--
                                    </p>
                                </div>
                            </div>
                            <div className="flex ">
                                <MoreOptions isOwner={false} />
                            </div>
                        </div>
                    </IonHeader>
                </div>
                <IonCardContent className="sticky inset-0 z-30 px-4 py-3 text-gray-900 snap-start bg-gray-50/10 backdrop-blur-sm ring-1 ring-gray-300/10">




                    <div className={`${styles['post-content']}` + " antialiased text-gray-900 sm:subpixel-antialiased md:antialiased"}>
                        {trimText(`${props.PostBody}`)}
                        <IonRow className="justify-end">
                            <IonNote className="mt-6 text-xs text-gray-400 transition text-light hover:text-gray-500">School '22, Studying Engineering ????</IonNote>
                        </IonRow>    </div>
                </IonCardContent>
                <div className="sticky bottom-0 z-20 flex items-center text-sm font-semibold text-gray-900 ">
                    <IonFooter>
                        <div >
                            <IonItem className={`${styles['IonItemColor']}`}>
                                <IonButton fill="clear" color={props.IsLiked ? "danger" : "medium"} onClick={(e) => AddPostToLikes(e, props.PostId, props.IsLiked)}>
                                    <IonIcon icon={props.IsLiked ? heart : heartOutline} />
                                    {props.IsLiked ? <IonIcon color="danger" style={{ position: "absolute", display: `${props.IsLiked ? "" : "none"}` }} className="animate__animated animate__fadeOutTopRight" icon={heart} /> : null}
                                </IonButton>
                                <IonButton fill="clear" color="medium">
                                    <IonIcon icon={bookmarkOutline} />
                                </IonButton>
                                <IonButton fill="clear" color="medium">
                                    <IonIcon icon={chatbubblesOutline} />
                                </IonButton>
                                <IonButton fill="clear" slot="end" color="medium">
                                    <IonIcon icon={paperPlaneOutline} />
                                </IonButton>
                            </IonItem>
                        </div>
                    </IonFooter>
                </div>
            </div>
        );
    }

    const wipIosMessageVersion = () => {
        return (

            <IonCard id={`${props.PostId}`} button={!viewMoreDetails} class={`${styles['removeBorderRadius']}` + " ion-no-margin"}>
                <IonItem lines="none">
                    <IonThumbnail slot="start" className="w-8 h-8">
                        <img className="rounded-full shrink-0" src="https://via.placeholder.com/150" alt="" />
                    </IonThumbnail>
                    <IonLabel color="dark">
                        <span className="font-bold text-gray-800">{props.PostedBy}</span>
                        <p className="text-sm">Bio Status</p>
                    </IonLabel>
                    <div className="text-black ">
                        <MoreOptions isOwner={false} />
                    </div>
                </IonItem>
                <IonItem class={`${styles.IonItemColor}`}>
                    <IonThumbnail slot="start" className="w-8 h-8">
                    </IonThumbnail>
                    <IonLabel color="dark">
                        post content
                        <IonRow className="justify-end">
                            <IonNote className="text-xs text-gray-400 transition text-light hover:text-gray-500">School '22, Studying Engineering ????</IonNote>
                        </IonRow>
                        <IonRow className="flex-row-reverse justify-around mt-6 ">
                            <IonButton fill="clear" color={props.IsLiked ? "danger" : "medium"} onClick={(e) => AddPostToLikes(e, props.PostId, props.IsLiked)}>
                                <IonIcon icon={props.IsLiked ? heart : heartOutline} />
                                {props.IsLiked ? <IonIcon color="danger" style={{ position: "absolute", display: `${props.IsLiked ? "" : "none"}` }} className="animate__animated animate__fadeOutTopRight" icon={heart} /> : null}
                            </IonButton>
                            <IonButton fill="clear" color="medium">
                                <IonIcon icon={bookmarkOutline} />
                            </IonButton>
                            <IonButton fill="clear" color="medium">
                                <IonIcon icon={chatbubblesOutline} />
                            </IonButton>
                            <IonButton fill="clear" color="medium">
                                <IonIcon icon={paperPlaneOutline} />
                            </IonButton>
                        </IonRow>
                    </IonLabel>
                </IonItem>
            </IonCard>
        )
    }


    const wipIosCard = () => {
        return (

            <IonCard id={`${props.PostId}`} button={!viewMoreDetails} class={`${styles['removeBorderRadius']}` + " ion-no-margin"}>
                <IonItem lines="none">
                    <IonThumbnail slot="start">
                        <img className="rounded-full shrink-0" src="https://via.placeholder.com/150" alt="" />
                    </IonThumbnail>
                    <IonLabel>
                        <IonLabel color="dark">
                            <span className="font-bold text-gray-800">{props.PostedBy}</span>
                            <p className="text-sm">Bio Status</p>
                            <div><span className="text-xs text-gray-400">{props.PostedOn} ??? 4h ago</span></div>
                        </IonLabel>
                    </IonLabel>
                    <div className="flex ">
                        <MoreOptions isOwner={false} />
                    </div>
                </IonItem>
                <div className="ml-2 mr-2 ion-padding-vertical ion-padding-horizontal">
                    <p className="">{trimText(`${props.PostBody}`)}</p>
                    <IonRow className="justify-end">
                        <IonNote className="text-xs text-gray-400 transition text-light hover:text-gray-500">School '22, Studying Engineering ????</IonNote>
                    </IonRow>
                </div>
                <IonItem className={`${styles['IonItemColor']}`}>
                    <IonButton fill="clear" color={props.IsLiked ? "danger" : "medium"} onClick={(e) => AddPostToLikes(e, props.PostId, props.IsLiked)}>
                        <IonIcon icon={props.IsLiked ? heart : heartOutline} />
                        {props.IsLiked ? <IonIcon color="danger" style={{ position: "absolute", display: `${props.IsLiked ? "" : "none"}` }} className="animate__animated animate__fadeOutTopRight" icon={heart} /> : null}
                    </IonButton>
                    <IonButton fill="clear" color="medium">
                        <IonIcon icon={bookmarkOutline} />
                    </IonButton>
                    <IonButton fill="clear" color="medium">
                        <IonIcon icon={chatbubblesOutline} />
                    </IonButton>
                    <IonButton fill="clear" slot="end" color="medium">
                        <IonIcon icon={paperPlaneOutline} />
                    </IonButton>
                </IonItem>
            </IonCard>
        )
    }


    return (
        <React.Fragment>
            {/* Card Modal */}
            {renderModal()}

            {renderCard()}
            {/* Post */}
        </React.Fragment>
    );
}

export default SinglePost;