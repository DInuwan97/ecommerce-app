import React from 'react';

import classes from "./DeliveryInfo.module.css";


const DeliveryInfo = props => {

  return (
    <div className={classes.container}>
      <span className={classes.step}>Step 1 of 3</span>
      <h3 className={classes.header}>Delivery Information</h3>
    </div>
  );

};

export default DeliveryInfo;