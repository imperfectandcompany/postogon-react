import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonMenuToggle, IonButtons, IonSearchbar, NavContext, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import { profile } from 'console';
import { addCircle, addCircleOutline, addCircleSharp, addOutline, chevronDown, pulseOutline, searchOutline } from 'ionicons/icons';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
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
  const scrollToTop= () => {
      contentRef.current && contentRef.current.scrollToTop(500);
  };
  

  useEffect(() => {
    scrollToTop();
  }, [feed]);

  const { navigate } = useContext(NavContext);

  // Call this function when required to redirect with the back animation
  const redirect = useCallback(
    () => navigate('/createpost', 'forward'),
    [navigate]
  ); 


  return (
    <>
      <IonPage id="main-content" className="bg-white">
        <IonHeader translucent={true}>
          <IonToolbar class="ion-no-border"  >
    <IonTitle><IonButton onClick={() => setFeed(fetchPostsFeed.PUBLIC)} fill="clear" color="white" className={feed === fetchPostsFeed.PUBLIC ? "font-bold text-black dark:text-white" : "text-black dark:text-white "}>Public</IonButton><IonButton onClick={() => setFeed(fetchPostsFeed.PRIVATE)} color="clear" fill="clear" className={feed === fetchPostsFeed.PRIVATE ? "font-bold text-black dark:text-white" : "text-black dark:text-white font-medium"}>Private</IonButton></IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={()=>redirect()}>
              <IonIcon className="text-red-500 dark:text-white"  icon={addCircleSharp}></IonIcon>
            </IonButton>
          </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true} ref={contentRef} scrollEvents={true} color="white">
          <IonHeader collapse="condense"  translucent={true} color="white">
            <IonToolbar color="white">
              <IonTitle className="backdrop-blur-sm ring-1 ring-gray-400/10" size="large">
                Postogon
  </IonTitle>
            </IonToolbar>
            <IonToolbar color="white">
              <div className="flex flex-row-reverse justify-between px-4 py-3">
              <div className="flex">




             <div onClick={()=>redirect()} className="flex items-center px-2 text-sm font-semibold text-white transition bg-red-500 rounded-md active:bg-red-800 active:text-gray-300/25">Create Post</div>
              </div>
              <IonButtons className="flex transition transition-delay-200" >
                <IonButton slot="end" onClick={() => setFeed(fetchPostsFeed.PUBLIC)} className={feed === fetchPostsFeed.PUBLIC ? "text-gray-800":"text-gray-400"} fill="outline">Public</IonButton>
                <IonButton slot="end" onClick={() => setFeed(fetchPostsFeed.PRIVATE)} className={feed === fetchPostsFeed.PRIVATE ? "text-gray-800":"text-gray-400"} fill="outline">Private</IonButton>
              </IonButtons>
            </div>
            </IonToolbar>
          </IonHeader>
            <Posts feed={feed} type={fetchPostsType.TIMELINE}></Posts>
        </IonContent>
      </IonPage>
    </>

  );
};

export default LoggedInTimeline;