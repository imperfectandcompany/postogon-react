import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, useIonViewDidEnter } from '@ionic/react';
import { getAllByPlaceholderText } from '@testing-library/react';
import { addCircle, addCircleOutline, home, homeOutline, informationCircle, notifications, notificationsOutline, person, personOutline, search, searchOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import HomeMenu from './HomeMenu/HomeMenu';
import LoggedInCreatePost from './LoggedInCreatePost';
import LoggedInProfile from './LoggedInProfile';
import LoggedInTimeline from './LoggedInTimeline';
import styles from './LoggedIn.module.css'; // Import css modules stylesheet as styles


//functions used in page components to hide or show tabs *mandatory//each
export function hideTabs() {
    const tabsEl = document.querySelector('ion-tab-bar');
    if (tabsEl) {
        tabsEl.hidden = true;
    }
}

export function showTabs() {
    const tabsEl = document.querySelector('ion-tab-bar');
    if (tabsEl) {
        tabsEl.hidden = false;
    }
}

//necessary since translucent tab bar is absolute
export function addPaddingToContent() {
    setTimeout(() => {
        const container = document.querySelector('ion-content');
        if (container) {
             container.style.setProperty('--padding-bottom', '44px');
        }
        });
}



const LoggedIn: React.FC<RouteComponentProps> = ({ match }) => {


    const tabs = [
        {
            name: "Home",
            url: "/home",
            activeIcon: home,
            icon: homeOutline,
            component: LoggedInTimeline,
            children:
            {
                
            },
        },
        {
            name: "Search",
            url: "/search",
            activeIcon: search,
            icon: searchOutline,
            component: LoggedInTimeline
        },
        {
            name: "Profile",
            url: "/profile",
            activeIcon: person,
            icon: personOutline,
            component: LoggedInProfile
        },
        {
            name: "Notifications",
            url: "/notifications",
            activeIcon: notifications,
            icon: notificationsOutline,
            component: LoggedInProfile
        }
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].name);




    return (
        <>
            <IonTabs onIonTabsDidChange={e => setActiveTab(e.detail.tab)}>
                <IonRouterOutlet >
                    {tabs.map((tab, index) => {
                        return (
                            <Route key={index} exact path={tab.url} component={tab.component}>
                            </Route>
                        );
                    })}
                    <Route exact path='/createpost'>
                        <LoggedInCreatePost></LoggedInCreatePost>
                    </Route>
                    <Redirect exact from="/" to="/home" />
                </IonRouterOutlet>
                <IonTabBar slot="bottom" className={`${styles['transparent']}`} class="ion-no-border"  translucent={true} >
                    {tabs.map((tab, barIndex) => {
                        const active = tab.name === activeTab;
                        return (
                            <IonTabButton className={`${styles['tabbutton']}`} key={`tab_${barIndex}`} tab={tab.name} href={tab.url}>
                                <IonIcon className="text-gray-900" icon={active ? tab.activeIcon : tab.icon} />
                            </IonTabButton>
                        );
                    })}
                </IonTabBar>
            </IonTabs></>
    );
};


export default LoggedIn;
