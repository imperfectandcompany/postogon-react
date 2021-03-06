import { IonButton, IonIcon } from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { initialState } from "./postSlice";


export default function PostLike(){
    const isLiked = useState(false);
    const {posts, isLoading} = useAppSelector(state => state.post)
    const [trimmedPosts, setTrimmedPosts] = useState(initialState.posts);
    const dispatch = useAppDispatch()
    const AddPostToLikes = (e: React.MouseEvent<HTMLIonIconElement, MouseEvent> | React.MouseEvent<HTMLIonButtonElement, MouseEvent>, feed: string, postID: string,) => {
        e.stopPropagation();
        //add post like to backend...
        //dispatch(updateLike(isLiked ? false : true));
    }
    return(
        <>
        <div className="px-6 py-4 bg-white">
            <div className="flex">
            <div className="font-bold text-black">
                Testing:
            </div>            <div className="font-bold text-black">
                {isLoading ? " loading" : " loaded"}
            </div>
            </div>
            </div>
        <IonButton fill="clear" color={isLiked ? "danger" : "medium"} onClick={(e) => AddPostToLikes(e, "public", "4")}>
                <IonIcon icon={isLiked ? heart : heartOutline} />
                {isLiked ? <IonIcon color="danger" style={{ position: "absolute", display: `${isLiked ? "" : "none"}` }} className="animate__animated animate__fadeOutTopRight" icon={heart} /> : null}
            </IonButton></>        
    );
}