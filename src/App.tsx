import './App.css';
import Continue from './pages/Continue/Continue';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Start from './pages/Start/Start';

function App() {
  return (
    <Router>
      <div>
        {    <Navbar></Navbar>
}
        <Switch>
          <Route path="/start">
            <Start></Start>
          </Route>
          <Route path="/continue">
            <Continue />
          </Route>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
