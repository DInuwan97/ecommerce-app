import React from 'react';

import classes from './PaymentDetail.module.css';

const PaymentDetail = props => {

  return (
    <div className={classes.container}>
      <h4>Payment Methods</h4>
      <div className={classes.images}>
        <img src={require('../assets/images/visa.jpg')} alt="visa" />
        <img src={require('../assets/images/mastercard.png')} alt="master card" />
      </div>
    </div>
  );
};

export default PaymentDetail;