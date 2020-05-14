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

import TestB from './Components/testRes/TestB';
import TestImage from './Components/testRes/ImageTestPage'
import ProductCardList from './Components/ProductsListCard/ProductListCard';

import ResendEmail from './Components/Login&RegisterComponent/ResendEmail';

import Cart from './Components/Cart/Cart';
import Checkout from './Components/Checkout/Checkout';

import ContactUs from './Components/Contacts/Contacts';
import UserProfile from './Components/UserProfile/UserProfile';

function App() {

  console.log('Client Token : ', localStorage.userLoginToken)
  return (
    <Router>
      <div className="App">

        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route exact path='/testImage' component={TestImage} />
        <Route path="/verifysecurecode" component={VerifySecureCode} />

        <Route path="/single" component={SingleProduct} />
        <Route path="/salesManager" component={SalesManager} />
        <Route path="/itemApprove" component={itemApprove} />
        <Route path="/category" component={Category} />

        <Route path="/testb" component={TestB} />

        <Route path="/ProductCardList" component={ProductCardList} />

        <Route path="/ResendEmail" component={ResendEmail} />

        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        

        <Route path="/contactus" component={ContactUs} />
        <Route path="/editMyprofile" component={UserProfile}/>

        <Newsletter />
        <Footer />

      </div>
    </Router>
  );
}

export default App;
