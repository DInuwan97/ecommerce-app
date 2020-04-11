import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";

import Header from './Components/Header/Header';
import Newsletter from './Components/Newsletter/Newsletter';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login&RegisterComponent/Login'
import Register from './Components/Login&RegisterComponent/Register'
import VerifySecureCode from './Components/Login&RegisterComponent/VerifySecureCode';

import Home from './Components/HomePageComponent/HomePage'

import SingleProduct from './Components/SingleProductComponent/SingleProduct';

import TestB from './Components/testRes/TestB';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Route path = "/" exact component = {Home}/>
        <Route path = "/register" component = {Register}/>
        <Route path = "/login" component = {Login}/>

        <Route path = "/verifysecurecode" component={VerifySecureCode} />

        <Route path = "/single" component={SingleProduct}/>

        <Route path = "/testb" component={TestB}/>

        <Newsletter/>
        <Footer/>

      </div>
    </Router>
  );
}

export default App;
