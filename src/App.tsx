import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, useIonLoading } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import NotLoggedIn from './pages/notLoggedIn/notLoggedIn';

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
import NotLoggedInNavSignIn from './pages/notLoggedIn/NotLoggedInNavSignIn';
import { useEffect, useState } from 'react';
import { getToken, removeLoginSession, setLoginDetails } from './utils/Common';
import axios from 'axios';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';


function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
 
    axios.get(`https://api.postogon.com/verifyToken?token=${token}`).then(response => {
      setLoginDetails(JSON.stringify(response.data));
      setAuthLoading(false);
    }).catch(error => {
      removeLoginSession();
      setAuthLoading(false);
    });
  }, []);
 
  if (authLoading && getToken()) {
    present({
      message: 'Loading...',
      duration: 3000
    })
  }

    
  return (
    <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
      <PublicRoute>
      <Route path="/" render={props => <NotLoggedIn {...props} />} />
      </PublicRoute>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  );
}

export default App;
