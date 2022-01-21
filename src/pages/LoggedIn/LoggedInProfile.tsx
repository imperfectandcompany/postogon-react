import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonMenuToggle, IonButtons, IonFooter, IonCol, IonRow, IonSpinner, IonItem, IonList, IonListHeader, useIonPopover, IonCard, IonCardContent, IonLabel, IonSegment, IonSegmentButton, IonTextarea, IonBackButton, IonRedirect, NavContext, ScrollDetail } from '@ionic/react';
import { chevronBack, searchOutline } from 'ionicons/icons';
import React from 'react';
import { useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import Posts from '../../components/Feed/Posts';
import { ScrollIndicatorPage } from '../../components/Feed/ScrollIndicator/ScrollIndicatorPage';
import { useAddNewPostMutation } from '../../features/api/apiSlice';
import { fetchPostsFeed, fetchPostsType } from '../../features/post/postSlice';
import { getToken } from '../../utils/Common';

const LoggedInProfile: React.FC = () => {
  const [feed, setFeed] = useState(fetchPostsFeed.PUBLIC);

  const [scroll, setScroll] = React.useState(0.00);
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

        <IonContent fullscreen={true} color="white" onScroll={()=>testFunc}>
        <article className="p-4 text-black border bg-gray-white rounded-b-xl">
  <div className="flex items-center">
    <img src="https://unavatar.now.sh/twitter/andrewmcodes" alt="Andrew Mason" className="w-16 h-16 rounded-full" />

    <div className="ml-3">
      <h5 className="text-lg font-medium ">Andrew Mason</h5>
      <div className="flow-root">
        <ul className="flex flex-wrap -m-1">
          <li className="p-1 leading-none">
            <a href="https://twitter.com/andrewmcodes" target="_blank" className="text-xs font-medium text-gray-300">
              Twitter
            </a>
          </li>

          <li className="p-1 leading-none">
            <a href="https://github.com/andrewmcodes" target="_blank" className="text-xs font-medium text-gray-300">
              GitHub
            </a>
          </li>

          <li className="p-1 leading-none">
            <a href="https://andrewm.codes/" target="_blank" className="text-xs font-medium text-gray-300">Website</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
<ScrollIndicatorPage></ScrollIndicatorPage>
  <ul className="mt-4 space-y-2">
    <li>
      <a
        href="https://github.com/andrewmcodes/shotgun"
        target="_blank"
        className="block h-full p-4 border border-gray-700 rounded-lg hover:border-pink-600"
      >
        <h5 className="font-medium text-white">Shotgun</h5>

        <p className="mt-1 text-xs font-medium text-gray-300">
          Ready to go Rails App with TailwindCSS, ViewComponent, Devise, and more!
        </p>
      </a>
    </li>

  </ul>
</article>
<IonSegment color="dark">
        <IonSegmentButton value="public" onClick={() => setFeed(fetchPostsFeed.PUBLIC)} className={feed === fetchPostsFeed.PUBLIC ? "text-gray-800":"text-gray-400"}> Public </IonSegmentButton>
    <IonSegmentButton value="private" onClick={() => setFeed(fetchPostsFeed.PRIVATE)} className={feed === fetchPostsFeed.PRIVATE ? "text-gray-800":"text-gray-400"}> Private </IonSegmentButton>
  </IonSegment>   

          <IonCard color="White" className="shadow-none ">
            <IonCardContent>
fwewew</IonCardContent>
            <IonRow className="justify-end">
              <div className="text-xs font-semibold text-gray-400 count"><span>ddd</span> / <span>280</span></div>
            </IonRow>

          </IonCard>
        </IonContent>

        <IonFooter className="bg-white border-2 border-t border-gray-100 ion-padding-bottom">
fawefrwaerw
        </IonFooter>
      </IonPage>
    </>

  );
};

export default LoggedInProfile;

