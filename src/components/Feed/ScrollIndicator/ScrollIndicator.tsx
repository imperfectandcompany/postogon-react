import React, { useRef, useState } from 'react';
import MoreOptions from '../MoreOptions';
import { bookmarkOutline, chatbubbleEllipses, chatbubbleOutline, chatbubblesOutline, chevronBack, ellipseOutline, ellipsisHorizontal, ellipsisVertical, ellipsisVerticalCircle, ellipsisVerticalSharp, heart, heartOutline, optionsOutline, paperPlaneOutline, reload, sendOutline, shareOutline } from 'ionicons/icons';
import { IonAvatar, IonBackButton, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonModal, IonNote, IonRippleEffect, IonRow, IonText, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import styles from "./SinglePost.module.css"; // Import css modules stylesheet as styles
import { IPost } from '../../../features/post/postSlice';
import Posts from '../Posts';

interface ParentCompProps {
    childComp?: React.ReactNode;
  }

export const ScrollIndicator: React.FC<ParentCompProps> = ({ children }) => {
    const [scroll, setScroll] = React.useState(0.00);
  
    const onScrollProgress = () => {
      const html = document.documentElement;
      const scrollPx = html.scrollTop;
      const winHeightPx = html.scrollHeight - html.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
  
      setScroll(scrolled);
    };
    React.useEffect(() => {
      window.addEventListener('scroll', onScrollProgress);
      return () => {
        window.removeEventListener('scroll', onScrollProgress);
      };
    }, []);
  
    const inlineStyle = {
      height: '6px',
      display: 'hidden',
      background: '#4C1D95',
      width: scroll,
    };
  
    return (
      <>
        <div className="top-0 left-0 w-screen h-1.5 fixed z-40 shadow-2xl bg-gray-300">
   <div style={inlineStyle} />
        </div>
        {children}
      </>
    );
  };