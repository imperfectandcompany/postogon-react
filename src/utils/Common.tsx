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
  if(getCookieValue('POSTOGONID_') == "1"){
    if(getCookieValue('POSTOGONID') !== "1"){
      return getCookieValue('POSTOGONID');
    } else{
      return false;
    }
  } else {
    return false;
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

  export const deleteToken = () => {
    const token = getToken();
    if (!token) {
      return;
    }
    axios.delete(`https://api.postogon.com/deleteToken?token=${token}`).then(res => {
    console.log('Removed Token from backend');
  })
  }

  export const removeLoginSession = () => {
    //remove user token cookies from frontend
    removeUserToken();
    deleteToken();
    //remove general stored data from session storage originally set on login or useeffect from app.tsx
    sessionStorage.removeItem('uid');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    console.log('Removed user data from session storage');
  }