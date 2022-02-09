import { alertController } from '@ionic/core';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonMenuToggle, IonButtons, IonFooter, IonCol, IonRow, IonSpinner, IonItem, IonList, IonListHeader, useIonPopover, IonCard, IonCardContent, IonLabel, IonSegment, IonSegmentButton, IonTextarea, IonBackButton, IonRedirect, NavContext, useIonViewWillEnter, useIonViewDidEnter, useIonViewWillLeave } from '@ionic/react';
import { chevronBack, searchOutline } from 'ionicons/icons';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Prompt, useHistory } from 'react-router';
import Posts from '../../components/Feed/Posts';
import { useAddNewPostMutation } from '../../features/api/apiSlice';
import { changeFeed, fetchPostsFeed, fetchPostsType } from '../../features/post/postSlice';
import { getToken } from '../../utils/Common';
import { hideTabs } from './LoggedIn';

const LoggedInCreatePost: React.FC = () => {

  //all data is handled in this parent component
  const [currentValue, setCurrentValue] = useState("");// managing textArea value
  //called from child component to update current value

  //this function hides the tabs on the page before the screen is painted, managed through main page.
  useIonViewWillEnter(() => hideTabs());

  //ionic react 5.0 work-around for setting focus on desired input.
  // <HTMLIonTextareaElement | null> << for enforcing later... native is HTMLTextAreaElement
  const inputRef = useRef<any>(null);
  useEffect(() => {
    setTimeout(() => inputRef.current.setFocus(), 100);
  })

  //this is managed and done through RTK query
  const [addNewPost, { isLoading, isSuccess }] = useAddNewPostMutation();

  //check if the post is valid and can be saved before continuing
  const canSave = [currentValue, getToken()].every(Boolean) && !isLoading

  //necessary for redirecting the user back to home after the post
  const routeRedirect = document.createElement('IonRedirect');
  routeRedirect.setAttribute('from', '*');
  routeRedirect.setAttribute('to', '/home');
  //necessary for redirect
  const { navigate } = useContext(NavContext);

  // Call this function when required to redirect with the back animation
  const redirect = useCallback(
    () => navigate('/home', 'back'),
    [navigate]
  );



  //necessary to dispatch the currrently viewed feed from the redux store.
  const dispatch = useDispatch();

  //
  const onSavePostClicked = async (to_whom: number) => {
    if (canSave) {
      try {
        //run the addNewPost Query with the necessary data
        await addNewPost({ body: currentValue, token: getToken(), to_whom: to_whom }).unwrap();
        //recent value  
        setCurrentValue("");
        //switch to the feed they just posted to for when they return.
        switch (feed) {
          case "1": dispatch(changeFeed(fetchPostsFeed.PUBLIC));
            break;
          case "2": dispatch(changeFeed(fetchPostsFeed.PRIVATE));
            break;
          default:
            break;
        }
        console.log("Fawew");
        redirect();
      } catch (err) {
        console.error('Failed to save the post: ', err)
      }
    }
  }

  function postButton() {
    const hasValidatedData = checkData();
    //if loading, display the spinner
    if (isLoading) {
      return (<IonButton fill="solid" expand="block" color="danger" className="font-semibold transition duration-200 rounded-md cursor-not-allowed btn focus:outline-none" disabled>
        <IonSpinner name="crescent"></IonSpinner>
      </IonButton>);
      //if the post isn't empty, is greater than 0 and less then 280
    } else if (hasValidatedData) {
      return (<IonButton fill="solid" expand="block" color="danger" onClick={(e) =>
        onSavePostClicked(parseInt(feed))
      }
        className="font-semibold text-white transition rounded-md cursor-pointer btn focus:outline-none">Post</IonButton>);
    } else {
      return (<IonButton fill="solid" expand="block" color="danger" className="font-semibold text-white transition rounded-md cursor-not-allowed btn focus:outline-none" disabled>Post</IonButton>);
    }
  }

  //validation
  function checkData() {
    if (currentValue !== "" && currentValue.length > 0 && currentValue.length < 280) {
      return true;
    }
    return false;
  }

  //cleanup for prompt alert
  useEffect(() => {
    if (currentValue) {
      window.onbeforeunload = () => true;
    }
    return () => {
      window.onbeforeunload = null;
    };
  }, [currentValue]);

  useIonViewWillLeave(() => {
    //"reset" the form back to a blank value
    setCurrentValue('');
  });


  //1 is public feed 2 is private feed
  const [feed, setFeed] = useState("1");

  return (
    <>
      <IonPage id="main-content" className="bg-white">
        <IonHeader class="ion-no-border" translucent={true}>
          <IonToolbar color="white">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>Create Post</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={false} forceOverscroll={false} color="white">
          <IonCard color="White" className="shadow-none ">
            <IonCardContent>
              <IonTextarea className="text-gray-900" ref={(ref) => inputRef.current = ref} value={currentValue} onIonChange={e => {
                if (e.detail.value === undefined) return;
                setCurrentValue(e.detail.value!);
              }} spellcheck={true} autoGrow={true} enterkeyhint="done" inputmode="text" maxlength={280} placeholder="What's poppin'?" required={true}></IonTextarea>
              <IonRow className="justify-end">
                <div className="text-xs font-semibold text-gray-400 count"><span>{currentValue.length}</span> / <span>280</span></div>
              </IonRow>
            </IonCardContent>
          </IonCard>
          <Prompt
            when={!!checkData()}
            message="You have unsaved changes, are you sure you want to leave?"
          />
        </IonContent>
        <IonFooter className="bg-white border-2 border-t border-gray-100">
          {/*-- Segment with anchors --*/}
          <IonSegment color="dark" className="my-4" onIonChange={e => { setFeed(e.detail.value!) }} value={feed}>
            <IonSegmentButton value="1">
              <IonLabel>Public</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="2">
              <IonLabel>Private</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          {postButton()}
        </IonFooter>
      </IonPage>
    </>

  );
};

export default LoggedInCreatePost;

