import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';

  const NotLoggedInNav: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Postogon</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem routerLink="signup">
              <IonLabel>Get started</IonLabel>
            </IonItem>
            <IonItem routerLink="signin">
              <IonLabel>Sign in</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    );
  };

export default NotLoggedInNav;
