import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router';
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

<div className="z-10 flex justify-between w-full bg-white border-b border-gray-200">
{feed === "public" ? <div className="flex bg-white"><button className="hover:bg-gray-100 hover:text-blue-600 font-bold ripple-bg-white text-blue-500 select-none py-4 px-6 block bg-white cursor-default" onClick={()=> {setFeed("public")}}>Public</button> <button className="hover:bg-gray-100 hover:text-blue-600 py-4 px-6 bg-white text-gray-500 block select-none" onClick={()=> {setFeed("private")}}>Private</button></div> : <div className="flex bg-white"><button className="hover:bg-gray-100 bg-white hover:text-blue-600  py-4 px-6 text-gray-500 block" onClick={()=> {setFeed("public")}}>Public</button> <button className="hover:bg-gray-100  bg-white ripple-bg-white select-none  cursor-default hover:text-blue-600 font-bold text-blue-500 py-4 px-6 block select-none" onClick={()=> {setFeed("private")}}>Private</button></div>}
<div className="hover:bg-gray-100 hover:text-gray-600 ripple-bg-white bg-white text-gray-500 select-none py-4 px-6 block cursor-default">More</div>
</div>

<Posts feed={feed} type="timeline"></Posts>


</div>
        </IonContent>
      </IonPage>
    );
  };

export default LoggedInTimeline;