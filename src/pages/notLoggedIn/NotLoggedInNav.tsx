import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import styles from './NotLoggedInNav.module.css'; // Import css modules stylesheet as styles

let firstStyle:Object = styles.bg;
let secondStyle:Object = styles.yes;




  const NotLoggedInNav: React.FC = () => {
    return (
      <IonPage className={`${styles.bg}`}>
        <IonContent  className={`${styles.img}`}>
        <div className="md:row-start-1 md:col-start-2 md:col-end-2 p-12">
      <div className="flex flex-col justify-center h-full">

        <div className="flex space-x-4 justify-center items-center text-4xl lg:text-6xl mt-12 mb-14">
        <img src={process.env.PUBLIC_URL + '/assets/icon/icon.svg'} height="64" width="64" alt="image" />
        <div className="text-white text-center text-4xl lg:text-7xl font-bold">Postogon</div>
        </div>

        <h1 className="inline-block tracking-wider align-top text-white text-center text-3xl lg:text-6xl font-bold mt-24 mb-20">
          Be yourself here and relax.
        </h1>

        <div className="flex flex-col">
        <div>
        <IonButton className="flex font-bold" color="white" fill="outline" routerLink="signin">Sign in with email</IonButton>
        </div>
        <div className="mt-4">
        <IonButton className="flex font-bold" color="white" fill="clear" routerLink="signup">New account</IonButton>
        </div>
        </div>

        <div className="mt-12">
        <div className="inline-flex items-start justify-start p-2.5">
    <p className="flex-1 text-xs tracking-wider leading-tight text-center text-white lg:text-2xl mb-6">
    By continuing, you agree to our <span className="underline">Terms of Service</span>. We commit to protecting your data, read more about our <span className="underline">Privacy Policy</span> and <span className="underline">Cookies Policy</span>.
      </p>
</div>
        <h1 className="text-white text-center text-lg lg:text-2xl font-bold">
          Trouble getting in?
        </h1>
        </div>
      </div>
    </div>
        </IonContent>
      </IonPage>
    );
  };

export default NotLoggedInNav;
