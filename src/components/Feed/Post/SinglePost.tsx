import React, { useRef, useState } from 'react';
import MoreOptions from '../MoreOptions';
import { bookmarkOutline, chatbubbleEllipses, chatbubbleOutline, chatbubblesOutline, ellipseOutline, ellipsisHorizontal, ellipsisVertical, ellipsisVerticalCircle, ellipsisVerticalSharp, heart, heartOutline, optionsOutline, paperPlaneOutline, reload, sendOutline, shareOutline } from 'ionicons/icons';
import { IonAvatar, IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonNote, IonRow, IonText, IonThumbnail } from '@ionic/react';
import styles from "./SinglePost.module.css"; // Import css modules stylesheet as styles

interface iPosts {
    post: iPosts
    PostId: number;
    PostBody: string;
    PostedBy: string;
    Likes: number;
    To_Whom?: number;
}

function SinglePost(props:iPosts) {
    const [IsLiked, setIsLiked] = useState(false);
    const postLikeRef = useRef<HTMLDivElement>(null);
    //implement a check to see if user owns the post...

    const AddPostToLikes = (e: React.MouseEvent<HTMLIonIconElement, MouseEvent> | React.MouseEvent<HTMLIonButtonElement, MouseEvent>, feed: string, postID: string,) => {
        e.preventDefault();
        e.stopPropagation();
        //add post like to backend...

        setIsLiked(IsLiked ? false : true);
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


    return (
        <React.Fragment>
            <IonCard class={`${styles['removeBorderRadius']}` +" ion-no-margin"}>
                <div className="bg-white">
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
                            <p>
                            {trimText(`${props.PostBody}`)}
                            </p>

                            <IonRow className="justify-end">
                                <IonNote className="mt-3 text-xs text-gray-400 transition hover:text-gray-500">School '22, Studying Engineering 💻</IonNote>
                            </IonRow>    </div>

                    </IonCardContent>
                    <IonFooter>
                        
                    <div className={`${styles['post-footer']}`}>
                        <IonRow className="bg-white ion-align-self-center ion-justify-content-between">
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
                                <IonButton fill="clear" color={IsLiked ? "danger" : "medium"} onClick={(e) => AddPostToLikes(e, "public", "4")}>
                                <IonIcon icon={IsLiked ? heart : heartOutline} />
                                {IsLiked ? <IonIcon color="danger" style={{ position: "absolute", display: `${IsLiked ? "" : "none"}` }} className="animate__animated animate__fadeOutTopRight" icon={heart} /> : null}
                            </IonButton>                                
                            </div>                            
                        </IonRow>
                        </div>
                </IonFooter>
                </div>
                </IonCard>


        </React.Fragment>
    );
}

export default SinglePost;