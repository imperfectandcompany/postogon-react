import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonMenuToggle, IonItem, IonList, IonMenu, IonRouterOutlet, IonCol, IonLabel, IonRow, IonThumbnail } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { useState } from 'react';
import styles from './HomeMenu.module.css'; // Import css modules stylesheet as styles

const HomeMenu: React.FC = () => {



  
  return (
    <>
    <IonMenu side="start" menuId="first" content-id="main-content">
<IonContent>
  <IonRow className={`${`styles.menu-layout`}`}>
    <IonCol size="auto">
      <div className="col-inner">
        <div className="workspace-list ion-margin-bottom">
          <div className="workspace-item">
            <IonThumbnail>
              <img src="assets/img/logo.png" alt=""/>
            </IonThumbnail>
            <div className="workspace-title">Postogon</div>
          </div>
        </div>

        <IonButton fill="clear" size="small">
          <IonIcon slot="icon-only" name="add-outline"></IonIcon>
        </IonButton>
      </div>
    </IonCol>

    <IonCol>
      <div className="col-inner">
        <IonList>
          <IonItem lines="full">
            <IonLabel>
              <h2><strong>Postogon</strong></h2>
              <p>Postogon.com</p>
            </IonLabel>
          </IonItem>

          <IonItem lines="none">
            <IonIcon slot="start" name="people-outline" size="small"></IonIcon>
            <IonLabel>People</IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonIcon slot="start" name="person-add-outline" size="small"></IonIcon>
            <IonLabel>Invite people</IonLabel>
          </IonItem>
          <IonItem lines="full">
            <IonIcon slot="start" name="help-circle-outline" size="small"></IonIcon>
            <IonLabel>Help</IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonIcon slot="start" name="settings-outline" size="small"></IonIcon>
            <IonLabel>Preferences</IonLabel>
          </IonItem>
          <IonItem lines="full">
            <IonIcon slot="start" name="log-out-outline" size="small"></IonIcon>
            <IonLabel>Sign out of Postogon</IonLabel>
          </IonItem>

          <IonItem lines="none" href="https://imperfectandcompany.com" target="_blank" rel="noreferrer noopener">
            <IonIcon slot="start" name="open-outline" size="small"></IonIcon>
            <IonLabel><strong>imperfectandcompany.com</strong></IonLabel>
          </IonItem>
        </IonList>
      </div>
    </IonCol>
  </IonRow>
</IonContent>
</IonMenu>
  </>
  );
};

export default HomeMenu;