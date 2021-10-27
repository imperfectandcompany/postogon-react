import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonLoading, IonPage, IonTitle, IonToolbar, useIonAlert, useIonLoading } from '@ionic/react';
import { SetStateAction, useState } from 'react';
import axios from 'axios';


const NotLoggedInNavSignIn: React.FC = () => {


  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [present] = useIonAlert();
  const [error, setError] = useState<String | null>(null);


  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('https://api.postogon.com/auth', { username: email, password: password }).then(response => {
      setLoading(false);
    }).catch(error => {
      
      setLoading(false);
      if (error.response.status === 401) 
   
      present({
        header: 'There was a problem',
        message: error.response.data,
        buttons: [
          { text: 'Ok', handler: (d) => console.log('Error acknowledged') },
        ],
        onDidDismiss: (e) => console.log('Error dismissed'),
      })      
      else 
     setError("Something went wrong. Please try again later.");
    });
  }

    return (
      <IonPage>
      <IonHeader>
      <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
            handleLogin()}}  
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
