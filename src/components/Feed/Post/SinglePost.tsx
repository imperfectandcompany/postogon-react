import React, { useRef, useState } from 'react';
import MoreOptions from '../MoreOptions';
import { bookmarkOutline, chatbubbleEllipses, chatbubbleOutline, chatbubblesOutline, ellipseOutline, ellipsisHorizontal, ellipsisVertical, ellipsisVerticalCircle, ellipsisVerticalSharp, heart, heartOutline, optionsOutline, paperPlaneOutline, reload, sendOutline, shareOutline } from 'ionicons/icons';
import { IonAvatar, IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonModal, IonNote, IonRow, IonText, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import styles from "./SinglePost.module.css"; // Import css modules stylesheet as styles
import { IPost } from '../../../features/post/postSlice';
import Posts from '../Posts';



function SinglePost(props:IPost) {
    const [isLiked, setIsLiked] = useState(false);
    const [viewMoreDetails, setViewMoreDetails] = useState(false);
    const postLikeRef = useRef<HTMLDivElement>(null);
    //implement a check to see if user owns the post...

    const AddPostToLikes = (e: React.MouseEvent<HTMLIonIconElement, MouseEvent> | React.MouseEvent<HTMLIonButtonElement, MouseEvent>, feed: string, postID: string,) => {
        e.stopPropagation();
        //add post like to backend...

        setIsLiked(isLiked ? false : true);
    }


    const [isCollapsed, setCollapsed] = useState(false);

    function trimText(text: string) {
        const maxLength = 140;
        const originalContent = text.trim();
        const content = originalContent.slice(0, maxLength);
        return (
            <div>
                <span className="whitespace-pre-line">{isCollapsed ? originalContent : content}</span>
                {originalContent.length > maxLength ? <button className="pl-1 text-blue-600 transition hover:text-blue-400 focus:text-blue-500 focus:outline-none" onClick={() => setCollapsed(!isCollapsed)}>{isCollapsed ? 'Show less' : 'Show more'}</button> : null}</div>
        )
    }

    function viewMoreDetailsHandler(e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>){
        e.stopPropagation();
        setViewMoreDetails(false)
    }

    const renderModal = () => {
        return(
            <IonModal
            onDidDismiss={() => setViewMoreDetails(false)}
            isOpen={viewMoreDetails}
            swipeToClose={true}
          >
    <IonHeader collapse="condense">
            <IonToolbar color="light">
              <IonTitle>Comments</IonTitle>
              <IonButton color="transparent" slot="end" onClick={(e) => viewMoreDetailsHandler(e)}>
    <IonText color="primary">Close</IonText>
              </IonButton>
            </IonToolbar>
          </IonHeader>
            <IonContent color="dark">
            {renderCard()}
     </IonContent>
          </IonModal>
        );
    }
    

    const renderCard = () => {
        return(
            <IonCard id={`${props.PostId}`} button={!viewMoreDetails} onClick={()=>(setViewMoreDetails(true))} class={`${styles['removeBorderRadius']}` +" ion-no-margin"}>
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
                                <IonNote className="mt-3 text-xs text-gray-400 transition hover:text-gray-500">School '22, Studying Engineering 💻</IonNote>
                            </IonRow>    </div>

                    </IonCardContent>
                    <IonFooter>
                        
                    <div className={`${styles['post-footer']}`}>
                        <IonRow className="ion-align-self-center ion-justify-content-between">
                            <div>
                            <IonButton fill="clear"  color="medium">
                                    <IonIcon icon={bookmarkOutline} />
                                </IonButton>
                                <IonButton fill="clear" color="medium">
                                    <IonIcon icon={paperPlaneOutline} />
                                </IonButton>        
                                </div>
                                                      
                            <div>
                                <IonButton fill="clear"  color="medium">
                                    <IonIcon icon={chatbubblesOutline} />
                                </IonButton>
                                <IonButton fill="clear" color={isLiked ? "danger" : "medium"} onClick={(e) => AddPostToLikes(e, "public", "4")}>
                                <IonIcon icon={isLiked ? heart : heartOutline} />
                                {isLiked ? <IonIcon color="danger" style={{ position: "absolute", display: `${isLiked ? "" : "none"}` }} className="animate__animated animate__fadeOutTopRight" icon={heart} /> : null}
                            </IonButton>                                
                            </div>                            
                        </IonRow>
                        </div>
                </IonFooter>
                </div>
                </IonCard>
        );
    }
    
    
    return (
        <React.Fragment>
      {/* Card Modal */}
      {renderModal()}
      {/* Post */}
            {renderCard()}
        </React.Fragment>
    );
}

export default SinglePost;