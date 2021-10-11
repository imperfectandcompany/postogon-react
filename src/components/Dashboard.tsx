import { Route } from 'react-router'
import Home from './Dashboard/Home';
import Navbar from './Dashboard/Navbar';
import Profile from './Dashboard/Profile';

 function Dashboard() {
  return (
    <div className="">
  <Navbar></Navbar>
  <Route exact path="/home" component={Home} />
  <Route exact path="/profile" component={Profile} />
  <Route path='/profile/:username' component={Profile} />

    </div>
    );
}

export default Dashboard;