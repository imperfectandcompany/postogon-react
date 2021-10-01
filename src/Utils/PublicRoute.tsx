import { Redirect, Route, RouteProps } from 'react-router';
import { getToken } from './Common';

export type PublicRouteProps = {
  } & RouteProps;
  

  export default function PublicRoute({...routeProps}: PublicRouteProps) {
    if(!getToken()) {
        return <Route {...routeProps} />;
    } else {
      return <Redirect to={{ pathname: '/home' }} />;
    }
  };