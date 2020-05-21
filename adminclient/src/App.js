import React,{useState} from 'react';
import {BrowserRouter as Router,withRouter, Route,Switch,Redirect} from "react-router-dom";
import Login from './components/LoginRegister/Login';
import HeaderSideMenuFooter from './components/HeaderSideMenuFooter/HeaderSideMenuFooter';
import NotFound404 from './components/NotFound404';
import {ProtectedLogin} from './components/ProtectedRoutes/ProtectedRoutes';
function App({location}) {



  // if(localStorage.getItem("userLoginToken") !== null){

    
  // }

  console.log('Admin Token : ' ,localStorage.userLoginToken)
  return (
    
    
    <div className="App">
  

  <Route path = "/login" component={Login} />
    {((location.pathname !=='/login') &&  (localStorage.getItem("userLoginToken") !== null) )&&
     <HeaderSideMenuFooter location={location.pathname}/> 
    }

    {((location.pathname !=='/login') &&  (localStorage.getItem("userLoginToken") === null) )&&
        <Redirect
        to={{
          pathname: "/login"
        }}
      />
    }

   
    
     
     
  

    </div>

  );
}

export default withRouter(App);
