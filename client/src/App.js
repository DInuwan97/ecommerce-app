import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Header from './Components/Header/Header';
import Newsletter from './Components/Newsletter/Newsletter';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Newsletter/>
        <Footer/>

      </div>
    </Router>
  );
}

export default App;
