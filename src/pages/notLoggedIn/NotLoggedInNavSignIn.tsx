import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonLoading, IonPage, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonRouter, useIonToast } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { setLoginDetails } from '../../utils/Login';
import API from '../../utils/API';
import { Redirect, RouteComponentProps, useHistory } from 'react-router';
import AuthContext from '../../AuthedContext';
import React from 'react';
import styles from './NotLoggedInNavSignIn.module.css'; // Import css modules stylesheet as styles
import { mail } from 'ionicons/icons';



function NotLoggedInNavSignIn() {
  const [email, setEmail] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState<string>();
  const [present, dismiss] = useIonToast();
  const [error, setError] = useState<String | null>(null);
  const [LoggedIn, setLoggedIn] = useState(false);
  const router = useIonRouter();
  const { authValues } = React.useContext(AuthContext);

  const { login } = React.useContext(AuthContext);
  const history = useHistory();


  // handle button click of login form
  const handleLogin = async () => {
    let result = await login({ user: email, password: password });
    if (result) {
      dismiss();
      history.push("/home");
    } else {
        present({

          cssClass: styles.toasts,
          buttons: [{ text: 'OK', handler: () => dismiss(), cssClass: styles.toats }],
          message: "Something went wrong. Please try again.",
          onDidDismiss: () => console.log('dismissed'),
          onWillDismiss: () => console.log('will dismiss')
        })
    }
  }

  return (
    <IonPage className={`${styles.bg}`} >
      <IonHeader>
        <IonToolbar color="none"  className={`${styles.toolbar}`} >
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList className={`${styles.transparentbg}`}>
          <IonListHeader lines="full" >
            <IonLabel  color="white">
              Welcome back!
            </IonLabel>
          </IonListHeader>
          <div className="flex flex-col m-10">
            <div className="text-center text-lg font-medium mb-8">We’re so excited to see you again!</div>
            <IonItem className="flex" color="none" lines="inset">
              <IonLabel position="floating">Email</IonLabel>
              <IonInput type="email" value={email}  onIonChange={e => setEmail(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem className="flex"  color="none" lines="inset">
              <IonLabel position="floating">Password</IonLabel>
              <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
            </IonItem>
            <div className="flex justify-center mt-6">
            <IonButton expand="block" size="large"
                            onClick={() => {
                              handleLogin()
                            }}
            className="flex font-bold mt-24 select-none focus:select-none cursor-pointer hover:text-gray-100 focus:text-opacity-50 transition" color="white" fill="clear">     
Continue
</IonButton>
              <IonLoading
                isOpen={loading}
                onDidDismiss={() => setLoading(false)}
                message={'Please wait...'}
              />
            </div>
            <div className="text-center text-lg font-medium mt-8 underline">Forgot password</div>

            <span className="mx-auto text-red-500 text-lg">{error}</span>
          </div>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default NotLoggedInNavSignIn;