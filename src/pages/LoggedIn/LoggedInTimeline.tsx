import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { useState } from 'react';
import Posts from '../../components/Feed/Posts';

const LoggedInTimeline: React.FC = () => {

  const [feed, setFeed] = useState("public");


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Postogon</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>

          <h1 className="sr-only">Recent posts</h1>

          <div className="z-0 flex justify-between w-full bg-white border-b border-gray-200">
            {feed === "public" ? <div className="flex bg-white"><button className="block px-6 py-4 font-bold text-blue-500 bg-white cursor-default select-none hover:bg-gray-100 hover:text-blue-600 ripple-bg-white" onClick={() => { setFeed("public") }}>Public</button> <button className="block px-6 py-4 text-gray-500 bg-white select-none hover:bg-gray-100 hover:text-blue-600" onClick={() => { setFeed("private") }}>Private</button></div> : <div className="flex bg-white"><button className="block px-6 py-4 text-gray-500 bg-white hover:bg-gray-100 hover:text-blue-600" onClick={() => { setFeed("public") }}>Public</button> <button className="block px-6 py-4 font-bold text-blue-500 bg-white cursor-default select-none hover:bg-gray-100 ripple-bg-white hover:text-blue-600" onClick={() => { setFeed("private") }}>Private</button></div>}
            <div className="block px-6 py-4 text-gray-500 bg-white cursor-default select-none hover:bg-gray-100 hover:text-gray-600 ripple-bg-white">More</div>
          </div>


          <Posts feed={feed} type="timeline"></Posts>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoggedInTimeline;