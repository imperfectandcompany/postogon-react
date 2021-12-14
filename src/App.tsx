import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';


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


function App() {
  const [authLoading, setAuthLoading] = useState(true);
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
    return (
      <Loading></Loading>
    );
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

