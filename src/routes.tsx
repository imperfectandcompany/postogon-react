import {BrowserRouter, Route, Switch} from 'react-router-dom';
import "./App.css";
import Continue from "./pages/Continue/Continue";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Start from "./pages/Start/Start";

const Routes = () => (
    <div>
  <BrowserRouter >
      {<Navbar></Navbar>}
      <Switch>
      <Route path="/start">
      <Start></Start>
      </Route>
      <Route path="/continue">
      <Continue />
      </Route>
      <Route path="/">
      {<Home></Home>}
      </Route>
      </Switch>
      </BrowserRouter>
    </div>
);

export default Routes;