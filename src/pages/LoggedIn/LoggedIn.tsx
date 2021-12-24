import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { home, person } from 'ionicons/icons';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { usePathname } from '../../utils/Common';
import HomeMenu from './HomeMenu/HomeMenu';
import LoggedInTimeline from './LoggedInTimeline';



const LoggedIn: React.FC<RouteComponentProps> = ({ match }) => {
    console.log(usePathname());
    return (<>
        <HomeMenu></HomeMenu>
              <IonTabs>
      <IonRouterOutlet>
      <Route exact path="/:tab(home)" component={LoggedInTimeline} />
      <Route path='/:tab(profile)' render={(props) => null}/>
      <Route render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
      <IonTabBar slot='bottom'>
                <IonTabButton tab='home' href='/home'>
                    <IonIcon icon={home}></IonIcon>
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab='profile' href='/profile'>
                <IonIcon icon={person}></IonIcon>
                    <IonLabel>Profile</IonLabel>
                </IonTabButton>
            </IonTabBar>
      </IonTabs></>
  );
};


export default LoggedIn;
