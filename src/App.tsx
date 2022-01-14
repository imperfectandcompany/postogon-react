import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, useIonToast } from '@ionic/react';
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

/* Animation library */
import 'animate.css';


/* Theme variables */
import './theme/variables.css';
import './theme/tailwind.css';
import { useEffect, useState } from 'react';
import { getToken } from './utils/Common';
import LoggedIn from './pages/LoggedIn/LoggedIn';
import NotLoggedIn from './pages/NotLoggedIn/NotLoggedIn';
import AuthContext from './AuthedContext'
import * as React from 'react'
import { Loading } from './components/Loading/Loading';
import { setupIonicReact } from '@ionic/react';

setupIonicReact({
});


function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const { authValues } = React.useContext(AuthContext);
  const toggleDarkModeHandler = () => {
    document.body.classList.toggle("dark");
  };
  const { verify } = React.useContext(AuthContext);

  toggleDarkModeHandler();
  
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    let result = verify;
    if (result) {
      setAuthLoading(false);
      console.log("account verified");
    } else {
      setAuthLoading(false);
      console.log("account unverified");
    }
  }, [verify]);

  if (authLoading && getToken()) {
    return (
      <Loading></Loading>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        
      <IonRouterOutlet>
      <Route
  path="/"
  render={(props) => {
    return !authValues.authenticated && !getToken() ? <NotLoggedIn {...props} /> : <LoggedIn {...props} />;
  }}
/>
              <Route render={() => <Redirect to="/" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;

