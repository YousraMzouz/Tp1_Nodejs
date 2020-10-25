import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./App";


ReactDOM.render(                                 //render sert à apparaitre tt ce qui est dedans

//jsx not html
<div className="pagehome">
<App />    

 </div>                                   //App = la fct qu'on a ds App.js
    ,
     document.querySelector("#root"));
    