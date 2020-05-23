import React from "react";
import {Link} from 'react-router-dom';

export default function Offer() {
  return (
    <div class="banner-bootom-w3-agileits">
      <div class="container">
        <div class="col-md-5 bb-grids bb-left-agileits-w3layouts">
          <Link to="/women">
            <div class="bb-left-agileits-w3layouts-inner">
              <h3>Women's Clothing</h3>
              
            </div>
          </Link>
        </div>
        <div class="col-md-4 bb-grids bb-middle-agileits-w3layouts">
          <Link to="/shoes">
            <div class="bb-middle-top">
              <h3>Shoes</h3>
              
            </div>
          </Link>
          <Link to="/jewellery">
            <div class="bb-middle-bottom">
              <h3>Jewellary</h3>
              
            </div>
          </Link>
        </div>
        <div class="col-md-3 bb-grids bb-right-agileits-w3layouts">
          <Link to="/watches">
            <div class="bb-right-top">
              <h3>Watches</h3>
              
            </div>
          </Link>
          <Link to="/handbags">
            <div class="bb-right-bottom">
              <h3>Handbags</h3>
              
            </div>
          </Link>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  );
}
