import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from 'jwt-decode'

import Header from './Components/Header/Header';
import Newsletter from './Components/Newsletter/Newsletter';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login&RegisterComponent/Login'
import Register from './Components/Login&RegisterComponent/Register'
import VerifySecureCode from './Components/Login&RegisterComponent/VerifySecureCode';
import SalesManager from './Components/SalesManagerComponent/addNewItemComponent';
import itemApprove from './Components/AdminItemApprove/adminItemApprove';
import Category from './Components/AdminAddCategory/Category';
import Home from './Components/HomePageComponent/HomePage';

import SingleProduct from './Components/SingleProductComponent/SingleProduct';

import ProductCardList from './Components/ProductsListCard/ProductListCard';

import ResendEmail from './Components/Login&RegisterComponent/ResendEmail';

import Cart from './Components/Cart/Cart';
import Checkout from './Components/Checkout/Checkout';
import Wishlist from './Components/Wishlist/Wishlist';
import PurchasedOrders from './Components/PurchasedOrders/PurchasedOrders';

import ContactUs from './Components/Contacts/Contacts';
import Faq from './Components/Contacts/Faq';
import UserProfile from './Components/UserProfile/UserProfile';

import About from './Components/About/about';
import ForgotPassword from './Components/Login&RegisterComponent/ForgotPassword';
import SecureCode from './Components/Login&RegisterComponent/SecureCode';
import ChangePassword from './Components/Login&RegisterComponent/ChangePasswords';
import {ProtectedUpperSalesServicers,ProtectedRoutesCheckedLoggedUser} from './Components/ProtectedRoutes/ProtectedRoutes';
class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      isAdmin: false,
      isCustomer: false,
      isSalesManager: false,
      isSalesServicer: false,
      company: ''
    }

    // console.log('localstorage login token :' ,localStorage.userLoginToken);
  }

  componentDidMount() {

    if (localStorage.getItem("userLoginToken") !== null) {
      const token = localStorage.userLoginToken;
      const decoded = jwt_decode(token);
      this.setState({
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email,
        mobile: decoded.mobile,
        isAdmin: decoded.isAdmin,
        isCustomer: decoded.isCustomer,
        isSalesManager: decoded.isSalesManager,
        isSalesServicer: decoded.isSalesServicer,
        company: decoded.company
      })

      if (this.setState.isSalesManager) {
        this.setState({
          company: decoded.company
        })
      }
      //console.log('Decoded token is : ' ,decoded)
      // console.log('Decoded Company is : ' ,this.state.company)
    }



  }

  render() {

    console.log('Client Token : ', localStorage.userLoginToken)
    return (
      <Router>

        <div className="App">


          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/verifysecurecode" component={VerifySecureCode} />


            <Route path="/:type/:id" component={SingleProduct} />
            <ProtectedUpperSalesServicers token={localStorage.getItem("userLoginToken")} path="/salesManager" component={SalesManager} />


            <Route path="/ResendEmail" component={ResendEmail} />

            <ProtectedRoutesCheckedLoggedUser token={localStorage.getItem("userLoginToken")} path="/cart" component={Cart} />
            <ProtectedRoutesCheckedLoggedUser token={localStorage.getItem("userLoginToken")} path="/checkout" component={Checkout} />
            <ProtectedRoutesCheckedLoggedUser token={localStorage.getItem("userLoginToken")} path="/wishlist" component={()=> <Wishlist loggedEmail={this.state.email}/>} />
            <ProtectedRoutesCheckedLoggedUser token={localStorage.getItem("userLoginToken")} path="/purchasedOrders" component={()=> <PurchasedOrders loggedEmail={this.state.email}/>} />

            <Route path="/contactus" component={ContactUs} />
            <Route path='/faq' component={Faq} />
            <ProtectedRoutesCheckedLoggedUser token={localStorage.getItem("userLoginToken")} path="/editMyprofile" component={() => <UserProfile loggedEmail={this.state.email} companyName={this.state.company} />} />
            
            <Route path="/about" component={About} />
            
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/securekey" component={SecureCode} />
            <Route path="/changePasswords" component={ChangePassword} />
            <Route path="/:type" component={ProductCardList} />

            

          </Switch>
          <Newsletter />
          <Footer />

        </div>

      </Router>
    );

  }
}

export default App;
