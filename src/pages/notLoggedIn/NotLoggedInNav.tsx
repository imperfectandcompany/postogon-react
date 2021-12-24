import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonText } from '@ionic/react';
import { mail } from 'ionicons/icons';
import { useState } from 'react';
import styles from './NotLoggedInNav.module.css'; // Import css modules stylesheet as styles
import NotLoggedInNavTOS from './NotLoggedInTOS';


const NotLoggedInNav: React.FC = () => {

  const [showTos, setShowTos] = useState(false);

  return (
    <IonPage className={`${styles.bg}`}>
      <IonContent >



        <IonHeader>
        <IonGrid>
          <IonRow class="ion-margin-top space-x-4 text-3xl font-bold ion-justify-content-center ion-align-items-center mb-14 sm:text-6xl md:text-8xl lg:text-8xl">
          <img src={process.env.PUBLIC_URL + '/assets/icon/icon.svg'} className="w-12 sm:w-24 md:w-32 lg:w-36" alt="logo"/>
          <div>Postogon</div>
          </IonRow>
        </IonGrid>
        </IonHeader>
        <NotLoggedInNavTOS showTos={showTos} setShowTos={setShowTos} />


        <div className="p-12">
          <div className="flex flex-col justify-center">
            <h1 className="inline-block mt-6 mb-20 text-3xl font-bold tracking-wider text-center text-white align-top lg:text-6xl md:mt-24">
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
                  By continuing, you agree to our <button className="underline transition cursor-pointer select-none focus:select-none hover:text-gray-100 focus:text-opacity-50" onClick={() => setShowTos(true)}>Terms of Service</button>.
                  We commit to protecting your data, read more about our <span className="underline">Privacy Policy</span> and <span className="underline">Cookies Policy</span>.
                </p>
              </IonText>
            </IonLabel>
            <div className="ion-text-center ion-margin-bottom">
              <IonButton fill="clear" color="white" className="font-bold lg:text-2xl" >
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
