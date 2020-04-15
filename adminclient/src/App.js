import React from 'react';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import Login from './components/LoginRegister/Login';
import HeaderSideMenuFooter from './components/HeaderSideMenuFooter/HeaderSideMenuFooter';

import Header from './components/HeaderSideMenuFooter/Header';
import Footer from './components/HeaderSideMenuFooter/Footer';

function App() {

  console.log('Admin Token : ' ,localStorage.userLoginToken)
  return (
    <Router>
    <div className="App">

        <Header/>
        
        <Route path = "/login" component={Login}/>
        

        <Footer/>
      
  
    </div>
    </Router>
  );
}

export default App;
