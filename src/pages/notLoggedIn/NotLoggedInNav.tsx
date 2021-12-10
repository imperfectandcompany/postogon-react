import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { mail, star } from 'ionicons/icons';
import { useState } from 'react';
import styles from './NotLoggedInNav.module.css'; // Import css modules stylesheet as styles
import NotLoggedInNavTOS from './NotLoggedInTOS';


const NotLoggedInNav: React.FC = () => {

  const [showTos, setShowTos] = useState(false);

  return (
    <IonPage  className={`${styles.bg}`}>
      <IonContent >
      <IonHeader class="ion-no-border" className={`${styles.text}`}  collapse="condense" >
        <div className="flex space-x-4 ion-justify-content-center ion-align-items-center mt-12 mb-14 text-4xl sm:text-6xl md:text-8xl lg:text-8xl font-bold">
          <img src={process.env.PUBLIC_URL + '/assets/icon/icon.svg'} className="w-12 sm:w-24 md:w-32 lg:w-36" alt="image" />
          <div className="text-white">Postogon</div>
        </div>
      </IonHeader>
        <NotLoggedInNavTOS showTos={showTos} setShowTos={setShowTos} />


        <div className="p-12">
          <div className="flex flex-col justify-center">
            <h1 className="inline-block tracking-wider align-top text-white text-center text-3xl lg:text-6xl font-bold mt-6 md:mt-24 mb-20">
              Be yourself here and relax.
            </h1>

            <div className="ion-margin-bottom">
              <IonButton className="flex font-bold" color="white" fill="outline" routerLink="signin">
              <IonIcon slot="start" icon={mail} />
                  Sign in with email
              </IonButton>
              <IonButton className="flex font-bold" color="white" fill="clear" routerLink="signup">New account</IonButton>

              
            </div>

            <IonLabel className="ion-margin-top">
              <IonText color="white">
                <p className="ion-text-center ion-margin-vertical">
                  By continuing, you agree to our <button className="underline select-none focus:select-none cursor-pointer hover:text-gray-100 focus:text-opacity-50 transition" onClick={() => setShowTos(true)}>Terms of Service</button>.
                  We commit to protecting your data, read more about our <span className="underline">Privacy Policy</span> and <span className="underline">Cookies Policy</span>.
                </p>
              </IonText>
            </IonLabel>
            <div className="ion-text-center">
              <IonButton fill="clear" color="white" className=" lg:text-2xl font-bold" >
                Trouble getting in?
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotLoggedInNav;
