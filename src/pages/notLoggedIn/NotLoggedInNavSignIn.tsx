import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonLoading, IonPage, IonProgressBar, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../../AuthedContext';
import React from 'react';
import styles from './NotLoggedInNavSignIn.module.css'; // Import css modules stylesheet as styles
import { informationCircle } from 'ionicons/icons';
import Loading from '../../components/Loading/Loading';



function NotLoggedInNavSignIn() {
  const [email, setEmail] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState<string>();
  const [present, dismiss] = useIonToast();

  const { login } = React.useContext(AuthContext);
  const history = useHistory();


  

  // handle button click of login form
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
    if(email && password){
      let result = await login({ user: email, password: password });
      if (result) {
        dismiss();
        setLoading(false);
        history.push("/home");
      } else {
        setLoading(false);
          present({
            keyboardClose: true,
            translucent: true,
            duration:1000,
            icon:informationCircle,
            cssClass: styles.toasts,
            buttons: [{ text: 'OK', handler: () => dismiss(), cssClass: styles.toasts }],
            message: "Something went wrong. Please try again.",
          })
      }
    }
    setLoading(false);
  }


  return (
    <IonPage className={`${styles.bg}`} >
      <IonHeader>
      {loading ?       <IonProgressBar type="indeterminate"></IonProgressBar>
 : <IonProgressBar type="indeterminate" class="invisible"></IonProgressBar>}
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
            <IonLabel class="ion-text-center" color="white">
            Welcome back!
            </IonLabel>
          </IonListHeader>
          <div className="flex flex-col">
            <form className="flex flex-col"  onSubmit={(e) => {
                              handleLogin(e)
                            }}>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput autofocus={true} autocomplete="email" clearInput={true} inputmode="email" enterkeyhint="next"  type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} required
></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput autocomplete="current-password" clearOnEdit={true} inputmode="text" enterkeyhint="go" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} required
></IonInput>
          </IonItem>
            <IonButton type="submit" role='cancel'  size="large"
            className="flex-none font-bold transition select-none ion-margin-top focus:select-none hover:text-gray-100 focus:text-gray-300 focus:text-opacity-50" color={loading ? "pprimary":"white"} fill="clear">     
Continue
</IonButton>
</form>

            <div className="mt-8 text-lg font-medium text-center text-white underline">Forgot password</div>
          </div>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default NotLoggedInNavSignIn;