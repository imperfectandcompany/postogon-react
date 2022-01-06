 // added useRef 
 import React, { useState, useRef } from 'react';
 import {IonSegment,IonSegmentButton,IonRow,IonCol,IonGrid,IonContent,IonSlides, 
         IonSlide,IonHeader, IonPage, IonTitle, 
         IonToolbar,IonButtons,IonMenuButton,IonSearchbar, IonCardSubtitle, IonIcon, IonReorder, IonReorderGroup, IonItem, IonBadge, IonLabel} from '@ionic/react';
import Posts from '../Feed/Posts';
import { fetchPostsFeed, fetchPostsType } from '../../features/post/postSlice';
import { addOutline, arrowBackOutline, arrowForwardOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { types } from 'util';
import { type } from 'os';

 //import Segment from '../components/Segment';
 const SwipableTabs: React.FC = () => {

   const [searchText, setSearchText] = useState('');

   // a ref variable to handle the current slider
   const slider = useRef<HTMLIonSlidesElement>(null);
   // a state value to bind segment value
   const [value, setValue] = useState("0");

   const slideOpts = {
     initialSlide: 0,
     speed: 400,
     loop: false,
     pagination: {
       el: null
     },
   
   };

   // a function to handle the segment changes
   const handleSegmentChange = (e: any) => {
     setValue(e.detail.value);
     slider.current!.slideTo(e.detail.value);
   };

   // a function to handle the slider changes
   const handleSlideChange = async (event: any) => {
     let index: number = 0;
     await event.target.getActiveIndex().then((value: any) => (index=value));
     setValue(''+index)
   }
   const [feed, setFeed] = useState(fetchPostsFeed.PUBLIC);

  
 return (
<div>

     </div>
 )
 }

 export default SwipableTabs;