import React, { useState } from 'react';

import classes from "./DeliveryInfo.module.css";

const DeliveryInfo = props => {
  const [name, setName] = useState(props.buyer.name);
  const [phone, setPhone] = useState(props.buyer.phone);
  const [address, setAddress] = useState(props.buyer.address);
  const [isWarning, setIsWarning] = useState(false);

  let isActive = props.isActive;
  let form2 = {
    name: props.buyer.name,
    phone: props.buyer.phone,
    address: props.buyer.address
  };

  const nameChangeHandler = event => {
    setName(event.target.value);
  };

  const phoneChangeHandler = event => {
    setPhone(event.target.value);
  };

  const addressChangeHandler = event => {
    setAddress(event.target.value);
  };

  const confirm = () => {
    console.log("called");
    if (name.trim().length == 0 || phone.trim().length == 0 || address.trim().length == 0) {
      setIsWarning(true);
    } else {
      let buyer = {
        name: name,
        phone: phone,
        address: address
      };
      props.change(buyer);
    }
  };

  const cancel = () => {
    console.log("clicked");
    props.changeActive();
  };

  const openform = () => {
    props.changeActive();
  };

  return (
    <div className={classes.container}>
      <span className={classes.step}>Step 1 of 3</span>
      <h3 className={classes.header}>Delivery Information</h3>

      {isActive ?
        <div className={classes.editDetail}>
          <label>Contact Info</label>
          <div className={classes.editDetail__1}>
            <div className={classes.editDetail__1__name}>
              <input type="text" value={name} className={classes.editDetail__1__name__input} onChange={nameChangeHandler} required />
            </div>
            <div className={classes.editDetail__1__phone}>
              <div className={classes.editDetail__1__phone__1}>
                <span>+94</span>
              </div>
              <div className={classes.editDetail__1__phone__2}>
                <input type="number" value={phone} className={classes.editDetail__1__phone__2__input} onChange={phoneChangeHandler}
                  required />
              </div>
            </div>

          </div>

          <label>Address</label>
          <div className={classes.editDetail__2}>
            <textarea value={address} onChange={addressChangeHandler} />
          </div>

          <div className={classes.editDetail__3}>
            <button className={classes.confirm_btn} onClick={confirm}>Confirm</button>
            <button className={classes.cancel_btn} onClick={cancel}>Cancel</button>
          </div>

          {isWarning ? <p className={classes.warning}>Please fill all fields.</p> : null}

        </div>
        :
        <div className={classes.contactInfo}>
          <div className={classes.contactInfo__1}>{form2.name}, {form2.phone}</div>
          <div className={classes.contactInfo__2}>{form2.address}</div>
          <div className={classes.editBtn}>
            <button onClick={openform}>Edit Details</button>
          </div>
        </div>
      }

    </div>
  );

};

export default DeliveryInfo;