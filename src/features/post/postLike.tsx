import { IonButton, IonIcon } from "@ionic/react";
import { chatbubblesOutline, heart, heartOutline } from "ionicons/icons";
import React from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { updateLike } from "./postSlice";


export default function PostLike(){
    // The `state` arg is correctly typed as `RootState` already
    const isLiked = useAppSelector(state => state.post.liked)
    const dispatch = useAppDispatch()
    
    const AddPostToLikes = (e: React.MouseEvent<HTMLIonIconElement, MouseEvent> | React.MouseEvent<HTMLIonButtonElement, MouseEvent>, feed: string, postID: string,) => {
        e.stopPropagation();
        //add post like to backend...
        dispatch(updateLike(isLiked ? false : true));
    }

console.log("rwerew");
    return(
        <>
        <IonButton fill="clear" color={isLiked ? "danger" : "medium"} onClick={(e) => AddPostToLikes(e, "public", "4")}>
                <IonIcon icon={isLiked ? heart : heartOutline} />
                {isLiked ? <IonIcon color="danger" style={{ position: "absolute", display: `${isLiked ? "" : "none"}` }} className="animate__animated animate__fadeOutTopRight" icon={heart} /> : null}
            </IonButton></>        
    );
}