import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="col-md-3 footer-grids fgd1">
            <a href="index.html">
              <img src="/images/logo2.png" alt=" " />
              <h3>
                FASHION<span>CLUB</span>
              </h3>
            </a>
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
                <a href="/contactus">Contact Us</a>
              </li>
              <li>
                <a href="icons.html">Web Icons</a>
              </li>
              <li>
                <a href="typography.html">Typography</a>
              </li>
              <li>
                <a href="faq.html">FAQ's</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 footer-grids fgd3">
            <h4>Shop</h4>
            <ul>
              <li>
                <a href="jewellery.html">Jewellery</a>
              </li>
              <li>
                <a href="cosmetics.html">Cosmetics</a>
              </li>
              <li>
                <a href="Shoes.html">Shoes</a>
              </li>
              <li>
                <a href="deos.html">Deos</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 footer-grids fgd4">
            <h4>My Account</h4>
            <ul>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
              <li>
                <a href="recommended.html">Recommended </a>
              </li>
              <li>
                <a href="/cart">Cart</a>
              </li>
            </ul>
          </div>
          <div className="clearfix"></div>
          <p className="copy-right">
            © 2020 Fashion Club . All rights reserved | Design by{" "}
            <a href=""> Bionics.</a>
          </p>
        </div>
      </div>
    );
  }
}
