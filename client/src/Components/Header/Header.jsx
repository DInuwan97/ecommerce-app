import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom';

export class Header extends Component {
    render(){
  return (
    <div>

      <div className="header-top-w3layouts">
	    <div className="container">

		<div className="col-md-6 logo-w3">
			<a href="index.html"><img src="images/logo2.png" alt=" " /><h1>FASHION<span>CLUB</span></h1></a>
		</div>

		<div className="col-md-6 phone-w3l">
			<ul>
                <li><a href="login.html" class="hyper"><span>Login</span></a></li>
                <li><a href="login.html" class="hyper" style={{marginLeft:"20px"}}><span>Register</span></a></li>
			</ul>

            
		</div>
		        <div className="clearfix"></div>

	        </div>
        </div>


 <div className="header-bottom-w3ls">
	<div className="container">
        <div className="col-md-7 navigation-agileits">
			<nav className="navbar navbar-default">
				<div className="navbar-header nav_2">

                    <button type="button" class="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>

            	</div>


                <div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
					<ul className="nav navbar-nav ">
						<li className=" active"><a href="index.html" class="hyper "><span>Home</span></a></li>	

						<li className="dropdown ">
                        <a href="#" class="dropdown-toggle  hyper" data-toggle="dropdown" ><span>Clothing<b class="caret"></b></span></a>

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

                                        <li><a href="casuals.html"><i class="fa fa-angle-right" aria-hidden="true"></i>Casuals</a></li>
										<li><a href="night.html"><i class="fa fa-angle-right" aria-hidden="true"></i>Night Wear</a></li>
										<li><a href="formals.html"><i class="fa fa-angle-right" aria-hidden="true"></i>Formals</a></li>
										<li><a href="inner.html"><i class="fa fa-angle-right" aria-hidden="true"></i>Inner Wear</a></li>

                                        </ul>
                                    </div>

                                    <div class="col-sm-4 w3l">
										<a href="women.html">
                                            <img src="assets/images/menu1.jpg" class="img-responsive" alt="" />
                                        </a>
									</div>

									<div class="clearfix"></div>

                                </div>
                            </ul>

                        </li>




                        <li className="dropdown ">
                        <a href="#" class="dropdown-toggle hyper" data-toggle="dropdown" ><span> Personal Care <b class="caret"></b></span></a>

                            <ul className="dropdown-menu multi multi1">
								<div className="row">

									<div className="col-sm-4">
										<ul className="multi-column-dropdown">

                                        <li><a href="jewellery.html"><i class="fa fa-angle-right" aria-hidden="true"></i>Jewellery </a></li>
										<li><a href="watches.html"><i class="fa fa-angle-right" aria-hidden="true"></i>Watches</a></li>
										<li><a href="cosmetics.html"><i class="fa fa-angle-right" aria-hidden="true"></i>Cosmetics</a></li>
										<li><a href="deos.html"><i class="fa fa-angle-right" aria-hidden="true"></i>Deo & Perfumes</a></li>

                                        </ul>
                                    </div>


                                    <div className="col-sm-4">
										<ul className="multi-column-dropdown">

                                        <li><a href="haircare.html"> <i class="fa fa-angle-right" aria-hidden="true"></i>Hair Care </a></li>
										<li><a href="shoes.html"><i class="fa fa-angle-right" aria-hidden="true"></i>Shoes</a></li>
										<li><a href="handbags.html"><i class="fa fa-angle-right" aria-hidden="true"></i>Handbags</a></li>
										<li><a href="skincare.html"><i class="fa fa-angle-right" aria-hidden="true"></i>Skin care</a></li>

                                        </ul>
                                    </div>

                                    <div class="col-sm-4 w3l">
                                        <a href="jewellery.html">
                                            <img src="images/menu2.jpg" class="img-responsive" alt=""/>
                                        </a>
									</div>

									<div class="clearfix"></div>

                                </div>
                            </ul>

                        </li>

                        <li><a href="about.html" class="hyper"><span>About</span></a></li>
						<li><a href="contact.html" class="hyper"><span>Contact Us</span></a></li>

                        
                       
                        
                    </ul>
                </div>    
            </nav>
        </div>
        
    

		<div className="col-md-4 search-agileinfo">
			<form action="#" method="post">
				<input type="search" name="Search" placeholder="Search for a Product..." required="" />
				<button type="submit" className="btn btn-default search" aria-label="Left Align">
					<i className="fa fa-search" aria-hidden="true"> </i>
				</button>
			</form>
		</div>
		<div className="col-md-1 cart-wthree">
			<div className="cart"> 
				<form action="#" method="post" className="last"> 
					<input type="hidden" name="cmd" value="_cart" />
					<input type="hidden" name="display" value="1" />
					<button class="w3view-cart" type="submit" name="submit" value=""><i className="fa fa-cart-arrow-down" aria-hidden="true"></i></button>
				</form>  
			</div>
		</div>
		<div className="clearfix"></div>
	</div>
</div>

    </div>
   
  )
    }
}
export default withRouter(Header);