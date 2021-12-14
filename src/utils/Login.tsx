  // set the token cookies for the users
  export const setUserToken = (token: object) => {
    const d = new Date();
    d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie =
      "POSTOGONID=" + token + ";" + expires + ";path=/";
    document.cookie = "POSTOGONID_=1;" + expires + ";path=/";
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

    export const setLoginDetails = async (data: string) => {
      const userDetails = JSON.parse(data);
      await setUserToken(userDetails['Token']);
    }
