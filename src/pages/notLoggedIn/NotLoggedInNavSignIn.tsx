import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { SetStateAction, useState } from 'react';

const NotLoggedInNavSignIn: React.FC = () => {

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  function handleSubmit(){
    console.log({email})
    console.log({password})
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
          <IonButton onClick={()=> handleSubmit}>Submit</IonButton>
          </div>        
          </div>      
        </IonList>
      </IonContent>
    </IonPage>
    );
  };

export default NotLoggedInNavSignIn;
