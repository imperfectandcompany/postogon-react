import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonMenuToggle, IonButtons, IonFooter, IonCol, IonRow, IonSpinner, IonItem, IonList, IonListHeader, useIonPopover, IonCard, IonCardContent, IonLabel, IonSegment, IonSegmentButton, IonTextarea, IonBackButton, IonRedirect, NavContext, useIonViewWillEnter } from '@ionic/react';
import { chevronBack, searchOutline } from 'ionicons/icons';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Posts from '../../components/Feed/Posts';
import { useAddNewPostMutation } from '../../features/api/apiSlice';
import { fetchPostsFeed, fetchPostsType } from '../../features/post/postSlice';
import { getToken } from '../../utils/Common';
import { hideTabs } from './LoggedIn';

const LoggedInCreatePost: React.FC = () => {

  //all data is handled in this parent component
  const [currentValue, setCurrentValue] = useState("");// managing textArea value
  //called from child component to update current value
  
  useIonViewWillEnter(() => hideTabs());

  const [addNewPost, { isLoading, isSuccess }] = useAddNewPostMutation();

  const canSave = [currentValue, getToken()].every(Boolean) && !isLoading

  const routeRedirect = document.createElement('IonRedirect');
  routeRedirect.setAttribute('from', '*');
  routeRedirect.setAttribute('to', '/home');

  const { navigate } = useContext(NavContext);

  // Call this function when required to redirect with the back animation
  const redirect = useCallback(
    () => navigate('/home', 'back'),
    [navigate]
  );

  const onSavePostClicked = async (to_whom: number) => {
    if (canSave) {
      try {
        await addNewPost({ body: currentValue, token: getToken(), to_whom: to_whom }).unwrap()
        setCurrentValue("");
        redirect();
      } catch (err) {
        console.error('Failed to save the post: ', err)
      }
    }
  }

  function postButton() {
    if (isLoading) {
      return (<IonButton fill="solid" expand="block" color="danger" className="font-semibold transition duration-200 rounded-md cursor-not-allowed btn focus:outline-none" disabled>
        <IonSpinner name="crescent"></IonSpinner>
      </IonButton>);
    } else if (currentValue !== "") {
      return (<IonButton fill="solid" expand="block" color="danger" onClick={(e) =>
        onSavePostClicked(parseInt(feed))
      }
        className="font-semibold text-white transition rounded-md cursor-pointer btn focus:outline-none">Post</IonButton>);
    } else {
      return (<IonButton fill="solid" expand="block" color="danger" className="font-semibold text-white transition rounded-md cursor-not-allowed btn focus:outline-none" disabled>Post</IonButton>);
    }
  }

  const [feed, setFeed] = useState("1");
  const logoColor = {
    filter: 'brightness(0.1)',
  };
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
              <IonTextarea className="text-gray-900 " value={currentValue} onIonChange={e => {
                if (e.detail.value === undefined) return;
                setCurrentValue(e.detail.value!);
              }} spellcheck={true} autoGrow={true} enterkeyhint="done" inputmode="text" maxlength={280} placeholder="What's poppin'?" required={true}></IonTextarea>
            <IonRow className="justify-end">
              <div className="text-xs font-semibold text-gray-400 count"><span>{currentValue.length}</span> / <span>280</span></div>
            </IonRow>            
            </IonCardContent>
          </IonCard>
        </IonContent>
        <IonFooter className="bg-white border-2 border-t border-gray-100 ">
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

