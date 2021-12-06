import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonLoading, IonPage, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonRouter, useIonToast } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { setLoginDetails } from '../../utils/Login';
import API from '../../utils/API';
import { Redirect, RouteComponentProps, useHistory } from 'react-router';
import AuthContext from '../../AuthedContext';
import React from 'react';
import styles from './NotLoggedInNavSignIn.module.css'; // Import css modules stylesheet as styles



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
          buttons: [{ text: 'hide', handler: () => dismiss() }],
          message: "Something went wrong. Please try again.",
          onDidDismiss: () => console.log('dismissed'),
          onWillDismiss: () => console.log('will dismiss')
        })
    }
  }

  return (
    <IonPage >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <IonList>
          <IonListHeader lines="full">
            <IonLabel>
              <h1>Enter your details...</h1>
            </IonLabel>
          </IonListHeader>
          <div className="flex flex-col m-10">
            <IonItem className="flex">
              <IonLabel position="floating">Email</IonLabel>
              <IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem className="flex">
              <IonLabel position="floating">Password</IonLabel>
              <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
            </IonItem>
            <div className="flex justify-end mt-6">
              <IonButton
                onClick={() => {
                  handleLogin()
                }}
              >Submit</IonButton>
              <IonLoading
                isOpen={loading}
                onDidDismiss={() => setLoading(false)}
                message={'Please wait...'}
              />
            </div>
            <span className="mx-auto text-red-500 text-lg">{error}</span>
          </div>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default NotLoggedInNavSignIn;