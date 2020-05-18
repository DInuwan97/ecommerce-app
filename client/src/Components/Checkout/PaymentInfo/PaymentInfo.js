import React, { useState } from 'react';

import classes from "./PaymentInfo.module.css";

const PaymentInfo = props => {
  let valueA;

  const changeHandler = (event) => {
    valueA = event.target.value;
  };

  const changeBack = (field, event) => {
    let key = event.key;

    setTimeout(() => {
      let value = valueA;
      if (key == "Backspace") {

        if (field == "number") {
          value = "";
          props.change("number_b", value);
          return;
        }
        if (field == "expire") {
          if (value.length == 4) {
            value = "";
            props.change("expire_b", value);
            return;
          } else {
            props.change(field, value);
            return;
          }

        }
      } else {
        props.change(field, value);
      }

    }, 10);
  };

  return (
    <div className={classes.container}>
      <span className={classes.step}>Step 2 of 3</span>
      <h3 className={classes.header}>Payment Details</h3>

      <div className={classes.logos}>
        <img src={require('../assets/images/visa.jpg')} alt="visa" />
        <img src={require('../assets/images/mastercard.png')} alt="master card" />
      </div>

      <div className={classes.card}>
        <div className={classes.card__left}>
          <div className={classes.card__left__1}>
            <div className={classes.card_number}>
              <label>CARD NUMBER</label>
              <input type="text" placeholder="0000 0000 0000 0000"
                onChange={changeHandler}
                onKeyDown={changeBack.bind(this, "number")}
                value={props.number} required />
            </div>

          </div>
          <div className={classes.card__left__2}>
            <div className={classes.card_holder}>
              <label>CARD HOLDER</label>
              <input type="text" maxLength="30"
                onChange={changeHandler}
                onKeyDown={changeBack.bind(this, "holder")}
                value={props.holder} required />
            </div>
            <div className={classes.card_expires}>
              <label>EXPIRES</label>
              <input type="text" placeholder="MM/YY"
                onChange={changeHandler}
                onKeyDown={changeBack.bind(this, "expire")}
                value={props.expire} required />
            </div>
          </div>
        </div>
        <div className={classes.card__right}>
          <div className={classes.card__right__1}>
            &nbsp;
          </div>
          <div className={classes.card__right__2}>
            <label>CW</label>
            <input type="text" placeholder="000"
              onChange={changeHandler}
              onKeyDown={changeBack.bind(this, "cw")}
              value={props.cw} required />
          </div>
        </div>
      </div>

    </div>
  );

};

export default PaymentInfo;