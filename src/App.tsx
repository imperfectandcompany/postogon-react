import "./App.css";
import Continue from "./pages/Continue/Continue";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import HomeIn from "./pages/LoggedIn/Home/Home";
import Start from "./pages/Start/Start";
import axios from "axios";
import { useEffect, useState } from "react";
import React, { useLayoutEffect } from "react";
import NavbarIn from "./components/Navbar/NavbarIn";

const getCookieValue = (name: string) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

function App() {

  useLayoutEffect(checkSession);

  const [isLoggedIn, updateLoggedIn] = useState(false);
  function checkSession() {
    var matchCookieOne = getCookieValue("POSTOGONID");
    var matchCookieTwo = getCookieValue("POSTOGONID_");
    if (matchCookieOne && matchCookieTwo) {
      axios
        .get("https://api.postogon.com/auth", {
          params: {
            token: matchCookieOne,
          },
        })
        .then(function (response) {
          updateLoggedIn(true);
        })
        .catch(function (error) {
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
        .then(function (response) {
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
  }

//save isAuthenticated as true in localStorage,
if(isLoggedIn === true){
  localStorage.setItem("isAuthenticated", "true");
}

  const [showRoutes, setRoutes] = useState(false);

  //exclude router until it retrieves layout effects from server-rendered-html
  useEffect(() => {
    checkSession();    
    setRoutes(true);
  }, []);

  return (
    <div>
      {showRoutes ? (
        <Router>
              {isLoggedIn ? <NavbarIn></NavbarIn> : <Navbar></Navbar>}
          <Switch>
            <Route path="/start">
              <Start></Start>
            </Route>
            <Route path="/continue">
              <Continue />
            </Route>
            <Route path="/">
              {isLoggedIn ? <HomeIn></HomeIn> : <Home></Home>}
            </Route>
          </Switch>
        </Router>
      ) : null}
    </div>
  );
}

export default App;
