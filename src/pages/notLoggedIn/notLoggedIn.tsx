import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import NotLoggedInNav from './NotLoggedInNav';
import NotLoggedInNavSignUp from './NotLoggedInNavSignUp';
import NotLoggedInNavSignIn from './NotLoggedInNavSignIn';
import PublicRoute from '../../utils/PublicRoute';



const NotLoggedIn: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonPage>
    <IonRouterOutlet>
      <Route exact path={match.url} component={NotLoggedInNav} />
      <Route path={`${match.url}signup`} component={NotLoggedInNavSignUp} />
      <Route path={`${match.url}signin`} component={NotLoggedInNavSignIn} />
      <Route render={() => <Redirect to={match.url} />} />
    </IonRouterOutlet>
    </IonPage>
  );
};

export default NotLoggedIn;