import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";

import classes from "./Header.module.css";
import Minicart from "../MiniCart/Minicart";
import jwt_decode from "jwt-decode";
//import { decode } from 'punycode';
import Avatar from 'react-avatar';
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
      search: "",
      path: "/",
      userImageUrl:''
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
        userImageUrl:decoded.userImageUrl
      });
      console.log("Decoded token is : ", decoded);
    }
    if (this.props.location.pathname) {
      let path = "/";
      switch (this.props.location.pathname) {
        case "/":
          path = "/"
          break;
        case "/contactus":
          path = "contactus"
          break;
        case "/women":
        case "/men":
        case "/kids":
        case "/formals":
        case "/party":
        case "/casuals":
        case "/night":
        case "/inner":
          path = "clothing"
          break;
        case "/jewellery":
        case "/watches":
        case "/cosmetics":
        case "/deos":
        case "/haircare":
        case "/shoes":
        case "/handbags":
        case "/skincare":
          path = "personal"
          break;
        default:
          path = ""
          break;
      }
      this.setState({
        path: path
      })
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


  searchOnChange = (e) => {
    if (e.key === 'Enter') {
      this.SearchItem();
    }

    this.setState({
      search: e.target.value
    });

  }

  SearchItem = () => {
    this.props.history.push(`/${this.state.search}`);
    window.location.reload(true);
  }

  componentWillReceiveProps = (props) => {
    if (this.props.location.pathname !== props.location.pathname) {
      let path = "/";
      switch (props.location.pathname) {
        case "/":
          path = "/"
          break;
        case "/contactus":
          path = "contactus"
          break;
        case "/women":
        case "/men":
        case "/kids":
        case "/formals":
        case "/party":
        case "/casuals":
        case "/night":
        case "/inner":
          path = "clothing"
          break;
        case "/jewellery":
        case "/watches":
        case "/cosmetics":
        case "/deos":
        case "/haircare":
        case "/shoes":
        case "/handbags":
        case "/skincare":
          path = "personal"
          break;
        default:
          path = ""
          break;
      }
      this.setState({
        path: path
      })
    }
  }

  render() {

    let imgPreviewMainMenu;
    if (this.state.userImageUrl != '') {
      imgPreviewMainMenu = <img src={this.state.userImageUrl}  alt="Product Image" className={classes.image}  style={{width:'40px',height:'40px',borderRadius:'100px'}}/>;
    }else{
      imgPreviewMainMenu = <Avatar name={this.state.firstName+ ' ' +this.state.lastName} className={classes.avatarimg} round="50%" size='40'/>;
    }


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
            <div className={classes.avatarimgdiv}>
              {imgPreviewMainMenu}
            </div>
           
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
              <Link to="/">
                <img src="/images/logo2.png" alt=" " />
                <h1>
                  FASHION<span>CLUB</span>
                </h1>
              </Link>
            </div>

            <div
              className="col-md-4 search-agileinfo"
              style={{ float: "right" }}
            >

              <input onKeyUp={(e) => this.searchOnChange(e)}
                type="search"
                name="Search"
                placeholder="Search for a Product..."
                required=""
              />
              <button onSubmit={(e) => this.SearchItem(e)}
                type="submit"
                className="btn btn-default search"
                aria-label="Left Align"
              >
                <i className="fa fa-search" aria-hidden="true">
                  {" "}
                </i>
              </button>

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
                    <li className={this.state.path === "/" ? " active" : ""}>
                      <Link to="/" className="hyper ">
                        <span>Home</span>
                      </Link>
                    </li>

                    <li className={this.state.path === "clothing" ? "dropdown active":"dropdown"}>
                      <Link
                        to="#"
                        className="dropdown-toggle  hyper"
                        data-toggle="dropdown"
                      >
                        <span>
                          Clothing<b className="caret"></b>
                        </span>
                      </Link>

                      <ul className="dropdown-menu multi">
                        <div className="row">
                          <div className="col-sm-4">
                            <ul className="multi-column-dropdown">
                              <li>
                                <Link to="/women">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Women's Clothing
                                </Link>
                              </li>
                              <li>
                                <Link to="/men">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Men's Clothing
                                </Link>
                              </li>
                              <li>
                                <Link to="/kids">
                                  {" "}
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Kid's Wear
                                </Link>
                              </li>
                              <li>
                                <Link to="/party">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Party Wear
                                </Link>
                              </li>
                            </ul>
                          </div>

                          <div className="col-sm-4">
                            <ul className="multi-column-dropdown">
                              <li>
                                <Link to="/casuals">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Casuals
                                </Link>
                              </li>
                              <li>
                                <Link to="/night">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Night Wear
                                </Link>
                              </li>
                              <li>
                                <Link to="/formals">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Formals
                                </Link>
                              </li>
                              <li>
                                <Link to="/inner">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Inner Wear
                                </Link>
                              </li>
                            </ul>
                          </div>

                          <div className="col-sm-4 w3l">
                            <Link to="/women">
                              <img
                                src={require("./assets/images/menu1.jpg")}
                                className="img-responsive"
                                alt=""
                              />
                            </Link>
                          </div>

                          <div className="clearfix"></div>
                        </div>
                      </ul>
                    </li>

                    <li className={this.state.path === "personal" ? "dropdown active":"dropdown"}>
                      <Link
                        to="#"
                        className="dropdown-toggle hyper"
                        data-toggle="dropdown"
                      >
                        <span>
                          {" "}
                          Personal Care <b className="caret"></b>
                        </span>
                      </Link>

                      <ul className="dropdown-menu multi multi1">
                        <div className="row">
                          <div className="col-sm-4">
                            <ul className="multi-column-dropdown">
                              <li>
                                <Link to="/jewellery">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Jewellery{" "}
                                </Link>
                              </li>
                              <li>
                                <Link to="/watches">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Watches
                                </Link>
                              </li>
                              <li>
                                <Link to="/cosmetics">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Cosmetics
                                </Link>
                              </li>
                              <li>
                                <Link to="/deos">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Deo & Perfumes
                                </Link>
                              </li>
                            </ul>
                          </div>

                          <div className="col-sm-4">
                            <ul className="multi-column-dropdown">
                              <li>
                                <Link to="/haircare">
                                  {" "}
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Hair Care{" "}
                                </Link>
                              </li>
                              <li>
                                <Link to="/shoes">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Shoes
                                </Link>
                              </li>
                              <li>
                                <Link to="/handbags">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Handbags
                                </Link>
                              </li>
                              <li>
                                <Link to="/skincare">
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                  Skin care
                                </Link>
                              </li>
                            </ul>
                          </div>

                          <div className="col-sm-4 w3l">
                            <Link to="/jewellery">
                              <img
                                src={require("./assets/images/menu2.jpg")}
                                className="img-responsive"
                                alt=""
                              />
                            </Link>
                          </div>

                          <div className="clearfix"></div>
                        </div>
                      </ul>
                    </li>

                    <li className={this.state.path === "about" ? " active":""}>
                      <Link to="/contactus" className="hyper">
                        <span>About</span>
                      </Link>
                    </li>
                    <li className={this.state.path === "contactus" ? " active":""}>
                      <Link to="/contactus" className="hyper">
                        <span>Contact Us</span>
                      </Link>
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
