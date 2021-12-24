import { IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import LoggedInTimeline from './LoggedInTimeline';



const LoggedIn: React.FC<RouteComponentProps> = ({ match }) => {
  return (
              <IonTabs>
      <IonRouterOutlet>
      <Route exact path="/:tab(home)" component={LoggedInTimeline} />
      <Route path='/:tab(profile)' render={(props) => null}/>
      <Route render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
      <IonTabBar slot='bottom'>
                <IonTabButton tab='home' href='/home'>
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab='profile' href='/profile'>
                    <IonLabel>Profile</IonLabel>
                </IonTabButton>
            </IonTabBar>
      </IonTabs>
  );
};


export default LoggedIn;
