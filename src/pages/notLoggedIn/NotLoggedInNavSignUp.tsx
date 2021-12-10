import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonLoading, IonPage, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonToast } from '@ionic/react';
import { useState } from 'react';
import axios from 'axios';
import { setLoginDetails } from '../../utils/Login';
import styles from './NotLoggedInNavSignIn.module.css'; // Import css modules stylesheet as styles


const NotLoggedInNavSignUp: React.FC = () => {

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  function handleSubmit(){
    console.log({email});
    console.log({password});
  }
    return (
      <IonPage className={`${styles.bg}`} >
      <IonHeader>
      <IonToolbar color="white" className={`${styles.toolbar}`} >
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonList className={`${styles.transparentbg}`}>
          <IonListHeader lines="full" >
            <IonLabel color="white">
              Get Started
            </IonLabel>
          </IonListHeader>
          <div className="flex flex-col m-10">
            <div className="text-center text-lg hidden text-white font-medium mb-8">We’re so excited to have you here! Creating an account is the first step.</div>
            <IonItem className="flex" color="none">
              <IonLabel position="floating">Email</IonLabel>
              <IonInput type="email" value={email}  onIonChange={e => setEmail(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem className="flex">
              <IonLabel position="floating">Password</IonLabel>
              <IonInput type="password" color="white" value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
            </IonItem>
            <div className="flex justify-center mt-6">
            <IonButton expand="block" size="large"
                            onClick={() => {
                              handleSubmit()
                            }}
            className="flex font-bold mt-24 select-none focus:select-none cursor-pointer hover:text-gray-100 focus:text-opacity-50 transition" color="white" fill="clear">     
Continue
</IonButton>
            </div>
          </div>
        </IonList>
      </IonContent>
    </IonPage>
    );
  };

export default NotLoggedInNavSignUp;