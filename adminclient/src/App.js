import React from 'react';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import Login from './components/LoginRegister/Login';
import HeaderSideMenuFooter from './components/HeaderSideMenuFooter/HeaderSideMenuFooter';

function App() {

  console.log('Admin Token : ' ,localStorage.userLoginToken)
  return (
    <Router>
    <div className="App">

 


      <HeaderSideMenuFooter/>  
     <Route path = "/login" component={Login} />
  

    </div>
    </Router>
  );
}

export default App;
