import React from 'react';

import classes from "./PaymentInfo.module.css";


const PaymentInfo = props => {

  return (
    <div className={classes.container}>
      <span className={classes.step}>Step 2 of 3</span>
      <h3 className={classes.header}>Payment Details</h3>
    </div>
  );

};

export default PaymentInfo;