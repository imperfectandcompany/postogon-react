import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import { getToken, removeLoginSession, setLoginDetails } from './Utils/Common';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import Join from './components/Home/Join';


 
function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
 
    axios.get(`https://api.postogon.com/verifyToken?token=${token}`).then(response => {
      setLoginDetails(JSON.stringify(response.data));
      setAuthLoading(false);
    }).catch(error => {
      removeLoginSession();
      setAuthLoading(false);
    });
  }, []);
 
  if (authLoading && getToken()) {
    return <div className="content"><Loading></Loading></div>
  }
    
  return (
      <BrowserRouter>
            <Switch>
            <PublicRoute exact path="/" component={Home} />
            <PrivateRoute path="/home" component={Dashboard} />
            <PublicRoute path="/login" component={Home} />
            <PublicRoute path="/join" component={Home} />

            </Switch>
      </BrowserRouter>
  );
}
 
export default App;