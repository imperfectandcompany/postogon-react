import { Route } from 'react-router';
import Login from './Home/Login';
import Navbar from './Home/Navbar';
import Main from './Home/Main';
import Join from './Home/Join';


 
function Home() {
  return (
    <div className="">
  <Navbar></Navbar>
  <Route exact path="/" component={Main} />
  <Route path="/login" component={Login} />
  <Route path="/join" component={Join} />
    </div>
  );
}


 
export default Home;