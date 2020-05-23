import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import Avatar from 'react-avatar';
import axios from 'axios';


import jwt_decode from 'jwt-decode'
import HomePage from '../AdminOrientation/HomePage';
import AdminItemApprove from '../AdminItemApprove/AdminItemApprove'
import Category from '../AdminAddCategory/Category'
import UserListpage from '../AdminOrientation/UserListPage';
import SalesServicersList from '../AdminOrientation/SalesServicersApproveList';
import ActiveSalesManagers from '../AdminOrientation/ActiveSalesManagers';
import AddDiscount from '../SalesManagerAddDiscount/AddDiscount'

import NotFound404 from './../NotFound404';
import ReviewTable from '../ReviewDataTable/ReviewDataTable';
import Compose from '../ReviewDataTable/SendEmail';
import SingleReviews from '../ReviewDataTable/SingleItemReview';
import ReviewReplyData from '../ReviewDataTable/ReviewReply/ReviewReplyDataTable';
import ReviewReplyTable from '../ReviewDataTable/ReviewReply/ReviewReplyTable';
import SalesMAnagerUserProfile from '../AdminOrientation/SalesMAnagersProfile';

import ContactUsDT from '../ContactUs/ContactusDT';

import MyProfile from '../AdminOrientation/MyProfile';

import AdminPackage from '../AdminOrientation/AdminPackage';
import { ProtectedRoutesAdmin, ProtectedRoutesIsSalesManager,ProtectedRoutesIsCurrentSalaseManager} from '../ProtectedRoutes/ProtectedRoutes';
export default class HeaderSideMenuFooter extends Component {

