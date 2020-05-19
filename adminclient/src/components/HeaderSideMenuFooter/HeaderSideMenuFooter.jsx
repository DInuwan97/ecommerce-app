import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import Avatar from 'react-avatar';
import {Link,withRouter} from 'react-router-dom';
import axios from 'axios';

import jwt_decode from 'jwt-decode'
import HomePage from '../AdminOrientation/HomePage';
import AdminItemApprove from '../AdminItemApprove/AdminItemApprove'
import Category from '../AdminAddCategory/Category'
import UserListpage from '../AdminOrientation/UserListPage';
import SalesServicersList from '../AdminOrientation/SalesServicersApproveList';
import ActiveSalesManagers from '../AdminOrientation/ActiveSalesManagers';
import AddDiscount from '../SalesManagerAddDiscount/AddDiscount'


import ReviewTable from '../ReviewDataTable/ReviewDataTable';
import Compose from '../ReviewDataTable/SendEmail';
import SingleReviews from '../ReviewDataTable/SingleItemReview';
import ReviewReplyData from '../ReviewDataTable/ReviewReply/ReviewReplyDataTable';
import ReviewReplyTable from '../ReviewDataTable/ReviewReply/ReviewReplyTable';

import ContactUsDT from '../ContactUs/ContactusDT';

import MyProfile from '../AdminOrientation/MyProfile';

import AdminPackage from '../AdminOrientation/AdminPackage';

export default class HeaderSideMenuFooter extends Component {

  constructor(props){
    super(props)

		this.state ={

       loggedUserDetails:[],

			 firstName: '',
			 lastName: '',
			 email:'',
			 mobile:'',
			 isAdmin:false,
			 isCustomer:false,
			 isSalesManager:false,
       isSalesServicer:false,
       company:'',
       userImageUrl:'',


       usersList:[],

       noOfSalesManagersToBeApprove:[],
       itemsList:[]
    }

    console.log('localstorage login token :' ,localStorage.userLoginToken);

		///window.location.reload(true); 
	
	}

	logOut(e){
		e.preventDefault()
		localStorage.removeItem('userLoginToken');
    window.location.replace('/login');
	}

