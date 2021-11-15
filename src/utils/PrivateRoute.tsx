import React, { useEffect, useContext, useState } from "react";
import { Route, Redirect, RouteProps } from "react-router";
import API from "./API";
import { getToken, removeLoginSession } from "./Common";


export type PrivateRouteProps = {
  } & RouteProps;
  

  export default function PrivateRoute({...routeProps}: PrivateRouteProps) {
    if(getToken()) {
        return <Route {...routeProps} />;
    } else {
      return <Redirect to={{ pathname: '/signin' }} />;
    }
  };