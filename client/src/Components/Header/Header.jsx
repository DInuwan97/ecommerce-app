import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom';

import jwt_decode from 'jwt-decode'
//import { decode } from 'punycode';


export class Header extends Component {

	constructor(props){
		super(props)
		this.state ={
			 firstName: '',
			 lastName: '',
			 email:'',
			 mobile:'',
			 isAdmin:false,
			 isCustomer:false,
			 isSalesManager:false,
			 isSalesServicer:false
		}

		console.log('localstorage login token :' ,localStorage.userLoginToken);

		const redirectForm = this.props.location.redirectForm;
		if(redirectForm == '/'){
			window.location.reload(true); 
		}

		
		///window.location.reload(true); 
	
	}

	logOut(e){
		e.preventDefault()
		localStorage.removeItem('userLoginToken');
		this.props.history.push('/login')
	}

	componentDidMount(){

		if(localStorage.getItem("userLoginToken") !== null){
			const token = localStorage.userLoginToken;
			const decoded = jwt_decode(token);
			this.setState({
				firstName:decoded.firstName,
				lastName:decoded.lastName,
				email:decoded.email,
				mobile:decoded.mobile,
				isAdmin:decoded.isAdmin,
				isCustomer:decoded.isCustomer,
				isSalesManager:decoded.isSalesManager,
				isSalesServicer:decoded.isSalesServicer
		   })
		   console.log('Decoded token is : ' ,decoded)
		}
		
			
		

	}

