import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonRow, IonSegment, IonSegmentButton, IonSpinner, IonTextarea, IonTitle, IonToolbar, useIonPopover } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAddNewPostMutation } from '../../features/api/apiSlice';
import { getToken } from '../../utils/Common';
import styles from "./CreatePost.module.css"; // Import css modules stylesheet as styles


function CreatePost() {



  return (<>
      <IonButton fill="clear" size="large" color="pprimary" routerLink={ `/createpost`} className="" aria-expanded="false">
      Post
      </IonButton>
  </>)
}

export default CreatePost;