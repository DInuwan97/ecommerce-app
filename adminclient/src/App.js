import React from 'react';
import {BrowserRouter as Router,withRouter, Route,Switch} from "react-router-dom";
import Login from './components/LoginRegister/Login';
import HeaderSideMenuFooter from './components/HeaderSideMenuFooter/HeaderSideMenuFooter';

function App({location}) {

 

  console.log('Admin Token : ' ,localStorage.userLoginToken)
  return (
    // <Router>
    <div className="App">


    <Route path = "/login" component={Login} />
    {(location.pathname !=='/login')?
    <HeaderSideMenuFooter/>  :""
    


    }

    
     
     
  

    </div>
    // </Router> 
  );
}

export default withRouter(App);
