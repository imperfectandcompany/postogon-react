import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { mail, star } from 'ionicons/icons';
import { useState } from 'react';
import styles from './NotLoggedInNav.module.css'; // Import css modules stylesheet as styles
import NotLoggedInNavTOS from './NotLoggedInTOS';


const NotLoggedInNav: React.FC = () => {

  const [showTos, setShowTos] = useState(false);

  return (
    <IonPage className={`${styles.bg}`}>
      <IonContent >

        <NotLoggedInNavTOS showTos={showTos} setShowTos={setShowTos} />


        <div className="md:row-start-1 md:col-start-2 md:col-end-2 p-12">
          <div className="flex flex-col justify-center h-full">

            <div className="flex space-x-4 justify-center items-center text-4xl lg:text-6xl mt-12 mb-14">
              <img src={process.env.PUBLIC_URL + '/assets/icon/icon.svg'} className="w-16 md:w-32" alt="image" />
              <div className="text-white text-center text-4xl lg:text-7xl font-bold" slot="fixed">Postogon</div>
            </div>

            <h1 className="inline-block tracking-wider align-top text-white text-center text-3xl lg:text-6xl font-bold mt-24 mb-20" slot="fixed">
              Be yourself here and relax.
            </h1>

            <div className="flex flex-col" slot="fixed">
              <div>
                <IonButton className="flex font-bold" color="white" fill="outline" routerLink="signin">
                  <IonIcon slot="start" icon={mail} />
                  Sign in with email
                </IonButton>
              </div>
              <div className="mt-4 mb-2">
                <IonButton className="flex font-bold" color="white" fill="clear" routerLink="signup">New account</IonButton>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-start justify-start">
                <p className="flex-1 text-xs tracking-wider leading-tight text-center text-white lg:text-2xl mb-6" slot="fixed">
                  By continuing, you agree to our <button className="underline select-none focus:select-none cursor-pointer hover:text-gray-100 focus:text-opacity-50 transition" onClick={() => setShowTos(true)}>Terms of Service</button>. We commit to protecting your data, read more about our <span className="underline">Privacy Policy</span> and <span className="underline">Cookies Policy</span>.
                </p>
              </div>
              <button className="flex mx-auto text-white text-center text-lg lg:text-2xl font-bold" slot="fixed">
                Trouble getting in?
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotLoggedInNav;
