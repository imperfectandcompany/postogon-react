import { Route } from 'react-router'
import Home from './Dashboard/Home';
import Navbar from './Dashboard/Navbar';
import Profile from './Dashboard/Profile';
import Post from './Dashboard/Post';
import BottomNav from './Dashboard/BottomNav';

 function Dashboard() {
  return (
    <div className="">
  <Navbar></Navbar>
  <Route exact path="/home" component={Home} />
  <Route exact path="/profile" component={Profile} />
  <Route path='/profile/:username' component={Profile} />
  <Route exact path="/post/:id" component={Post} />
<BottomNav></BottomNav>
    </div>
    );
}

export default Dashboard;