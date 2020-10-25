import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"; //react-router:une extension a React qui permet de gérer les routes d’une application coté client
import Axios from "axios";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";
import "./style.css";
import io from 'socket.io-client';

let socket;

const ENDPOINT = 'localhost:5000';
export default function App() {            
                 //export = pour etre utilisé en dehords de App.js 
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,                                    //returner par le back-end
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
          
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  useEffect(() => {
socket = io(ENDPOINT);
console.log(socket);
  },[ENDPOINT]);
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>  {/* login & register can access userdata & setuserData*/}
          <Header />                                      {/* on n doit ps le mettre ds le switch carc la barre qui apparait tt le temps ds l appli qqlsoit la route*/}
          <div className="container">
            <Switch>                                      {/* car il y a pls routes*/}
              <Route exact path="/" component={Home} />   {/*  _Appeler la fct Home de Home.js;C'est la page home de l'application  _on ulilise exact pour qu'il cherche exactement le / only  */} 
               <Route path="/login" component={Login} />  {/* afficher c qu'il y a ds la fct login et meme chose pr register*/}
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </UserContext.Provider>                            {/* cette valise englobe ts l'app */}
      </BrowserRouter>
    </>
  );
}