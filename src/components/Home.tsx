import { Route } from 'react-router';
import Login from './Home/Login';
import Main from './Home/Main';
import Join from './Home/Join';
import { 
  Page,
  Navbar,
  NavbarBackLink,
  Block,
  Segmented,
  SegmentedButton,
  Link,
 } from 'tailwind-mobile/react';
import { useState } from 'react';



function Home() {
  const [activeSegmented, setActiveSegmented] = useState(1);

  return (
    <Page>
      <Navbar
        title="Navbar"
        subtitle="Subtitle"
        className="top-0 sticky"
        right={<Link navbar>Right</Link>}
      />
  <Route exact path="/" component={Main} />
  <Route path="/login" component={Login} />
  <Route path="/join" component={Join} />
  
  </Page>
  );
}


 
export default Home;