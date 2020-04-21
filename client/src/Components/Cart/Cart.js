import React, { Component } from 'react';

import SelectAll from './Selectall/SelectAll';
import CartItem from './CartItem/CartItem';
import Summary from './Summary/Summary';

import classes from "./Cart.module.css";

class Cart extends Component {


  render() {


    return (

      <div className={classes.container}>
        <div className={classes.leftPanel}>
          <div className={classes.selectAll}>
            <SelectAll />
          </div>

          <div className={classes.cartItems}>
            <CartItem />
            <CartItem />
          </div>

          <div className={classes.paymentDetail}>payment details</div>

          <div className={classes.moreItems}>more items</div>
        </div>

        <div id="rightPanel" className={classes.rightPanel}>
          <Summary />
        </div>
      </div>
    );
  }
}

export default Cart;