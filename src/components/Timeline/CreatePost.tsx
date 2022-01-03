import { IonItem, IonList, IonListHeader, useIonPopover } from '@ionic/react';
import { current } from '@reduxjs/toolkit';
import { ellipseOutline } from 'ionicons/icons';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { textAreaPlaceHolder } from '../../content/textArea.enum';
import { useAddNewPostMutation } from '../../features/api/apiSlice';
import { fetchPostsFeed, fetchPostsType } from '../../features/post/postSlice';
import { getToken, getUid } from '../../utils/Common';
import Posts from '../Feed/Posts';
import TextArea from './TextArea';


function CreatePost() {



    //all data is handled in this parent component
    const [currentValue, setCurrentValue] = useState("");// managing textArea value
    //called from child component to update current value

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const handleUpdate = (value: string) => {
        setCurrentValue(value);
    };

    const [addNewPost, { isLoading }] = useAddNewPostMutation();
    const onAuthorChanged = (e: { target: { value: SetStateAction<string>; }; }) => setUserId(e.target.value)

    const canSave = [currentValue, getToken()].every(Boolean) && !isLoading

    const onSavePostClicked = async (to_whom:number) => {
      if (canSave) {
        try {
          await addNewPost({ body:currentValue, token: getToken(), to_whom:to_whom}).unwrap()
          setCurrentValue("");
        } catch (err) {
          console.error('Failed to save the post: ', err)
        }
      }
    }

    const PopoverList: React.FC<{
        onHide: () => void;
      }> = ({ onHide }) => (
        <IonList>
          <IonListHeader>Where to?</IonListHeader>
          <IonItem button onClick={() => onSavePostClicked(1)}>Public</IonItem>
          <IonItem button onClick={() => onSavePostClicked(2)}>Private</IonItem>
          <IonItem lines="none" detail={false} button onClick={onHide}>
            Close
          </IonItem>
        </IonList>
      );

      const [present, dismiss] = useIonPopover(PopoverList, { onHide: () => dismiss() });


    function postButton() {
        if (currentValue !== "") {
            return (<button          onClick={(e) =>
                present({
                  event: e.nativeEvent,
                  align:"center",
                  translucent:true,
                })
              }
            className="p-1 px-4 font-semibold text-white transition duration-200 bg-red-500 rounded-md cursor-pointer btn focus:outline-none">Post</button>);
        } else {
            return (<button className="p-1 px-4 font-semibold text-white transition duration-200 bg-red-200 rounded-md cursor-not-allowed btn focus:outline-none" disabled>Post</button>);
        }
    }

    const [viewNewPost, setViewNewPost] = useState(false);

    return (
        <div className="bg-white">
            <button onClick={() => setViewNewPost(!viewNewPost)} className="p-1 px-2 text-white transition duration-200 bg-red-500 rounded-md cursor-pointer focus:outline-none" aria-expanded="false">
                New post
                <svg className={viewNewPost ? 'rotate-180 inline-block w-4 h-4 ml-1 transition-transform transform' : 'inline-block w-4 h-4 ml-1 transition-transform transform'} fill="none" stroke="#FFFFFF" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
            </button>
            <div className={viewNewPost ? "block" : "hidden"}>
                <div className="px-4 py-4 transition bg-white border-b">
                    <div className="flex flex-col">
                        <div className="flex">
                            <div className="">
                                <div className="w-10 h-10 mr-3 font-bold text-center text-white bg-gray-700 bg-center bg-cover border-4 border-gray-500 rounded-full cursor-pointer hover:bg-gray-600">
                                    <div className="my-1 select-none">?</div>
                                </div>
                            </div>
                            <TextArea currentValue={currentValue} placeholder={textAreaPlaceHolder.CREATEPOST} rows={3} handleUpdate={handleUpdate}></TextArea>
                        </div>
                        <div className="flex m-2 text-gray-500 icons ml-14">
                            <div className="ml-auto text-xs font-semibold text-gray-400 count"><span>{currentValue.length}</span> / <span>280</span></div>
                        </div>
                        <div className="flex flex-row-reverse">
                            {postButton()}
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default CreatePost;