	componentDidMount(){
    
		if(localStorage.getItem("userLoginToken") !== null){
			const token = localStorage.userLoginToken;
      const decoded = jwt_decode(token);
      
      this.setState({
        loggedUserDetails:decoded
      })
			this.setState({
				firstName:decoded.firstName,
				lastName:decoded.lastName,
				email:decoded.email,
				mobile:decoded.mobile,
				isAdmin:decoded.isAdmin,
				isCustomer:decoded.isCustomer,
				isSalesManager:decoded.isSalesManager,
        isSalesServicer:decoded.isSalesServicer,
        company:decoded.company,
        userImageUrl:decoded.userImageUrl
       })
       
       if(this.setState.isSalesManager){
         this.setState({
           company:decoded.company,
           userImageUrl:decoded.userImageUrl
         })
       }
       console.log('Decoded token is : ' ,decoded)
       console.log('Decoded Company is : ' ,this.state.company)

    axios({
      method:'get',
      url:'/api/users/viewusers',
      headers: {
          "Authorization" : "Bearer "+localStorage.getItem('userLoginToken')
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
      method:'get',
      url:`/api/items` 
    })
    .then(res=>{
      let items = res.data;
      this.setState({
          itemsList:items
      })
    })
    .catch(err=>{
      console.log(err);
    })
 
    
    if(this.state.isCustomer === true){
      //window.location.replace('/login');
    }


  }

  getNoOfSalesManagersToBeApprove(){
    let willApproveSalasManagersCount = 0;
    for (let index = 0; index < this.state.usersList.length; index++) {
      if( this.state.usersList[index].isSalesManager === true && this.state.usersList[index].adminVerification === false && this.state.usersList[index].secureKeyVerifyStatus === true){
        willApproveSalasManagersCount++
      } 
    }
    return willApproveSalasManagersCount;
  }
  
  getNoOfSalesServicersToBeApproveInCompany(){
    let willApproveSalasServicersCount = 0;
    for (let index = 0; index < this.state.usersList.length; index++) {
      if( this.state.usersList[index].isSalesServicer=== true && this.state.usersList[index].salasManagerVerification
      === false && this.state.usersList[index].secureKeyVerifyStatus === true && this.state.usersList[index].company === this.state.company){
        willApproveSalasServicersCount++
      }
    }

    return willApproveSalasServicersCount;
  }

  getnoOfItemsToBeApproved(){
    let noOfItemsToBeApproved = 0;
    for (let index = 0; index < this.state.itemsList.length; index++) {
        if(this.state.itemsList[index].company ===  this.state.company && this.state.itemsList[index].isApproved === false){
          noOfItemsToBeApproved++
        }
    }
    return noOfItemsToBeApproved;
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
      imgPreviewMainMenu = <img src={this.state.userImageUrl} alt=''  style={{width:'40px',height:'40px',borderRadius:'100px'}}/>;
    }else{
      imgPreviewMainMenu = <Avatar name={this.state.firstName+ ' ' +this.state.lastName} className="img-circle elevation-2"/>;
    }
    
    return (

        <div className="wrapper">
         
          <nav className="main-header navbar navbar-expand navbar-white navbar-light">
           
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars"></i></a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <a href="" className="nav-link">Home</a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <a href="#" className="nav-link">Contact</a>
              </li>
            </ul>
        
         
            <form className="form-inline ml-3">
              <div className="input-group input-group-sm">
                <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search"/>
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
                  <span style={{fontStyle:'bold',marginRight:5}}>Welcome {this.state.firstName}</span><i className="far fa-user"></i>
                  
                </a>

                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                  <a href='/MyProfile' className="dropdown-item">
                        <i className="fas fa-envelope mr-2"></i>                         
                        My Profile
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item">
                        <i className="fas fa-settings"></i> Settings
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item"  onClick={this.logOut.bind(this)}>
                        <i className="fas fa-settings"></i> Logout
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
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
                <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
                  <i className="fas fa-th-large"></i>
                </a>
              </li>
            </ul>
          </nav>

        
        
          <aside className="main-sidebar sidebar-dark-primary elevation-4">

            <a href="../../index3.html" className="brand-link">
              <img src="/dist/img/AdminLTELogo.png"
                   alt="AdminLTE Logo"
                   className="brand-image img-circle elevation-3"/>
              <b><span className="brand-text font-weight-light" style={{fontWeight:'bold'}}>FASHION Club</span></b>
            </a>
        
           
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
                 
                  <li className="nav-item has-treeview">
                    <a href="/home" className="nav-link">
                      <i className="nav-icon fas fa-tachometer-alt"></i>
                      <p>
                        Dashboard
                      </p>
                    </a>
             
                  </li>

                  {(this.state.isAdmin === true) &&
                      <li className="nav-item">
                             <a href="/salesManagerapprove" className="nav-link">
                               <i className="nav-icon fas fa-th"></i>
                               <p>
                                Sales Approvals
                                {(this.getNoOfSalesManagersToBeApprove() > 0)&&
                                   <span className="right badge badge-danger">New {this.getNoOfSalesManagersToBeApprove()}</span>
                                }
                                  
                               </p>
                             </a>
                     </li>
                  }
             
                  {(this.state.isSalesManager === true) &&
                      <li className="nav-item has-treeview">
                          <a href="/salesServicersList" className="nav-link">
                            <i className="nav-icon fas fa-copy"></i>
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
                    <a href="/ActiveSalesManagers" className="nav-link">
                      <i className="nav-icon fas fa-copy"></i>
                      <p>
                       ActiveSalesManagers
                      </p>
                    </a>
                  </li>

  {(this.state.isSalesManager === true || this.state.isAdmin === true) &&
                  <li className="nav-item has-treeview">
                    <a href="/itemApprove" className="nav-link">
                      <i className="nav-icon fas fa-copy"></i>
                      <p>
                        Item Approvals
                        {(this.getnoOfItemsToBeApproved() > 0) &&
                          <span className="right badge badge-warning">New {this.getnoOfItemsToBeApproved()}</span>
                        }
                      </p>
                    </a>
                  </li>
  }
                  <li className="nav-item has-treeview">
                    <a href="/addCategory" className="nav-link">
                      <i className="nav-icon fas fa-copy"></i>
                      <p>
                       Product Categories
                      </p>
                    </a>
                  </li>

                  
                                                   
                  <li className="nav-item has-treeview">
                    <a href="/addDiscount" className="nav-link">
                      <i className="nav-icon fas fa-copy"></i>
                      <p>
                      AddDiscount
                      </p>
                    </a>
                  </li>

                  <li className="nav-item has-treeview">
                    <a href="/AdminPackage" className="nav-link">
                      <i className="nav-icon fas fa-copy"></i>
                      <p>
                      Packages
                      </p>
                    </a>
                  </li>


                  <li className="nav-item has-treeview">
                    <a href="/Compose" className="nav-link">
                      <i className="nav-icon fas fa-copy"></i>
                      <p>
                        Compose
                      </p>
                    </a>
                  </li>

                  
                  <li className="nav-item has-treeview">
                    <a href="/Reviews" className="nav-link">
                      <i className="nav-icon fas fa-copy"></i>
                      <p>
                         Reviews
                      </p>
                    </a>
                  </li>

                                    
                  <li className="nav-item has-treeview">
                    <a href="/ReviewReplies" className="nav-link">
                      <i className="nav-icon fas fa-copy"></i>
                      <p>
                        ReviewReplies
                      </p>
                    </a>
                  </li>

                  <li className="nav-item has-treeview">
                    <a href="/ContactUs" className="nav-link">
                      <i className="nav-icon fas fa-copy"></i>
                      <p>
                        Contact Us Messages
                      </p>
                    </a>
                  </li>

 
                  <li className="nav-item has-treeview">
            
                    <ul className="nav nav-treeview">
                

                      <li className="nav-item">
                        <a href="../UI/timeline.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Timeline</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="../UI/ribbons.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Ribbons</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item has-treeview">
                    <a href="#" className="nav-link">
                      <i className="nav-icon fas fa-edit"></i>
                      <p>
                        Forms
                        <i className="fas fa-angle-left right"></i>
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <a href="../forms/general.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>General Elements</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="../forms/advanced.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Advanced Elements</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="../forms/editors.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Editors</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="../forms/validation.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Validation</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item has-treeview">
                    <a href="#" className="nav-link">
                      <i className="nav-icon fas fa-table"></i>
                      <p>
                        Tables
                        <i className="fas fa-angle-left right"></i>
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <a href="../tables/simple.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Simple Tables</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="../tables/data.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>DataTables</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="../tables/jsgrid.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>jsGrid</p>
                        </a>
                      </li>
                    </ul>
                  </li>
              
         

                </ul>
              </nav>
            
            </div>
          
          </aside>
        
            <Router> 
           <div className="content-wrapper">
            
            <section className="content-header">
              <div className="container-fluid">

               <Route path = '/salesManagerapprove' component = {()=> <UserListpage companyName={this.state.company} usersList={this.state.usersList} loggedUserDetails={this.state.loggedUserDetails}/>} />
              <Route path ='/home' component= {()=> <HomePage usersList={this.state.usersList} loggedUserDetails={this.state.loggedUserDetails}/>}/>
               <Route path ='/itemApprove' component={()=><AdminItemApprove loggedUserDetails={this.state.loggedUserDetails}/>}/>
               <Route path ='/addCategory' component= {Category}/>
               <Route path='/salesServicersList' component = {()=> <SalesServicersList companyName={this.state.company} usersList={this.state.usersList} loggedUserDetails={this.state.loggedUserDetails}/>}/>
               <Route path='/ActiveSalesManagers' component={()=><ActiveSalesManagers companyName={this.state.company} usersList={this.state.usersList} loggedUserDetails={this.state.loggedUserDetails}/>}/>
             
                <Route exact path='/Reviews' component={()=><ReviewTable companyName={this.state.company} />}/>
                <Route path='/Compose' component={Compose}/>
                <Route exact path='/Reviews/:id' component={SingleReviews}/>
                <Route exact path='/ReviewReplies' component = {()=> <ReviewReplyData company={this.state.company}/>}/>
                <Route exact path='/ReviewReplies/:id' component={()=> <ReviewReplyTable company={this.state.company}/>}/>

                <Route exact path='/ContactUs' component={ContactUsDT}/>

               <Route path='/MyProfile' component={()=><MyProfile loggedEmail={this.state.email} companyName = {this.state.company} usersList={this.state.usersList} loggedUserDetails={this.state.loggedUserDetails}/>}/>

                <Route path = '/AddDiscount' component = {() => <AddDiscount companyName = {this.state.company}/>}/>
                

                <Route path = '/AdminPackage' component = {() => <AdminPackage companyName = {this.state.company} usersList={this.state.usersList} loggedUserDetails={this.state.loggedUserDetails}/>}/>
                
              </div>
            </section>

           </div>
          </Router>  
        
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
