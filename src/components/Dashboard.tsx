import { Route } from 'react-router'
import Home from './Dashboard/Home';
import Navbar from './Dashboard/Navbar';
import Dashboardnew from './Home/dashboardnew'

 function Dashboard() {
  return (
    <div className="">
  <Navbar></Navbar>
  <Route exact path="/home" component={Home} />
  <Route exact path="/search" component={Dashboardnew} />

    </div>
    );
}

export default Dashboard;