	render(){

			
  const loginRegLink = (
	<div className="collapse navbar-collapse" id="bs-megadropdown-tabs" style={{float:"right"}}>
	<ul className="nav navbar-nav ">

		<li ><Link to ='/login'className="hyper"><span>Login</span></Link></li>
		<li><Link to ='/register'className="hyper" style={{marginLeft:"15px"}}><span>Register</span></Link></li>
	</ul>
	</div>
  )

  const userLink = (
	<div className="collapse navbar-collapse" id="bs-megadropdown-tabs" style={{float:"right"}}>
		<ul className="nav navbar-nav ">
		<div class="dropdown">
  <button style={{backgroundColor:'0',textDecoration:'none',marginTop:8,fontSize:16}} className="btn btn-link dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
  <i className="fa fa-user" aria-hidden="true" style={{marginRight:5}}></i>
    Hello {this.state.firstName}
    <span style={{marginLeft:5}} className="caret"></span>
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
    <li><a href="#">My Profile</a></li>
    <li><a href="#">Security Policies</a></li>
    <li><a href="#">Privacy Change</a></li>
    <li role="separator" class="divider"></li>
    <li><a 
 onClick={this.logOut.bind(this)} href="#">Logout</a></li>
  </ul>
</div>
		</ul>
	</div>
			
						
  )






  return (
    <div>

      <div className="header-top-w3layouts">
	    <div className="container">

		<div className="col-md-6 logo-w3">
			<a href="index.html"><img src="images/logo2.png" alt=" " /><h1>FASHION<span>CLUB</span></h1></a>
		</div>


		<div className="col-md-4 search-agileinfo" style={{float:"right"}}>
			<form action="#" method="post">
				<input type="search" name="Search" placeholder="Search for a Product..." required="" />
				<button type="submit" className="btn btn-default search" aria-label="Left Align">
					<i className="fa fa-search" aria-hidden="true"> </i>
				</button>
			</form>
		</div>

		<div className="col-md-1 cart-wthree" style={{float:"right"}}>
			<div className="cart"> 
				<form action="#" method="post" className="last"> 
					<input type="hidden" name="cmd" value="_cart" />
					<input type="hidden" name="display" value="1" />
					<button className="w3view-cart" type="submit" name="submit" value=""><i className="fa fa-cart-arrow-down" aria-hidden="true"></i></button>
				</form>  
			</div>			
		</div>

	
		        <div className="clearfix"></div>

	        </div>
        </div>


 <div className="header-bottom-w3ls">
	<div className="container">
        <div className="col-md-7 navigation-agileits">
			<nav className="navbar navbar-default">
				<div className="navbar-header nav_2">

                    <button type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>

            	</div>


                <div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
					<ul className="nav navbar-nav ">
						<li className=" active"><a href="index.html" className="hyper "><span>Home</span></a></li>	

						<li className="dropdown ">
                        <a href="#" className="dropdown-toggle  hyper" data-toggle="dropdown" ><span>Clothing<b className="caret"></b></span></a>

                            <ul className="dropdown-menu multi">
								<div className="row">

									<div className="col-sm-4">
										<ul className="multi-column-dropdown">

                                        <li><a href="women.html"><i className="fa fa-angle-right" aria-hidden="true"></i>Women's Clothing</a></li>
										<li><a href="men.html"><i className="fa fa-angle-right" aria-hidden="true"></i>Men's Clothing</a></li>
										<li><a href="kids.html"> <i className="fa fa-angle-right" aria-hidden="true"></i>Kid's Wear</a></li>
										<li><a href="party.html"><i className="fa fa-angle-right" aria-hidden="true"></i>Party Wear</a></li>

                                        </ul>
                                    </div>


                                    <div className="col-sm-4">
										<ul className="multi-column-dropdown">

                                        <li><a href="casuals.html"><i className="fa fa-angle-right" aria-hidden="true"></i>Casuals</a></li>
										<li><a href="night.html"><i className="fa fa-angle-right" aria-hidden="true"></i>Night Wear</a></li>
										<li><a href="formals.html"><i className="fa fa-angle-right" aria-hidden="true"></i>Formals</a></li>
										<li><a href="inner.html"><i className="fa fa-angle-right" aria-hidden="true"></i>Inner Wear</a></li>

                                        </ul>
                                    </div>

                                    <div className="col-sm-4 w3l">
										<a href="women.html">
                                            <img src="assets/images/menu1.jpg" className="img-responsive" alt="" />
                                        </a>
									</div>

									<div className="clearfix"></div>

                                </div>
                            </ul>

                        </li>




                        <li className="dropdown ">
                        <a href="#" className="dropdown-toggle hyper" data-toggle="dropdown" ><span> Personal Care <b className="caret"></b></span></a>

                            <ul className="dropdown-menu multi multi1">
								<div className="row">

									<div className="col-sm-4">
										<ul className="multi-column-dropdown">

                                        <li><a href="jewellery.html"><i className="fa fa-angle-right" aria-hidden="true"></i>Jewellery </a></li>
										<li><a href="watches.html"><i className="fa fa-angle-right" aria-hidden="true"></i>Watches</a></li>
										<li><a href="cosmetics.html"><i className="fa fa-angle-right" aria-hidden="true"></i>Cosmetics</a></li>
										<li><a href="deos.html"><i className="fa fa-angle-right" aria-hidden="true"></i>Deo & Perfumes</a></li>

                                        </ul>
                                    </div>


                                    <div className="col-sm-4">
										<ul className="multi-column-dropdown">

                                        <li><a href="haircare.html"> <i className="fa fa-angle-right" aria-hidden="true"></i>Hair Care </a></li>
										<li><a href="shoes.html"><i className="fa fa-angle-right" aria-hidden="true"></i>Shoes</a></li>
										<li><a href="handbags.html"><i className="fa fa-angle-right" aria-hidden="true"></i>Handbags</a></li>
										<li><a href="skincare.html"><i className="fa fa-angle-right" aria-hidden="true"></i>Skin care</a></li>

                                        </ul>
                                    </div>

                                    <div className="col-sm-4 w3l">
                                        <a href="jewellery.html">
                                            <img src="images/menu2.jpg" className="img-responsive" alt=""/>
                                        </a>
									</div>

									<div className="clearfix"></div>

                                </div>
                            </ul>

                        </li>

                        <li><a href="about.html" className="hyper"><span>About</span></a></li>
						<li><a href="contact.html" className="hyper"><span>Contact Us</span></a></li>

                    </ul>
                </div>    
            </nav>
        </div>




		{localStorage.userLoginToken ? userLink: loginRegLink}






		<div className="clearfix"></div>
	</div>
</div>



<script src="js/minicart.js"></script>


    </div>
   
  );




	}
	
}
export default withRouter(Header);