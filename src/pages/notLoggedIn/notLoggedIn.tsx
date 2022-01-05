import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import NotLoggedInNav from './NotLoggedInNav';
import NotLoggedInNavSignUp from './NotLoggedInNavSignUp';
import NotLoggedInNavSignIn from './NotLoggedInNavSignIn';



const NotLoggedIn: React.FC<RouteComponentProps> = () => {
  return (
    <IonPage>
    <IonRouterOutlet>
      <Route exact path="/" component={NotLoggedInNav} />
      <Route exact path="/signup" component={NotLoggedInNavSignUp} />
      <Route exact path="/signin" component={NotLoggedInNavSignIn} />
    </IonRouterOutlet>
    </IonPage>
  );
};

export default NotLoggedIn;