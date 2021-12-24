import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getToken } from '../../../utils/Common';
import { HTMLStencilElement, RefresherEventDetail } from '@ionic/core';
import MoreOptions from '../MoreOptions';
import { useIonViewWillEnter, IonRefresher, IonRefresherContent, IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonIcon, IonButton } from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import { addToLikes, LikesStore } from '../../../data/LikesStore';
import { fetchPosts } from '../../../utils/feed';
import { PostsStore } from '../../../data/PostsStore';



function SinglePost() {
    const params = useParams();
    const [ IsLiked, setIsLiked ] = useState(false);
    const postLikeRef = useRef<HTMLDivElement>(null);
    const likes = LikesStore.useState(s => s.post_ids);
    const posts = PostsStore.useState(s => s.posts);


	useEffect(() => {

		fetchPosts();
	}, []);

    const AddPostToLikes = ( e: React.MouseEvent<HTMLIonIconElement, MouseEvent>, feed:string, postID:string,) => {
        e.preventDefault();
        e.stopPropagation();
        addToLikes(feed, postID);
        if (null !== postLikeRef.current) {
            setIsLiked(IsLiked ? false : true);
        postLikeRef.current.style.display = "";
        postLikeRef.current.classList.add("animate__fadeOutTopRight");
        }
        setTimeout(() => {
            if (null !== postLikeRef.current) {
            postLikeRef.current.classList.remove("animate__fadeOutTopRight");
            postLikeRef.current.style.display = "none";  
            }          
        }, 500);
    }



    return (
        <React.Fragment>
            <div>
                <ul>
                <div className="mb-40 ">
                    <div className="p-4 bg-white" id="cardHeader">
                        <div className="flex">
                            <div className="flex items-center">
                                <div className="w-10 h-10 mr-2 font-bold text-center text-white transition bg-gray-700 bg-center border-4 border-gray-500 rounded-full cursor-pointer select-none hover:opacity-80">
                                    <div className="my-1">?</div>
                                    <span className="flex mx-5 -my-4 transition select-none animate-bounce focus:opacity-50 focus:outline-none"></span>
                                </div>

                                <div>
                                    {" "}
                                    <div className="flex items-center">
                                        <p className="mr-1 font-bold text-black cursor-pointer hover:underline">
                                            Username
                                        </p>
                                    </div>
                                    <div className="flex items-center transition duration-500 transform hover:-translate-y-1"></div>
                                    <div className="flex items-center mt-1 text-xs text-gray-600">
                                        <p>Bio / Status</p>
                                        <p className="ml-1 mr-1">•</p>
                                        <p>2 seconds ago</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start ml-auto">
                                <MoreOptions isOwner={true} />
                            </div>
                        </div>
                    </div>

                    <div className="text-black bg-white" id="cardContent">
                        <div className="pt-6 pb-3 pl-6 pr-6" id="cardContentItem">
                            <p className="text-sm antialiased break-words sm:subpixel-antialiased md:antialiased">
                                ewewews
                            </p>
                        </div>
                        <div className="flex flex-row-reverse pt-3 pb-6 pl-6 pr-6" id="cardContentItem">
                            <p className="text-xs text-gray-400 transition hover:text-gray-500">
                                School '22, Studying Engineering 💻
                            </p>
                        </div>
                    </div>

                    <div
                        className="p-4 text-black bg-white border-t border-gray-100"
                        id="cardFooter"
                    >
                        <div className="flex justify-start w-full">
                            <div className="flex flex-row-reverse">
                                <div className="flex space-x-4">
                                    <div className="flex">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end w-full">
                                <div>
                                    <IonIcon  color={ IsLiked ? "danger" : "medium" } icon={ IsLiked ? heart : heartOutline } onClick={ (e) => AddPostToLikes(e, "public", "4") } />
                                    <div ref={ postLikeRef }  ><IonIcon style={{ position: "absolute", display: "none" }} className={ `animate__animated` } color="danger" icon={ heart } /></div>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </ul>
            </div>
            </React.Fragment>
    );
}

export default SinglePost;