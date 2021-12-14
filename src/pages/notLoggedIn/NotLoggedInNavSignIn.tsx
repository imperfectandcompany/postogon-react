import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonLoading, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../../AuthedContext';
import React from 'react';
import styles from './NotLoggedInNavSignIn.module.css'; // Import css modules stylesheet as styles



function NotLoggedInNavSignIn() {
  const [email, setEmail] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState<string>();
  const [present, dismiss] = useIonToast();

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
          <IonTitle color="white">Sign In</IonTitle>
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
            <div className="mb-8 text-lg font-medium text-center text-white">We’re so excited to see you again!</div>
            <IonItem className="flex" lines="inset">
              <IonLabel color="white" position="floating">Email</IonLabel>
              <IonInput className="text-white" type="email" value={email}  onIonChange={e => setEmail(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem className="flex" lines="inset">
              <IonLabel color="white" position="floating">Password</IonLabel>
              <IonInput className="text-white" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
            </IonItem>
            <div className="flex justify-center mt-6">
            <IonButton expand="block" size="large"
                            onClick={() => {
                              handleLogin()
                            }}
            className="flex mt-24 font-bold transition cursor-pointer select-none focus:select-none hover:text-gray-100 focus:text-opacity-50" color="white" fill="clear">     
Continue
</IonButton>
              <IonLoading
                isOpen={loading}
                onDidDismiss={() => setLoading(false)}
                message={'Please wait...'}
              />
            </div>
            <div className="mt-8 text-lg font-medium text-center text-white underline">Forgot password</div>
          </div>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default NotLoggedInNavSignIn;