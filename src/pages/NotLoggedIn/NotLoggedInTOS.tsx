import { IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonText, IonTitle, IonToolbar } from '@ionic/react';
import styles from './NotLoggedInNav.module.css'; // Import css modules stylesheet as styles
import { chevronDown } from 'ionicons/icons';



const Sections = [
  { heading: 'Postogon', description: '“Postogon” refers to the platform on https://www.postogon.com and may not be confused as something else.' },
  { heading: 'Imperfect and Company', description: '"Us", "We", "Our", "The company", all refers to Imperfect and Company as a group, as a company. We are not responsible for any mistakes you may have made with our identity.' },
  { heading: 'Understand', description: 'By being on our platform, you understand that you are accountable for your own mistakes. You understand that if you do not represent the values that the company stands for then your account will be dealt with accordingly and as fairly as possible across all branches owned by us.  You understand that since Imperfect and Company operates and is hosted in the United States that the Electronic Signatures in Global and International Commerce Act (ESGICA) is in effect and failure to follow these rules will result in permanent removal from all branches of Imperfect and Company.' },
  { heading: 'Acceptance', description: 'You hereby agree that by accepting this TOS, you know that your contract with Postogon also correlates any service that is owned by us.' },
];

const listSections = Sections.map((section, index) =>
<div key={"listItem"+index+1} className="space-y-2 text-white">
<div className="text-xl font-semibold md:text-xlg lg:text-3xl">
<IonText>
<h1>{section.heading}</h1>
  </IonText>
</div>
<div className="text-sm md:text-md lg:text-lg">
<IonText>
<p>{section.description}</p>
  </IonText>
</div>



</div>



);

function NotLoggedInNavTOS({ setShowTos, showTos }: any) {

  return (

    <IonModal isOpen={showTos} swipeToClose={true}  className={`${styles.modal}`} onDidDismiss={() => setShowTos(false)} >

      <IonHeader collapse="condense">
        <IonToolbar className={`${styles['modal-toolbar']}`}>
          <IonButtons slot="start" className="cursor-pointer focus:cursor-default" onClick={() => setShowTos(false)}>
            <IonIcon slot="icon-only" color="white" icon={chevronDown} />
          </IonButtons>
          <IonTitle color="white">Terms of Service</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent forceOverscroll={true} class={`${styles['modal-content']}`} >
        <div className="flex flex-col p-6 mb-24 space-y-6 leading-relaxed tracking-wide text-left text-white">
          <div>
            <p className="mb-6 text-lg text-center md:text-xl lg:text-2xl">
              Please understand the following Terms of Service in which you are in agreement with by accessing or
              registering on Postogon.</p>
          </div>
          {listSections}

        </div>
      </IonContent>

    </IonModal>
  );
};

export default NotLoggedInNavTOS;