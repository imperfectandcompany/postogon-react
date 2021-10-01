import { Redirect, Route, RouteProps } from 'react-router';
import { getToken } from './Common';

export type PrivateRouteProps = {
  } & RouteProps;
  

  export default function PrivateRoute({...routeProps}: PrivateRouteProps) {
    if(getToken()) {
        return <Route {...routeProps} />;
    } else {
      return <Redirect to={{ pathname: '/login' }} />;
    }
  };