import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="col-md-3 footer-grids fgd1">
            <Link to="/">
              <img src="/images/logo2.png" alt=" " />
              <h3>
                FASHION<span>CLUB</span>
              </h3>
            </Link>
            <ul>
              <li>1234k Avenue, 4th block,</li>
              <li>Colombo.</li>
              <li>
                <a href="mailto:FashionStoreBionics@gmail.com">FashionStoreBionics@gmail.com</a>
              </li>
              <a href="https://www.twitter.com">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a href="https://www.dribble.com">
                <i className="fa fa-dribbble" aria-hidden="true"></i>
              </a>
              <a href="https://www.facebook.com">
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="https://www.linkedin.com">
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>
            </ul>
          </div>
          <div className="col-md-3 footer-grids fgd2">
            <h4>Information</h4>
            <ul>
              <li>
                <Link to="/contactus">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq">FAQ's</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 footer-grids fgd3">
            <h4>Shop</h4>
            <ul>
              <li>
                <Link to="/jewellery">Jewellery</Link>
              </li>
              <li>
                <Link to="/cosmetics">Cosmetics</Link>
              </li>
              <li>
                <Link to="/Shoes">Shoes</Link>
              </li>
              <li>
                <Link to="/deos">Deos</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 footer-grids fgd4">
            <h4>My Account</h4>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </div>
          <div className="clearfix"></div>
          <p className="copy-right">
            © 2020 Fashion Club . All rights reserved | Design by{" "}
            <Link to=""> Bionics.</Link>
          </p>
        </div>
      </div>
    );
  }
}
