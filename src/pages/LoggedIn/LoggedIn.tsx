import { IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { home, person } from 'ionicons/icons';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import HomeMenu from './HomeMenu/HomeMenu';
import LoggedInCreatePost from './LoggedInCreatePost';
import LoggedInTimeline from './LoggedInTimeline';



const LoggedIn: React.FC<RouteComponentProps> = ({ match }) => {
    return (<>
        <HomeMenu></HomeMenu>
              <IonRouterOutlet >
      <Route exact path="/home" component={LoggedInTimeline} />
      <Route exact path="/createpost" component={LoggedInCreatePost} />
      <Route path='/profile' render={(props) => null}/>
      <Route render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
      <IonTabBar slot='bottom'>
                <IonTabButton  tab='home' href='/home'>
                    <IonIcon  icon={home}></IonIcon>
                </IonTabButton>
                <IonTabButton tab='profile' href='/profile'>
                <IonIcon icon={person}></IonIcon>
                </IonTabButton>
            </IonTabBar>
      </>
  );
};


export default LoggedIn;
