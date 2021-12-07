import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonLoading, IonModal, IonPage, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonRouter, useIonToast } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { setLoginDetails } from '../../utils/Login';
import API from '../../utils/API';
import { Redirect, RouteComponentProps, useHistory } from 'react-router';
import AuthContext from '../../AuthedContext';
import React from 'react';
import styles from './NotLoggedInNav.module.css'; // Import css modules stylesheet as styles
import { chevronBack, chevronDown, chevronUp } from 'ionicons/icons';



function NotLoggedInNavTOS({ setShowTos, showTos }: any) {

  return (

    <IonModal isOpen={showTos} swipeToClose={true} cssClass={`${styles.modal}`} onDidDismiss={() => setShowTos(false)} >

      <IonHeader>
        <IonToolbar className={`${styles['modal-toolbar']}`}>
          <IonButtons slot="start" className="cursor-pointer focus:cursor-default" onClick={() => setShowTos(false)}>
            <IonIcon slot="icon-only" icon={chevronDown} />
          </IonButtons>
          <IonTitle>Terms of Service</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent forceOverscroll={true} class={`${styles['modal-content']}`}>
        <div className="flex flex-col space-y-6 p-6 text-white text-left tracking-wide leading-relaxed">
          <div>
            <p className="text-lg lg:text-2xl mb-6">
              Please understand the following Terms of Service in which you are in agreement with by accessing or
              registering on Postogon.</p>
          </div>
          <div className="flex flex-col space-y-2">
            <div className=" text-xl font-semibold lg:text-3xl">
              Postogon
            </div>
            <div className="text-sm">
              “Postogon” refers to the platform on https://www.postogon.com and may not be confused as something else.
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="text-xl font-semibold lg:text-3xl">
              Imperfect and Company
            </div>
            <div className="text-sm">
              "Us", "We", "Our", "The company", all refers to Imperfect and Company as a group, as a company. We are not responsible for any mistakes you may have made with our identity.
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="text-xl font-semibold lg:text-3xl">
              Understand
            </div>
            <div className="text-sm">
              By being on our platform, you understand that you are accountable for your own mistakes. You understand that if you do not represent the values that the company stands for then your account will be dealt with accordingly and as fairly as possible across all branches owned by us.  You understand that since Imperfect and Company operates and is hosted in the United States that the Electronic Signatures in Global and International Commerce Act (ESGICA) is in effect and failure to follow these rules will result in permanent removal from all branches of Imperfect and Company.
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="text-xl font-semibold lg:text-3xl">
              Acceptance
            </div>
            <div className="text-sm">
              You hereby agree that by accepting this TOS, you know that your contract with Postogon also correlates any service that is owned by us.
            </div>
          </div>
        </div>
      </IonContent>

    </IonModal>
  );
};

export default NotLoggedInNavTOS;