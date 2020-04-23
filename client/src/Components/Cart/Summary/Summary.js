import React, { useState } from 'react';

import classes from './Summary.module.css';

const summary = (props) => {

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>Order Summary</h2>
      </div>

      <div className={classes.details}>
        <div className={classes.subtotal}>
          <span>Subtotal</span>
          <span>LKR 2000.00</span>
        </div>
        <div className={classes.discount}>
          <span>Discount</span>
          <span>LKR 200.00</span>
        </div>
      </div>

      <div className={classes.total}>
        <span className={classes.total__span1}>Total</span>
        <span className={classes.total__span2}>LKR 1800.00</span>
      </div>

      <div className={classes.button}>
        <button>BUY</button>
      </div>
    </div>
  );
};

export default summary;