import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabs, useIonLoading, useIonRouter, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import PublicRoute from './utils/PublicRoute';
import { getToken, removeLoginSession } from './utils/Common';
import { setLoginDetails } from './utils/Login';
import LoggedIn from './pages/LoggedIn/LoggedIn';
import { verifyAuth } from './utils/VerifyAuth';
import NotLoggedIn from './pages/NotLoggedIn/NotLoggedIn';
import NotLoggedInNav from './pages/NotLoggedIn/NotLoggedInNav';
import NotLoggedInNavSignUp from './pages/NotLoggedIn/NotLoggedInNavSignUp';
import NotLoggedInNavSignIn from './pages/NotLoggedIn/NotLoggedInNavSignIn';
import LoggedInTimeline from './pages/LoggedIn/LoggedInTimeline';
import API from './utils/API';
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import PrivateRoute from './utils/PrivateRoute';
import AuthContext from './AuthedContext'
import React from 'react';



function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [present, dismiss] = useIonLoading();
  const { authValues } = React.useContext(AuthContext);



  const { verify } = React.useContext(AuthContext);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    let result = verify();
    if (result) {
      setAuthLoading(false);
      console.log("account verified");
    } else {
      setAuthLoading(false);
      console.log("account unverified");
    }
  }, []);

  if (authLoading && getToken()) {
    present({
      message: 'Loading...',
      duration: 1500
    })
  }

  return (
    <IonApp>
      {!authValues.authenticated && !getToken() ?
        <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" component={NotLoggedIn} />
        </IonRouterOutlet>
      </IonReactRouter> :
      (<IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" component={LoggedIn} />
          <Route render={() => <Redirect to="/home"/>} />
        </IonRouterOutlet>
      </IonReactRouter>)
      }





    </IonApp>
  );
}

export default App;

