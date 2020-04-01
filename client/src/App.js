import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";

import Header from './Components/Header/Header';
import Newsletter from './Components/Newsletter/Newsletter';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login&RegisterComponent/Login'
import Register from './Components/Login&RegisterComponent/Register'
import Home from './Components/HomePageComponent/HomePage'

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Route path = "/" exact component = {Home}/>
        <Route path = "/register" component = {Register}/>
        <Route path = "/login" component = {Login}/>
        <Newsletter/>
        <Footer/>

      </div>
    </Router>
  );
}

export default App;
