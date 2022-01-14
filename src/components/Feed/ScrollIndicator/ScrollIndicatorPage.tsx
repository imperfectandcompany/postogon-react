import React, { useRef, useState } from 'react';
import MoreOptions from '../MoreOptions';
import { bookmarkOutline, chatbubbleEllipses, chatbubbleOutline, chatbubblesOutline, chevronBack, ellipseOutline, ellipsisHorizontal, ellipsisVertical, ellipsisVerticalCircle, ellipsisVerticalSharp, heart, heartOutline, optionsOutline, paperPlaneOutline, reload, sendOutline, shareOutline } from 'ionicons/icons';
import { IonAvatar, IonBackButton, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonModal, IonNote, IonRippleEffect, IonRow, IonText, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import styles from "./SinglePost.module.css"; // Import css modules stylesheet as styles
import { IPost } from '../../../features/post/postSlice';
import Posts from '../Posts';
import { ScrollIndicator } from './ScrollIndicator';



export const ScrollIndicatorPage = () => (
    
    <ScrollIndicator>
      <div className="container px-5">
        <h2 className="mt-12 mb-4 text-lg font-bold text-gray-600 md:text-2xl">
          Just scroll
        </h2>
        <div>
          <p>
            React (web framework) React (also known as React.js or ReactJS) is an
            open-source, front end, JavaScript library[3] for building user
            interfaces or UI components. It is maintained by Facebook and a
            community of individual developers and companies. React can be used as
            a base in the development of single-page or mobile applications.
            However, React is only concerned with rendering data to the DOM, and
            so creating React applications usually requires the use of additional
            libraries for state management and routing. Next.js, Redux and React
            Router are respective examples of such libraries.
          </p>
          <br />
          <h2>N</h2>
          <h2>E</h2>
          <h2>X</h2>
          <h2>T</h2>
          <h2>J</h2>
          <h2>S</h2>
          <br />
          <h2>I</h2>
          <h2>S</h2>
          <br />
          <h2>T</h2>
          <h2>H</h2>
          <h2>E</h2>
          <br />
          <h2>B</h2>
          <h2>E</h2>
          <h2>S</h2>
          <h2>T</h2>
          <br />
          <h2>F</h2>
          <h2>R</h2>
          <h2>A</h2>
          <h2>M</h2>
          <h2>E</h2>
          <h2>W</h2>
          <h2>O</h2>
          <h2>R</h2>
          <h2>K</h2>
        </div>
      </div>
    </ScrollIndicator>
  );