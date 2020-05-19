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
import Wishlist from './Components/Wishlist/Wishlist';

import ContactUs from './Components/Contacts/Contacts';
import Faq from './Components/Contacts/Faq';
import UserProfile from './Components/UserProfile/UserProfile';



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
            <Route exact path='/testImage' component={TestImage} />
            <Route path="/verifysecurecode" component={VerifySecureCode} />


            <Route path="/:type/:id" component={SingleProduct} />
            <Route path="/salesManager" component={SalesManager} />
            <Route path="/itemApprove" component={itemApprove} />
            <Route path="/category" component={Category} />

            <Route path="/testb" component={TestB} />



            <Route path="/ResendEmail" component={ResendEmail} />

            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/wishlist" component={Wishlist} />

            <Route path="/contactus" component={ContactUs} />
            <Route path='/faq' component={Faq} />
            <Route path="/editMyprofile" component={() => <UserProfile loggedEmail={this.state.email} companyName={this.state.company} />} />
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
