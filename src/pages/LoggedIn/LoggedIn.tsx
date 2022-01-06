import { IonBadge, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import { addCircle, addCircleOutline, calendar, home, homeOutline, informationCircle, map, notifications, notificationsOutline, person, personCircle, personOutline, search, searchOutline } from 'ionicons/icons';
import { useState } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import CreatePost from '../../components/Timeline/CreatePost';
import HomeMenu from './HomeMenu/HomeMenu';
import LoggedInCreatePost from './LoggedInCreatePost';
import LoggedInTimeline from './LoggedInTimeline';







const LoggedIn: React.FC<RouteComponentProps> = ({ match }) => {

    const [isVisible, setIsVisible] = useState(true);

    useIonViewWillEnter(() => {
      setIsVisible(true);
    });
  
    useIonViewWillLeave(() => {
      setIsVisible(false);
    });
  


    const tabs = [

        {
          name: "Home",
          url: "/home",
          activeIcon: home,
          icon: homeOutline,
          component: LoggedInTimeline
        },
        {
          name: "Search",
          url: "/search",
          activeIcon: search,
          icon: searchOutline,
          component: LoggedInTimeline
        },
        {
          name: "Add",
          url: "/add",
          activeIcon: addCircle,
          icon: addCircleOutline,
          component: LoggedInTimeline
        },
        {
          name: "Account",
          url: "/account",
          activeIcon: person,
          icon: personOutline,
          component: LoggedInTimeline
        },
        {
          name: "Notifications",
          url: "/notifications",
          activeIcon: notifications,
          icon: notificationsOutline,
          component: LoggedInTimeline
        }
    ];
    const [ activeTab, setActiveTab ] = useState(tabs[0].name);


    if (!isVisible) {
        return null;
      }
    

    return (<>

        <IonTabs onIonTabsDidChange={ e => setActiveTab(e.detail.tab) }>
          <IonRouterOutlet ionPage>

            { tabs.map((tab, index) => {

              return (

                <Route key={ index } exact path={ tab.url }>
                  <tab.component />
                </Route>
              );
            })}

            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/createpost">
                <LoggedInCreatePost></LoggedInCreatePost>
                </Route>
          </IonRouterOutlet>
          <IonTabBar translucent={true} color="dark" slot="bottom">
            { tabs.map((tab, barIndex) => {

              const active = tab.name === activeTab;

              return (

                <IonTabButton key={ `tab_${ barIndex }` } tab={ tab.name } href={ tab.url }>
                  <IonIcon icon={ active ? tab.activeIcon : tab.icon } />
                </IonTabButton>
              );
            })}
          </IonTabBar>
        </IonTabs>

      </>
  );
};


export default LoggedIn;
