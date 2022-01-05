import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonMenuToggle } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { useState } from 'react';
import Posts from '../../components/Feed/Posts';
import { fetchPostsFeed, fetchPostsType } from '../../features/post/postSlice';

const LoggedInTimeline: React.FC = () => {

  const [feed, setFeed] = useState(fetchPostsFeed.PUBLIC);
  const logoColor = {
    filter: 'brightness(0.1)',
  };
  return (
    <>
    <IonPage id="main-content">
      <IonHeader class="ion-no-border">
        <IonToolbar color="white">
        <IonMenuToggle menu="first">
        <IonButton color="transparent" size="small">
        <img
             className="w-6 h-6 mx-auto motion-reduce:animate-spin" 
             style={logoColor}
             src={process.env.PUBLIC_URL + '/assets/icon/icon.svg'}
             alt="postogon logo"/>
              </IonButton>
              </IonMenuToggle>
              <IonTitle>Postogon</IonTitle>
              <IonButton color="transparent" size="small" slot="end">
                <IonIcon slot="icon-only" color="pprimary" icon={searchOutline}></IonIcon>
              </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} color="white" className="bg-gray-50">
          <div className="max-h-screen">
          <h1 className="sr-only">Recent posts</h1>
          <div className="z-0 flex justify-between w-full bg-white border-b border-gray-200 ">
            {feed === fetchPostsFeed.PUBLIC ? <div className="flex bg-white"><button className="block px-6 py-4 font-bold text-blue-500 bg-white cursor-default select-none hover:bg-gray-100 hover:text-blue-600 ripple-bg-white" onClick={() => { setFeed(fetchPostsFeed.PUBLIC) }}>Public</button> <button className="block px-6 py-4 text-gray-500 bg-white select-none hover:bg-gray-100 hover:text-blue-600" onClick={() => { setFeed(fetchPostsFeed.PRIVATE) }}>Private</button></div> : <div className="flex bg-white"><button className="block px-6 py-4 text-gray-500 bg-white hover:bg-gray-100 hover:text-blue-600" onClick={() => { setFeed(fetchPostsFeed.PUBLIC) }}>Public</button> <button className="block px-6 py-4 font-bold text-blue-500 bg-white cursor-default select-none hover:bg-gray-100 ripple-bg-white hover:text-blue-600" onClick={() => { setFeed(fetchPostsFeed.PRIVATE) }}>Private</button></div>}
            <div className="block px-6 py-4 text-gray-500 bg-white cursor-default select-none hover:bg-gray-100 hover:text-gray-600 ripple-bg-white">More</div>
          </div>
          <Posts feed={feed} type={fetchPostsType.TIMELINE}></Posts>
        </div>
      </IonContent>
    </IonPage>
    </>

  );
};

export default LoggedInTimeline;