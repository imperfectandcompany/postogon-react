import axios from "axios";
import { useLocation } from 'react-router-dom';

// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('username');
  if (userStr) return JSON.parse(userStr);
  else return null;
}

// return the email data from the session storage
export const getEmail = () => {
  const emailStr = sessionStorage.getItem('email');
  if (emailStr) return JSON.parse(emailStr);
  else return null;
}

// return the uid data from the session storage
export const getUid = () => {
  const uidStr = sessionStorage.getItem('uid');
  if (uidStr) return JSON.parse(uidStr);
  else return null;
}

  // return the token from the session storage
  export const getToken = () => {
    const getCookieValue = (name: string) =>
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";
    if(getCookieValue('POSTOGONID') !== "1"){
      return getCookieValue('POSTOGONID');
    } else{
      return null;
    }
  }
   
  // remove the token and user from the session storage
  export const removeUserToken = () => {
    //update and or create cookies
    let expires = "expires=expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie =
      "POSTOGONID=1;" +
      expires +
      ";path=/";
    document.cookie = "POSTOGONID_=1;" + expires + ";path=/";
    console.log('Removed Token from frontend');
  }  
 
  // custom hook to get the current pathname in React
  export const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  }

  export const setLoginDetails = (data: string) => {
  const userDetails = JSON.parse(data);
  setUserToken(userDetails['Token']);
  setUserSession(userDetails['Uid'],userDetails['Username'],userDetails['Email']);
  }

  export const removeLoginSession = () => {
    const token = getToken();
    if (!token) {
      return;
    }
    axios.delete(`https://api.postogon.com/deleteToken?token=${token}`).then(res => {
    console.log('Removed Token from backend');
  })
    removeUserToken();
    sessionStorage.removeItem('uid');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    console.log('Removed user data from session storage');
  }
   
  // set the token and user from the session storage
  export const setUserToken = (token: object) => {
      const d = new Date();
      d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie =
        "POSTOGONID=" + token + ";" + expires + ";path=/";
      document.cookie = "POSTOGONID_=1;" + expires + ";path=/";
      console.log("User token set!")
  }

  //set user's id, username, and email
 export const setUserSession = (uid:object, username:object, email:object) => {
  sessionStorage.setItem('uid', JSON.stringify(uid));
  console.log("Uid token set!")  
  sessionStorage.setItem('username', JSON.stringify(username));
  console.log("Username token set!")  
  sessionStorage.setItem('email', JSON.stringify(email));
  console.log("Email token set!")  
 }