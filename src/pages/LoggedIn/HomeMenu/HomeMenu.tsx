import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonMenuToggle, IonItem, IonList, IonMenu, IonRouterOutlet, IonCol, IonLabel, IonRow, IonThumbnail } from '@ionic/react';
import { addOutline, helpCircleOutline, logOutOutline, peopleOutline, personAddOutline, searchOutline, settingsOutline } from 'ionicons/icons';
import React from 'react';
import { useState } from 'react';
import AuthContext from '../../../AuthedContext'

import styles from './HomeMenu.module.css'; // Import css modules stylesheet as styles

const HomeMenu: React.FC = () => {

  const { authValues } = React.useContext(AuthContext);


  return (
    <>
    <IonMenu side="start"  menuId="first" content-id="main-content">
<IonContent >
  <IonRow className={`${styles['menu-layout']}`}>
    <IonCol size="auto">
      <div className={`${styles['col-inner']}`}>
        <div className={" ion-margin-bottom"} >
          <div className={`${styles['workspace-item']}`}>
            <IonThumbnail>
            <img
             className="mx-auto motion-reduce:animate-spin" 
             src={process.env.PUBLIC_URL + '/assets/icon/icon.svg'}
             alt="postogon logo"/>
            </IonThumbnail>
            <div className={`${styles['workspace-title']}`}>Postogon</div>
          </div>
        </div>
        <IonButton fill="clear" size="small">
          <IonIcon slot="icon-only" icon={addOutline}></IonIcon>
        </IonButton>
      </div>
    </IonCol>

    <IonCol size="auto">
      <IonList  className="bg-neutral-900">
          <IonItem lines="full">
            <IonLabel>
              <h2><strong>{authValues.username}</strong></h2>
              <p>Postogon.com</p>
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonIcon slot="start" icon={peopleOutline} size="small"></IonIcon>
            <IonLabel>People</IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonIcon slot="start" icon={personAddOutline} size="small"></IonIcon>
            <IonLabel>Invite people</IonLabel>
          </IonItem>
          <IonItem lines="full">
            <IonIcon slot="start" icon={helpCircleOutline} size="small"></IonIcon>
            <IonLabel>Help</IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonIcon slot="start" icon={settingsOutline} size="small"></IonIcon>
            <IonLabel>Preferences</IonLabel>
          </IonItem>
          <IonItem lines="full">
          <IonIcon slot="start" icon={logOutOutline} size="small"></IonIcon>
            <IonLabel>Sign out</IonLabel>
          </IonItem>
          <IonItem lines="none" href="https://imperfectandcompany.com" target="_blank" rel="noreferrer noopener">
            <IonIcon slot="start" name="open-outline" size="small"></IonIcon>
            <IonLabel><strong>imperfe</strong></IonLabel>
          </IonItem>
        </IonList>
    </IonCol>
    
  </IonRow>
</IonContent>
</IonMenu>
  </>
  );
};

export default HomeMenu;