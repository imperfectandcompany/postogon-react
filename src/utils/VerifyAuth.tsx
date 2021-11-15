import axios from "axios";
import { isContext } from "vm";
import API from "./API";
import { getToken, removeLoginSession } from "./Common";
import { setLoginDetails } from "./Login";


export   const verifyAuth = async () => {
  //get token from frontend
  const token = getToken();
  const isLoggedIn = await API.get(`verifyToken?token=${token}`).then((response: { data: JSON; }) => {
    setLoginDetails(JSON.stringify(response.data));
    return false;
  }).catch(() => {
    //if token is invalid then remove login session details and alert that the token is invalid
    removeLoginSession();
    return true;
  });
  if (isLoggedIn) {
    return true;
  } else {
    return { redirect: '/login' }; // If a user is not logged in, they will be redirected to the /login page
  }
}



export const verifyAuthz = () => {
    let isAuthed = false;
    //get token from frontend
    const token = getToken();
    //if user doesn't have a token cookie in the frontend, then return this
    if (!token) {
      //Wipe token and also login details
      removeLoginSession();
      console.log("Token undefined")
      return null;
    } else {
    //checks if token is true
     API.get(`verifyToken?token=${token}`).then((response: { data: JSON; }) => {
      //since response was successful, we set our login details
      setLoginDetails(JSON.stringify(response.data));
      console.log("Token verified")
      isAuthed = true;
      return isAuthed;
    }).catch(() => {
      //if token is invalid then remove login session details and alert that the token is invalid
      console.log("Token invalid")
      removeLoginSession();
    });
    }
  }