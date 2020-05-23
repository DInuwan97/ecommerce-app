import React, { useState } from 'react';

import classes from "./PaymentInfo.module.css";

const PaymentInfo = props => {

  let special = false;
  const changeFieldHandler = event => {
    const numberField = document.getElementById("numberField");
    const holderField = document.getElementById("holderField");
    const expireField = document.getElementById("expireField");
    const cwField = document.getElementById("cwField");
    let value;
    switch (event.target.id) {
      case "numberField":
        value = numberField.value;

        if (event.key == "Backspace" && (value.length == 5 || value.length == 10 || value.length == 15)) {
          value = value.trim();
          special = true;
        }
        if (isNaN(value[value.length - 1])) {
          value = value.substring(0, value.length - 1);
        }
        if (event.key != "Backspace" && !isNaN(value[value.length - 1]) && (value.length == 4 || value.length == 9 || value.length == 14)) {
          value += " ";
        }
        if (event.key != "Backspace" && !isNaN(value[value.length - 1]) && (value.length == 5 || value.length == 10 || value.length == 15) && special) {
          value = value.substring(0, value.length - 1) + " " + value[value.length - 1];
          console.log(value);
          special = false;
        }

        numberField.value = value;
        checkFieldValidity(numberField, "number");
        break;

      case "holderField":
        checkFieldValidity(holderField, "holder");
        break;

      case "expireField":
        value = expireField.value;

        checkFieldValidity(expireField, "expire");

        if (event.key == "Backspace" && (value.length == 4)) {
          value = value.substring(0, value.length);
          special = true;
        }
        if (isNaN(value[value.length - 1])) {
          value = value.substring(0, value.length - 1);
        }
        if (event.key != "Backspace" && !isNaN(value[value.length - 1]) && (value.length == 2)) {
          value += "/";
        }
        if (event.key != "Backspace" && !isNaN(value[value.length - 1]) && (value.length == 3) && special) {
          value = value.substring(0, value.length - 1) + "/" + value[value.length - 1];
          special = false;
        }

        expireField.value = value;
        checkFieldValidity(expireField, "expire");
        break;

      case "cwField":
        value = cwField.value;

        if (isNaN(value[value.length - 1]) || Number.parseInt(value) > 999) {
          value = value.substring(0, value.length - 1);
        }

        cwField.value = value;
        checkFieldValidity(cwField, "cw");
        break;

      default:
        console.log("No field match");
    }

  }

  const checkFieldValidity = (field, type) => {
    let isInvalid = false;

    switch (type) {
      case "number":
        if (field.value.trim().length == 0) {
          isInvalid = true;
          addWarningList("Card number is required");
        } else {
          isInvalid = false;
          removeWarningList("Card number is required");
        }

        if (field.value.length != 19) {
          isInvalid = true;
          addWarningList("Invalid card number");
        } else {
          isInvalid = false;
          removeWarningList("Invalid card number");
        }
        break;

      case "holder":
        if (field.value.trim().length == 0) {
          isInvalid = true;
          addWarningList("Card holder's name is required");
        } else {
          isInvalid = false;
          removeWarningList("Card holder's name is required");
        }
        break;

      case "expire":
        if (field.value.trim().length == 0) {
          isInvalid = true;
          addWarningList("Expire date is required");
        } else {
          isInvalid = false;
          removeWarningList("Expire date is required");
        }

        if (field.value.length != 5) {
          isInvalid = true;
          addWarningList("Invalid expire date");
        } else {
          isInvalid = false;
          removeWarningList("Invalid expire date");
        }

        if (Number.parseInt(field.value.substring(0, 2)) > 12 || Number.parseInt(field.value.substring(0, 2)) == 0) {
          isInvalid = true;
          addWarningList("Expire date doesnot exist");
        } else {
          isInvalid = false;
          removeWarningList("Expire date doesnot exist");
        }
        break;

      case "cw":
        if (field.value.trim().length == 0) {
          isInvalid = true;
          addWarningList("Pin is required");
        } else {
          isInvalid = false;
          removeWarningList("Pin is required");
        }

        if (field.value.length != 3) {
          isInvalid = true;
          addWarningList("Invalid pin");
        } else {
          isInvalid = false;
          removeWarningList("Invalid pin");
        }
        break;

      default:
        console.log("no field match");
    }

    if (isInvalid) {
      field.style.borderBottom = "1px solid red";
      field.previousSibling.style.color = "orangered";
    } else {
      field.style.borderBottom = "1px solid rgba(0, 0, 0, 0.5)";
      field.previousSibling.style.color = "rgba(0, 0, 0, 0.2)";
    }

  }

  const addWarningList = (warning) => {
    const warningList = document.getElementById("warningList");
    let hasNode = false;
    warningList.querySelectorAll('*').forEach(n => {
      if (n.innerHTML.toString() == warning) {
        hasNode = true;
      }
    });
    if (!hasNode) {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(warning));
      warningList.appendChild(li);
    }
  };

  const removeWarningList = (warning) => {
    const warningList = document.getElementById("warningList");
    let hasNode = false;
    let li;
    warningList.querySelectorAll('*').forEach(n => {
      if (n.innerHTML == warning) {
        hasNode = true;
        li = n;
      }
    });
    if (hasNode) {
      warningList.removeChild(li);
    }
  };

  return (
    <div className={classes.container}>
      <span className={classes.step}>Step 2 of 2</span>
      <h3 className={classes.header}>Payment Details</h3>

      <div className={classes.logos}>
        <img src={require('../assets/images/visa.jpg')} alt="visa" />
        <img src={require('../assets/images/mastercard.png')} alt="master card" />
      </div>

      <form className={classes.card}>
        <div className={classes.card__left}>
          <div className={classes.card__left__1}>
            <div className={classes.card_number}>
              <label>CARD NUMBER</label>
              <input id="numberField" type="text" maxLength="19" placeholder="0000 0000 0000 0000"
                onKeyUp={changeFieldHandler}
                required />
            </div>

          </div>
          <div className={classes.card__left__2}>
            <div className={classes.card_holder}>
              <label>CARD HOLDER</label>
              <input id="holderField" type="text" maxLength="30"
                onKeyUp={changeFieldHandler}
                required />
            </div>
            <div className={classes.card_expires}>
              <label>EXPIRES</label>
              <input id="expireField" type="text" maxLength="5" placeholder="MM/YY"
                onKeyUp={changeFieldHandler}
                required />
            </div>
          </div>
        </div>
        <div className={classes.card__right}>
          <div className={classes.card__right__1}>
            &nbsp;
          </div>
          <div className={classes.card__right__2}>
            <label>CW</label>
            <input id="cwField" type="number" placeholder="000"
              onKeyUp={changeFieldHandler}
              required />
          </div>
        </div>
      </form>

      <div className={classes.warnings}>
        <ul id="warningList" className={classes.warningList}></ul>
      </div>
    </div>
  );

};



export default PaymentInfo;