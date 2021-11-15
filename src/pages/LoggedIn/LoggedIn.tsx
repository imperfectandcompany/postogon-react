import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import LoggedInTimeline from './LoggedInTimeline';



const LoggedIn: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonPage>
      <IonRouterOutlet>
      <Route exact path="/home" component={LoggedInTimeline} />
      <Route render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
      </IonPage>
  );
};


export default LoggedIn;