  constructor(props, location) {
    super(props, location)

    this.state = {

      loggedUserDetails: [],

      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      isAdmin: false,
      isCustomer: false,
      isSalesManager: false,
      isSalesServicer: false,
      company: '',
      userImageUrl: '',


      usersList: [],

      noOfSalesManagersToBeApprove: [],
      itemsList: [],

      reviewList: [],

      paramEmail: ''
    }

    console.log('localstorage login token :', localStorage.userLoginToken);

    ///window.location.reload(true); 

  }

  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('userLoginToken');
    window.location.replace('/login');
  }

  componentDidMount() {

    if (localStorage.getItem("userLoginToken") !== null) {
      const token = localStorage.userLoginToken;
      const decoded = jwt_decode(token);

      this.setState({
        loggedUserDetails: decoded
      })
      this.setState({
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email,
        mobile: decoded.mobile,
        isAdmin: decoded.isAdmin,
        isCustomer: decoded.isCustomer,
        isSalesManager: decoded.isSalesManager,
        isSalesServicer: decoded.isSalesServicer,
        company: decoded.company,
        userImageUrl: decoded.userImageUrl
      })

      //  this.setState({
      //    paramEmail:this
      //  })

      if (this.setState.isSalesManager) {
        this.setState({
          company: decoded.company,
          userImageUrl: decoded.userImageUrl
        })
      }
      console.log('Decoded token is : ', decoded)
      console.log('Decoded Company is : ', this.state.company)

      axios({
        method: 'get',
        url: '/api/users/viewusers',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('userLoginToken')
        }
      })
        .then((res) => {
          const users = res.data;
          console.log(users);
          this.setState({
            usersList: users,
          });
        });
      console.log(this.state.user);
    }


    axios({
      method: 'get',
      url: `/api/items`
    })
      .then(res => {
        let items = res.data;
        this.setState({
          itemsList: items
        })
      })
      .catch(err => {
        console.log(err);
      })


    this.getReviewsOnCompany();
    console.log('Lngth of revies: ', this.state.reviewList.length)
    if (this.state.isCustomer === true) {
      //window.location.replace('/login');
    }


  }


  getReviewsOnCompany() {
    axios({
      method: 'get',
      url: `/api/review/admin/itemsReviews/`,
      headers: {
        Authorization: `bearer ${localStorage.userLoginToken}`
      }
    })
      .then(res => {
        let review = res.data.data;

        this.setState({
          reviewList: review
        })

      })

  }


  // getItems(){
  //   axios({
  //     method:'get',
  //     url:''
  //   })
  // }

  getNoOfSalesManagersToBeApprove() {
    let willApproveSalasManagersCount = 0;
    for (let index = 0; index < this.state.usersList.length; index++) {
      if (this.state.usersList[index].isSalesManager === true && this.state.usersList[index].adminVerification === false && this.state.usersList[index].secureKeyVerifyStatus === true) {
        willApproveSalasManagersCount++
      }
    }
    return willApproveSalasManagersCount;
  }

  getNoOfSalesServicersToBeApproveInCompany() {
    let willApproveSalasServicersCount = 0;
    for (let index = 0; index < this.state.usersList.length; index++) {
      if (this.state.usersList[index].isSalesServicer === true && this.state.usersList[index].salasManagerVerification
        === false && this.state.usersList[index].secureKeyVerifyStatus === true && this.state.usersList[index].company === this.state.company) {
        willApproveSalasServicersCount++
      }
    }

    return willApproveSalasServicersCount;
  }

  getnoOfItemsToBeApproved() {
    let noOfItemsToBeApproved = 0;
    for (let index = 0; index < this.state.itemsList.length; index++) {
      if (this.state.itemsList[index].company === this.state.company && this.state.itemsList[index].isApproved === false) {
        noOfItemsToBeApproved++
      }
    }
    return noOfItemsToBeApproved;
  }

  getNoOfRevies() {
    let noOfReviews = 0;
    for (let index = 0; index < this.state.reviewList.length; index++) {
      // if(this.state.itemsList[index].company ===  this.state.company && this.state.itemsList[index].isApproved === false){
      noOfReviews++
      //}
    }

    return noOfReviews;
  }




  render() {

    // {this.state.usersList.map(({
    //   _id,
    //   isSalesManager,
    //   adminVerification
    // })=>{
    //   if(isSalesManager === true && adminVerification === false){
    //       this.setState({
    //         noOfSalesManagersToBeApprove:noOfSalesManagersToBeApprove+1
    //       })
    //   }
    // })}



    let imgPreviewMainMenu;
    if (this.state.userImageUrl != '') {
      imgPreviewMainMenu = <img src={this.state.userImageUrl} alt='' style={{ width: '40px', height: '40px', borderRadius: '100px' }} />;
    } else {
      imgPreviewMainMenu = <Avatar name={this.state.firstName + ' ' + this.state.lastName} round="50%" size='40' className="img-circle elevation-2" />;
    }

    return (

      <div className="wrapper">

        <nav className="main-header navbar navbar-expand navbar-white navbar-light">

          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars"></i></a>
            </li>
         
          </ul>


          <form className="form-inline ml-3">
            <div className="input-group input-group-sm">
              <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-navbar" type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </form>


          <ul className="navbar-nav ml-auto">

            <li className="nav-item dropdown">
              {/* <a className="nav-link" data-toggle="dropdown" href="#">
                    <i className="far fa-comments"></i>
                  <span className="badge badge-danger navbar-badge">3</span>
                </a> */}

              <a className="nav-link" data-toggle="dropdown" href="#">
                <span style={{ fontStyle: 'bold', marginRight: 5 }}>Welcome {this.state.firstName}</span><i className="fas fa-chevron-down"></i>

              </a>

              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <a href='/MyProfile' className="dropdown-item">
                  <i className="fas fa-user"></i> My Profile

                  </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  <i className="fas fa-cogs"></i> Settings
                  </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item" onClick={this.logOut.bind(this)}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                  </a>
                <div className="dropdown-divider"></div>

              </div>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="far fa-bell"></i>
                <span className="badge badge-warning navbar-badge">15</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span className="dropdown-item dropdown-header">15 Notifications</span>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  <i className="fas fa-envelope mr-2"></i> 4 new messages
                    <span className="float-right text-muted text-sm">3 mins</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  <i className="fas fa-users mr-2"></i> 8 friend requests
                    <span className="float-right text-muted text-sm">12 hours</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  <i className="fas fa-file mr-2"></i> 3 new reports
                    <span className="float-right text-muted text-sm">2 days</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
              </div>
            </li>
            <li className="nav-item">
          
            </li>
          </ul>
        </nav>



        <aside className="main-sidebar sidebar-dark-primary elevation-4">




          <div className="sidebar">

            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <div className="img-circle elevation-2" >
                  {imgPreviewMainMenu}
                </div>

              </div>
              <div className="info">
                <a href="/MyProfile" className="d-block">{this.state.firstName}{' '}{this.state.lastName}</a>
              </div>
            </div>


            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                <li className="nav-item has-treeview ">
                  <a href="/" className={this.props.location && this.props.location === "/" ? "nav-link active" : "nav-link"}>
                    <i className="nav-icon fas fa-tachometer-alt"></i>
                    <p>
                      Dashboard
                      </p>
                  </a>

                </li>

                {(this.state.isAdmin === true) &&
                  <li className="nav-item">
                    <a href="/salesManagerapprove" className={this.props.location && this.props.location === "/salesmanagerapprove" ? "nav-link active" : "nav-link"}>
                      <i className="nav-icon fas fa-th"></i>
                      <p>
                        Sales Approvals
                                {(this.getNoOfSalesManagersToBeApprove() > 0) &&
                          <span className="right badge badge-danger">New {this.getNoOfSalesManagersToBeApprove()}</span>
                        }

                      </p>
                    </a>
                  </li>
                }

                {(this.state.isSalesManager === true || this.state.isAdmin === true) &&
                  <li className="nav-item has-treeview">
                    <a href="/salesServicersList" className={this.props.location && this.props.location === "/salesservicerslist" ? "nav-link active" : "nav-link"}>
                      <i className="nav-icon fas fa-users" aria-hidden="true" ></i>
                      <p>
                         Sales Servicers
                                {(this.getNoOfSalesServicersToBeApproveInCompany() > 0) &&
                          <span className="right badge badge-info">New {this.getNoOfSalesServicersToBeApproveInCompany()}</span>
                        }
                      </p>
                    </a>
                  </li>
                }

                <li className="nav-item has-treeview">
                  <a href="/ActiveSalesManagers" className={this.props.location && this.props.location === "/activesalesmanagers" ? "nav-link active" : "nav-link"}>
                  <i className="nav-icon fas fa-building"></i>
                    <p>
                      Active Companies
                      </p>
                  </a>
                </li>

                {(this.state.isSalesManager === true || this.state.isAdmin === true) &&
                  <li className="nav-item has-treeview">
                    <a href="/itemApprove" className={this.props.location && this.props.location === "/itemapprove" ? "nav-link active" : "nav-link"}>
                      <i className="nav-icon fab fa-expeditedssl"></i>
              
                      <p>
                        Item Approvals
                        {(this.getnoOfItemsToBeApproved() > 0) &&
                          <span className="right badge badge-warning">New {this.getnoOfItemsToBeApproved()}</span>
                        }
                      </p>
                    </a>
                  </li>
                }

                {(this.state.isAdmin === true) &&
                  <li className="nav-item has-treeview">
                    <a href="/addCategory" className={this.props.location && this.props.location === "/addcategory" ? "nav-link active" : "nav-link"}>
                      <i className="nav-icon fas fa-puzzle-piece"></i>
                      <p>
                        Product Categories
                      </p>
                    </a>
                  </li>

                }

                <li className="nav-item has-treeview">
                  <a href="/addDiscount" className={this.props.location && this.props.location === "/adddiscount" ? "nav-link active" : "nav-link"}>
                    <i className="nav-icon fas fa-percent"></i>
                    <p>
                      AddDiscount
                      </p>
                  </a>
                </li>


                {(this.state.isAdmin === true) &&
                  <li className="nav-item has-treeview">
                    <a href="/AdminPackage" className={this.props.location && this.props.location === "/adminpackage" ? "nav-link active" : "nav-link"}>
                      <i className="nav-icon fas fa-copy"></i>
                      <p>
                        Packages
                      </p>
                    </a>
                  </li>

                }

                <li className="nav-item has-treeview">
                  <a href="/Compose" className={this.props.location && this.props.location === "/compose" ? "nav-link active" : "nav-link"}>
                    <i className="nav-icon fas fa-envelope"></i>
                    <p>
                      Compose
                      </p>
                  </a>
                </li>


                <li className="nav-item has-treeview">
                  <a href="/Reviews" className={this.props.location && this.props.location === "/reviews" ? "nav-link active" : "nav-link"}>
                    <i className="nav-icon fas fa-comment"></i>
                    <p>

                      Reviews
                         {(this.getNoOfRevies() > 0) &&
                        <span className="right badge badge-danger" style={{ borderRadius: '50%', width: 20, height: 20 }}>{this.getNoOfRevies()}</span>
                      }
                    </p>
                  </a>
                </li>


                <li className="nav-item has-treeview">
                  <a href="/ReviewReplies" className={this.props.location && this.props.location === "/reviewreplies" ? "nav-link active" : "nav-link"}>
                    <i className="nav-icon fas fa-reply"></i>
                    <p>
                      ReviewReplies
                      </p>
                  </a>
                </li>


                {(this.state.isAdmin === true || this.state.isSalesManager === true) &&
                  <li className="nav-item has-treeview">
                    <a href="/contactUs" className={this.props.location && this.props.location === "/contactus" ? "nav-link active" : "nav-link"}>
                      <i className="nav-icon fas fa-question"></i>
                      <p>
                        Contact Us Messages
                      </p>
                    </a>
                  </li>
                }

              </ul>
            </nav>

          </div>

        </aside>


        <div className="content-wrapper">

          <section className="content-header">
            <div className="container-fluid">
              <Router>

                <Switch>

                  <ProtectedRoutesAdmin exact path='/salesManagerapprove' token={localStorage.getItem("userLoginToken")} salesManager={this.state.isSalesManager} component={() => <UserListpage companyName={this.state.company} usersList={this.state.usersList} loggedUserDetails={this.state.loggedUserDetails} itemsList={this.state.itemsList} />} />

                  <Route path='/404NotFound' component={() => <NotFound404 />} />
                  <Route exact path='/' component={() => <HomePage usersList={this.state.usersList} loggedUserDetails={this.state.loggedUserDetails} itemsList={this.state.itemsList} />} />


                  <Route path='/itemApprove' component={() => <AdminItemApprove loggedUserDetails={this.state.loggedUserDetails} />} />
                  <Route path='/addCategory' component={Category} />
                  <ProtectedRoutesIsSalesManager path='/salesServicersList' component={() => <SalesServicersList companyName={this.state.company} usersList={this.state.usersList} loggedUserDetails={this.state.loggedUserDetails} itemsList={this.state.itemsList} />} />
                  <Route path='/ActiveSalesManagers' component={() => <ActiveSalesManagers companyName={this.state.company} usersList={this.state.usersList} loggedUserDetails={this.state.loggedUserDetails} itemsList={this.state.itemsList} />} />

                  <Route exact path='/Reviews' component={() => <ReviewTable companyName={this.state.company} />} />
                  <Route path='/Compose' component={Compose} />
                  <Route exact path='/Reviews/:id' component={SingleReviews} />
                  <Route exact path='/ReviewReplies' component={() => <ReviewReplyData company={this.state.company} />} />
                  <Route exact path='/ReviewReplies/:id' component={() => <ReviewReplyTable company={this.state.company} />} />

                  <ProtectedRoutesIsCurrentSalaseManager token={localStorage.getItem("userLoginToken")} path='/SalesManagerProfile/:email' component={() => <SalesMAnagerUserProfile loggedEmail={this.state.email} usersList={this.state.usersList} loggedUserDetails={this.state.loggedUserDetails} itemsList={this.state.itemsList} />} />

                  <Route exact path='/contactUs' component={ContactUsDT} />

                  <Route path='/MyProfile' component={() => <MyProfile loggedEmail={this.state.email} companyName={this.state.company} usersList={this.state.usersList} loggedUserDetails={this.state.loggedUserDetails} itemsList={this.state.itemsList} />} />

                  <Route path='/AddDiscount' component={() => <AddDiscount companyName={this.state.company} />} />


                  <ProtectedRoutesAdmin isAdmin={this.state.isAdmin} path='/AdminPackage' component={() => <AdminPackage companyName={this.state.company} usersList={this.state.usersList} loggedUserDetails={this.state.loggedUserDetails} itemsList={this.state.itemsList} />} />
                  <Redirect to="/404NotFound"/>
                </Switch>
              </Router>

            </div>
          </section>

        </div>


        <footer className="main-footer">
          <div className="float-right d-none d-sm-block">
            <b>Version</b> 1.0.0
            </div>
          <strong>Copyright &copy; 2020 <a href="/">Team Bionics</a>.</strong> All rights
            reserved.
          </footer>



      </div>

    );
  }
}
