import "./App.css";
import Continue from "./pages/Continue/Continue";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import HomeIn from "./pages/LoggedIn/Home/Home";
import Start from "./pages/Start/Start";
import axios from "axios";
import Routes from './routes';

import { useEffect, useLayoutEffect, useState } from "react";
import React from "react";
import NavbarIn from "./components/Navbar/NavbarIn";
import Loading from "./components/Loading/Loading";

//lets us grab the exact value of the cookie
const getCookieValue = (name: string) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

function App() {

  const [isLoggedIn, updateLoggedIn] = useState(false);

  async function checkSession() {
    var matchCookieOne = getCookieValue("POSTOGONID");
    var matchCookieTwo = getCookieValue("POSTOGONID_");
    //if both cookies exist, then check the value for POSTOGONID in the backend
    if (matchCookieOne && matchCookieTwo) {
      axios
        .get("https://api.postogon.com/auth", {
          params: {
            token: matchCookieOne,
          },
        })
        .then(await function (response) {
         updateLoggedIn(true);
        })
        .catch(await function (error) {
          console.log(matchCookieOne);
          console.log(error);
        });
    }
    //if matchCookieTwo doesn't exist then send delete request and regenerate a new token
    else if (matchCookieOne && !matchCookieTwo) {
      //get userid, create a new token with user id, set cookie for the userid with the new token, delete old token
      //confirm token
      axios
        .get("https://api.postogon.com/auth", {
          params: {
            token: matchCookieOne,
          },
        })
        .then(await function (response) {
          //create new token with existing userid
          axios
            .post(
              "https://api.postogon.com/auth",
              {},
              {
                params: {
                  token: matchCookieOne,
                },
              }
            )
            .then(function (response) {
              //update and or create cookies
              const d = new Date();
              d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
              let expires = "expires=" + d.toUTCString();
              document.cookie =
                "POSTOGONID=" +
                Object.values(response.data) +
                ";" +
                expires +
                ";path=/";
              document.cookie = "POSTOGONID_=1;" + expires + ";path=/";
              //delete old token
              axios
                .delete("https://api.postogon.com/auth", {
                  params: {
                    token: matchCookieOne,
                  },
                })
                .then(function (response) {
                  console.log("regenerated token");
                  if (getCookieValue("POSTOGONID_")) {
                    //validate new token
                    axios
                      .get("https://api.postogon.com/auth", {
                        params: {
                          token: getCookieValue("POSTOGONID"),
                        },
                      })
                      .then(function (response) {
                        updateLoggedIn(true);
                      });
                  }
                });
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log("token doesnt exist");
          console.log(error);
        });
    }
    await setLoading(false);
  }


  //exclude router until it retrieves layout effects from server-rendered-html
  useLayoutEffect(() => {
    checkSession();    
  }, [isLoggedIn]);

  useLayoutEffect(() => {
    checkSession();    
  }, [isLoggedIn]);


  const [loading, setLoading] = useState(true)

  if (loading) return <Loading></Loading>;

  return (
    <div>
      { 
          <Routes/>
       }
    </div>
  );
}

export default App;
