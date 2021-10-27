import { IonRouterOutlet } from '@ionic/react';
import { Route, RouteComponentProps } from 'react-router';
import NotLoggedInNav from './NotLoggedInNav';
import NotLoggedInNavSignIn from './NotLoggedInNavSignIn';
import NotLoggedInNavSignUp from './NotLoggedInNavSignUp';


const notLoggedIn: React.FC<RouteComponentProps> = ({match}) => {
  return (
    <IonRouterOutlet>
      <Route exact path={match.url} component={NotLoggedInNav} />
      <Route path={`${match.url}signup`} component={NotLoggedInNavSignUp} />
      <Route path={`${match.url}signin`} component={NotLoggedInNavSignIn} />
    </IonRouterOutlet>
  );
};

export default notLoggedIn;
