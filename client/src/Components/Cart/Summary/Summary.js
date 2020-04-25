import React, { useState } from 'react';

import classes from './Summary.module.css';

const Summary = (props) => {
  console.log(props.details);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>Order Summary</h2>
      </div>

      <div className={classes.details}>
        <div className={classes.subtotal}>
          <span>Subtotal</span>
          <span>LKR {props.details.subtotal.toFixed(2)}</span>
        </div>
        <div className={classes.discount}>
          <span>Discount</span>
          <span>{props.details.totalDiscount.toFixed(2)}</span>
        </div>
      </div>

      <div className={classes.total}>
        <span className={classes.total__span1}>Total</span>
        <span className={classes.total__span2}>LKR {props.details.total.toFixed(2)}</span>
      </div>

      <div className={classes.button}>
        <button className={classes.button_buy} onClick={props.buy} disabled={props.details.isDisabled}>BUY</button>
      </div>
    </div>
  );
};

export default Summary;