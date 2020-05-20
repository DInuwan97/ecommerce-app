import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import classes from "./Header.module.css";
import Minicart from "../MiniCart/Minicart";
import jwt_decode from "jwt-decode";
//import { decode } from 'punycode';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      isAdmin: false,
      isCustomer: false,
      isSalesManager: false,
      isSalesServicer: false,
      isMinicartActive: false,
    };
    console.log("localstorage login token :", localStorage.userLoginToken);

    const redirectForm = this.props.location.redirectForm;
    if (redirectForm == "/") {
      window.location.reload(true);
    }

    ///window.location.reload(true);
  }

  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("userLoginToken");
    this.props.history.push("/login");
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
      });
      console.log("Decoded token is : ", decoded);
    }

    // code for open close minicart
  }

  openMinicart = () => {
    console.log("open");
    if (!this.state.isMinicartActive) {
      this.setState({ isMinicartActive: true });
    } else {
      this.setState({ isMinicartActive: false });
    }
  };

  closeMinicart = () => {
    console.log("close");
    this.setState({ isMinicartActive: false });
  };

  render() {
    const loginRegLink = (
      <div
        className="collapse navbar-collapse"
        id="bs-megadropdown-tabs"
        style={{ float: "right" }}
      >
        <ul className="nav navbar-nav ">
          <li>
            <Link to="/login" className="hyper">
              <span>Login</span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="hyper"
              style={{ marginLeft: "15px" }}
            >
              <span>Register</span>
            </Link>
          </li>
        </ul>
      </div>
    );

    const userLink = (
      <div className={classes.usernav}>
        <div className={classes.userimage}>
          <figure className={classes.imageFig}>
            <img
              src={require("./assets/images/user.jpg")}
              alt="Product Image"
              className={classes.image}
            />
          </figure>
        </div>

        <div className={classes.username}>
          <span>Hello {this.state.firstName}</span>
        </div>

        <div className={classes.icon}>
          <span>&#94;</span>
        </div>

        <div className={classes.links}>
          <ul className={classes.linksList}>
            <li className={classes.link}>
              <Link to="/editMyProfile">
                <span>My Profile</span>
              </Link>
            </li>
            <li className={classes.link}>
              <Link to="/purchasedOrders">
                <span>My Orders</span>
              </Link>
            </li>
            <li className={classes.link}>
              <Link to="/wishlist" className="hyper">
                <span>Wishlist</span>
              </Link>
            </li>
            <li className={classes.link}>
              <a href="#">Security Policies</a>
            </li>
            <li className={classes.link}>
              <a href="#">Privacy Change</a>
            </li>
            <li className={classes.link}>
              <a onClick={this.logOut.bind(this)} href="#">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    return (
      <div>
        {this.state.isMinicartActive ? (
          <Minicart
            active={this.state.isMinicartActive}
            close={this.closeMinicart}
          />
        ) : null}

        <div className="header-top-w3layouts">
          <div className="container">
            <div className="col-md-6 logo-w3">
              <a href="/">
                <img src="/images/logo2.png" alt=" " />
                <h1>
                  FASHION<span>CLUB</span>
                </h1>
              </a>
            </div>

            <div
              className="col-md-4 search-agileinfo"
              style={{ float: "right" }}
            >
              <form action="#" method="post">
                <input
                  type="search"
                  name="Search"
                  placeholder="Search for a Product..."
                  required=""
                />
                <button
                  type="submit"
                  className="btn btn-default search"
                  aria-label="Left Align"
                >
                  <i className="fa fa-search" aria-hidden="true">
                    {" "}
                  </i>
                </button>
              </form>
            </div>

            <div className="col-md-1 cart-wthree" style={{ float: "right" }}>
              <div onClick={this.openMinicart}>
                <svg
                  id="minicartIcon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="28"
                  viewBox="0 0 26 28"
                >
                  <title>Minicart</title>
                  <path d="M20 11c0-0.547-0.453-1-1-1-0.266 0-0.516 0.109-0.703 0.297l-2.297 2.281v-4.578c0-0.547-0.453-1-1-1s-1 0.453-1 1v4.578l-2.297-2.281c-0.187-0.187-0.438-0.297-0.703-0.297-0.547 0-1 0.453-1 1 0 0.266 0.109 0.516 0.297 0.703l4 4c0.187 0.187 0.438 0.297 0.703 0.297s0.516-0.109 0.703-0.297l4-4c0.187-0.187 0.297-0.438 0.297-0.703zM10 24c0 1.109-0.891 2-2 2s-2-0.891-2-2 0.891-2 2-2 2 0.891 2 2zM24 24c0 1.109-0.891 2-2 2s-2-0.891-2-2 0.891-2 2-2 2 0.891 2 2zM26 7v8c0 0.5-0.375 0.938-0.891 1l-16.312 1.906c0.063 0.344 0.203 0.734 0.203 1.094s-0.219 0.688-0.375 1h14.375c0.547 0 1 0.453 1 1s-0.453 1-1 1h-16c-0.547 0-1-0.453-1-1 0-0.484 0.734-1.687 0.953-2.141l-2.766-12.859h-3.187c-0.547 0-1-0.453-1-1s0.453-1 1-1h4c1.062 0 1.078 1.25 1.234 2h18.766c0.547 0 1 0.453 1 1z"></path>
                </svg>
              </div>

              {/* <div className="cart"> 
				<form action="#" method="post" className="last"> 
					<input type="hidden" name="cmd" value="_cart" />
					<input type="hidden" name="display" value="1" />
					<button className="w3view-cart" type="submit" name="submit" value=""><i className="fa fa-cart-arrow-down" aria-hidden="true"></i></button>
				</form>  
			</div>			 */}
            </div>

            <div className="clearfix"></div>
          </div>
        </div>

        <div className="header-bottom-w3ls">
          <div className="container">
            <div className="col-md-7 navigation-agileits">
              <nav className="navbar navbar-default">
                <div className="navbar-header nav_2">
                  <button
                    type="button"
                    className="navbar-toggle collapsed navbar-toggle1"
                    data-toggle="collapse"
                    data-target="#bs-megadropdown-tabs"
                  >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>

                <div
                  className="collapse navbar-collapse"
                  id="bs-megadropdown-tabs"
                >
                  <ul className="nav navbar-nav ">
                    <li className=" active">
                      <a href="index.html" className="hyper ">
                        <span>Home</span>
                      </a>
                    </li>

                    <li className="dropdown ">
                      <a
                        href="#"
                        className="dropdown-toggle  hyper"
                        data-toggle="dropdown"
                      >
                        <span>
                          Clothing<b className="caret"></b>
                        </span>
                      </a>

                      <ul className="dropdown-menu multi">
                        <div className="row">
                          <div className="col-sm-4">
                            <ul className="multi-column-dropdown">
                              <li>
                                <a href="women.html">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Women's Clothing
                                </a>
                              </li>
                              <li>
                                <a href="men.html">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Men's Clothing
                                </a>
                              </li>
                              <li>
                                <a href="kids.html">
                                  {" "}
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Kid's Wear
                                </a>
                              </li>
                              <li>
                                <a href="party.html">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Party Wear
                                </a>
                              </li>
                            </ul>
                          </div>

                          <div className="col-sm-4">
                            <ul className="multi-column-dropdown">
                              <li>
                                <a href="casuals.html">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Casuals
                                </a>
                              </li>
                              <li>
                                <a href="night.html">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Night Wear
                                </a>
                              </li>
                              <li>
                                <a href="formals.html">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Formals
                                </a>
                              </li>
                              <li>
                                <a href="inner.html">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Inner Wear
                                </a>
                              </li>
                            </ul>
                          </div>

                          <div className="col-sm-4 w3l">
                            <a href="women.html">
                              <img
                                src={require("./assets/images/menu1.jpg")}
                                className="img-responsive"
                                alt=""
                              />
                            </a>
                          </div>

                          <div className="clearfix"></div>
                        </div>
                      </ul>
                    </li>

                    <li className="dropdown ">
                      <a
                        href="#"
                        className="dropdown-toggle hyper"
                        data-toggle="dropdown"
                      >
                        <span>
                          {" "}
                          Personal Care <b className="caret"></b>
                        </span>
                      </a>

                      <ul className="dropdown-menu multi multi1">
                        <div className="row">
                          <div className="col-sm-4">
                            <ul className="multi-column-dropdown">
                              <li>
                                <a href="jewellery.html">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Jewellery{" "}
                                </a>
                              </li>
                              <li>
                                <a href="watches.html">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Watches
                                </a>
                              </li>
                              <li>
                                <a href="cosmetics.html">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Cosmetics
                                </a>
                              </li>
                              <li>
                                <a href="deos.html">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Deo & Perfumes
                                </a>
                              </li>
                            </ul>
                          </div>

                          <div className="col-sm-4">
                            <ul className="multi-column-dropdown">
                              <li>
                                <a href="haircare.html">
                                  {" "}
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Hair Care{" "}
                                </a>
                              </li>
                              <li>
                                <a href="shoes.html">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Shoes
                                </a>
                              </li>
                              <li>
                                <a href="handbags.html">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Handbags
                                </a>
                              </li>
                              <li>
                                <a href="skincare.html">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Skin care
                                </a>
                              </li>
                            </ul>
                          </div>

                          <div className="col-sm-4 w3l">
                            <a href="jewellery.html">
                              <img
                                src={require("./assets/images/menu2.jpg")}
                                className="img-responsive"
                                alt=""
                              />
                            </a>
                          </div>

                          <div className="clearfix"></div>
                        </div>
                      </ul>
                    </li>

                    <li>
                      <a href="/about.html" className="hyper">
                        <span>About</span>
                      </a>
                    </li>
                    <li>
                      <a href="/contact.html" className="hyper">
                        <span>Contact Us</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>

            {localStorage.userLoginToken ? userLink : loginRegLink}

            <div className="clearfix"></div>
          </div>
        </div>

        <script src="js/minicart.js"></script>
      </div>
    );
  }
}
export default withRouter(Header);
