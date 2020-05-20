import React from 'react';
import {BrowserRouter as Router,withRouter, Route,Switch,Redirect} from "react-router-dom";
import Login from './components/LoginRegister/Login';
import HeaderSideMenuFooter from './components/HeaderSideMenuFooter/HeaderSideMenuFooter';
import NotFound404 from './components/NotFound404';
function App({location}) {

  

  console.log('Admin Token : ' ,localStorage.userLoginToken)
  return (
    // <Router>
    
    <div className="App">
  


    <Route path = "/login" component={Login} />
    {((location.pathname !=='/login') &&  (localStorage.getItem("userLoginToken") !== null) )&&
     <HeaderSideMenuFooter/> 
    }

    {((location.pathname !=='/login') &&  (localStorage.getItem("userLoginToken") === null) )&&
        <Redirect
        to={{
          pathname: "/login"
        }}
      />
    }

    
     
     
  

    </div>
    // </Router> 
  );
}

export default withRouter(App);
