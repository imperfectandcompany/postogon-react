import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonMenuToggle, IonButtons, IonSearchbar, NavContext, useIonViewWillEnter, useIonViewWillLeave, IonSegment, IonSegmentButton, IonAvatar, IonItem, IonCard, IonCardContent, IonCol, IonRow, IonNote, IonSplitPane, IonProgressBar, ScrollDetail, IonLabel } from '@ionic/react';
import { profile } from 'console';
import { addCircle, addCircleOutline, addCircleSharp, addOutline, bookmarkOutline, chatbubblesOutline, chevronDown, heart, heartOutline, paperPlaneOutline, pulseOutline, searchOutline } from 'ionicons/icons';
import React from 'react';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import MoreOptions from '../../components/Feed/MoreOptions';
import Posts from '../../components/Feed/Posts';
import Loading from '../../components/Loading/Loading';
import CreatePost from '../../components/Timeline/CreatePost';
import { fetchPostsFeed, fetchPostsType } from '../../features/post/postSlice';

const LoggedInTimeline: React.FC = () => {

  const [isVisible, setIsVisible] = useState(true);



  const [feed, setFeed] = useState(fetchPostsFeed.PUBLIC);
  const logoColor = {
    filter: 'brightness(0.1)',
  };

  const contentRef = useRef<HTMLIonContentElement | null>(null);
  const scrollToTop = () => {
    contentRef.current && contentRef.current.scrollToTop(500);
  };

  const [scroll, setScroll] = React.useState(0.00);



  useEffect(() => {
    scrollToTop();
  }, [feed]);

  const { navigate } = useContext(NavContext);

  // Call this function when required to redirect with the back animation
  const redirect = useCallback(
    () => navigate('/createpost', 'forward'),
    [navigate]
  );


  function testFunc(e: CustomEvent<ScrollDetail>) {
    const html = document.documentElement;
    const scrollPx = html.scrollTop;
    const winHeightPx = html.scrollHeight - html.clientHeight;
    const scrolled = (scrollPx / winHeightPx) * 100;

    setScroll(scrolled);
    console.log(e.detail.scrollTop);
  }


  return (
    <>
      <IonPage id="main-content" className="bg-white">
        <IonHeader translucent={true}>
          <IonToolbar class="ion-no-border"  >
            <IonButtons slot="start">
              <IonButton color="transparent" size="small">
                <img
                  className="w-6 h-6 mx-auto motion-reduce:animate-spin"
                  style={logoColor}
                  src={process.env.PUBLIC_URL + '/assets/icon/icon.svg'}
                  alt="postogon logo" />
              </IonButton>
            </IonButtons>
            <IonTitle><IonButton onClick={() => setFeed(fetchPostsFeed.PUBLIC)} color="clear" fill="clear" className={feed === fetchPostsFeed.PUBLIC ? "font-bold text-black " : "text-black  "}>Public</IonButton><IonButton onClick={() => setFeed(fetchPostsFeed.PRIVATE)} color="clear" fill="clear" className={feed === fetchPostsFeed.PRIVATE ? "font-bold text-black " : "text-black font-medium"}>Private</IonButton></IonTitle>
            <IonButtons slot="end">
              <IonButton fill="clear" onClick={() => redirect()}>
                <IonIcon className="text-red-500 dark:text-white" icon={addCircleSharp}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true} ref={contentRef} scrollEvents={true}
          onIonScroll={(e) => testFunc}
          color="white">


          <IonHeader collapse="condense" translucent={true} color="white">
            <IonToolbar color="white">
              <IonTitle className="backdrop-blur-sm ring-1 ring-gray-400/10" size="large">
                Postogon
              </IonTitle>
            </IonToolbar>
            <IonToolbar color="white">
            <IonItem slot="start" lines="none">
            <IonSegment value={feed} color="dark">
                    <IonSegmentButton value="public" onClick={() => setFeed(fetchPostsFeed.PUBLIC)} className={feed === fetchPostsFeed.PUBLIC ? "text-gray-800" : "text-gray-400"}> Public </IonSegmentButton>
                    <IonSegmentButton value="private" onClick={() => setFeed(fetchPostsFeed.PRIVATE)} className={feed === fetchPostsFeed.PRIVATE ? "text-gray-800" : "text-gray-400"}> Private </IonSegmentButton>
                  </IonSegment>
            </IonItem>
            <IonItem slot="end" lines="none">
              <IonButton color="danger" routerDirection="forward" routerLink='createpost'>Create Post</IonButton>
            </IonItem>
            </IonToolbar>
          </IonHeader>
          <div id="ion-content-id">
            <Posts feed={feed} type={fetchPostsType.TIMELINE}></Posts>
          </div>
        </IonContent>
      </IonPage>
    </>

  );
};

export default LoggedInTimeline;