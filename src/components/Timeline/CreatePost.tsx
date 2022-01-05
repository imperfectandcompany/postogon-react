import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonRow, IonSegment, IonSegmentButton, IonSpinner, IonTextarea, IonTitle, IonToolbar, useIonPopover } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { useState } from 'react';
import { useAddNewPostMutation } from '../../features/api/apiSlice';
import { getToken } from '../../utils/Common';
import styles from "./CreatePost.module.css"; // Import css modules stylesheet as styles


function CreatePost() {


  const [viewNewPost, setViewNewPost] = useState(false);

  return (<>


    <div className="bg-white">

      <IonButton color="danger" routerLink={ `/createpost`} id="trigger-button"  onClick={() => setViewNewPost(!viewNewPost)} className="text-white transition duration-200 rounded-md cursor-pointer focus:outline-none" aria-expanded="false">
        New post
        <svg className={viewNewPost ? 'rotate-180 inline-block w-4 h-4 ml-1 transition-transform transform' : 'inline-block w-4 h-4 ml-1 transition-transform transform'} fill="none" stroke="#FFFFFF" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      </IonButton>




    </div>
  </>)
}

export default CreatePost;