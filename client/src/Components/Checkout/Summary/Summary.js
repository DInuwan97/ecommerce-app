import React from 'react';

import classes from "./Summary.module.css";

const Summary = props => {
  console.log(props.summary);
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>Checkout Summary</h2>
      </div>

      <div className={classes.details}>
        <div className={classes.subtotal}>
          <span>Items ({props.noOfItems})</span>
          <span>LKR {props.summary.total.toFixed(2)}</span>
        </div>
        <div className={classes.discount}>
          <span>Delivery</span>
          <span>LKR 0.00</span>
        </div>
      </div>

      <div className={classes.total}>
        <span className={classes.total__span1}>Order Total</span>
        <span className={classes.total__span2}>LKR {props.summary.total.toFixed(2)}</span>
      </div>

      <div className={classes.button}>
        <button className={classes.button_buy}>ORDER</button>
      </div>
    </div>
  );

};

export default Summary;