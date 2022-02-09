import { Redirect, Route } from 'react-router-dom';
import { IonAlert, IonApp, IonRouterOutlet, useIonToast } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { alertController } from '@ionic/core';
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
import { useEffect, useRef, useState } from 'react';
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
  //utilize ref object to hold a reference to the callback that will be used in the alert
  const [leaveConfirmMessage, setLeaveConfirmMessage] = useState<string>();
  const confirmCallback = useRef<(ok: boolean) => void>();

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
      <IonReactRouter
        getUserConfirmation={(message, callback) => {
          setLeaveConfirmMessage(message);
          confirmCallback.current = callback;
        }}
      >
        <Route
          path="/"
          render={(props) => {
            return !authValues.authenticated && !getToken() ? <NotLoggedIn {...props} /> : <LoggedIn {...props} />;
          }}
        />
        <Route render={() => <Redirect to="/" />} />
        <IonAlert
          isOpen={!!leaveConfirmMessage}
          message={leaveConfirmMessage}
          buttons={[
            {
              text: "No",
              handler: () => {
                confirmCallback.current && confirmCallback.current(false);
              },
            },
            {
              text: "Yes",
              handler: () => {
                confirmCallback.current && confirmCallback.current(true);
              },
            },
          ]}
          onDidDismiss={() => setLeaveConfirmMessage(undefined)}
        />
      </IonReactRouter>
    </IonApp>
  );
}

export default App;

