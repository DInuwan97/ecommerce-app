import React, { Component } from 'react';

import classes from "./DeliveryInfo.module.css";

class DeliveryInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.buyer.addedUserFirstName,
      lastName: this.props.buyer.addedUserLastName,
      phone: this.props.buyer.addedUserMobile,
      address: this.props.buyer.addedUserAddress,
      isWarning: false,
      detailActive: false,

      initialObj: {
        firstName: this.props.buyer.addedUserFirstName,
        lastName: this.props.buyer.addedUserLastName,
        phone: this.props.buyer.addedUserMobile,
        address: this.props.buyer.addedUserAddress
      },

      interval: setInterval(() => {
        this.setState({
          firstName: this.props.buyer.addedUserFirstName,
          lastName: this.props.buyer.addedUserLastName,
          phone: this.props.buyer.addedUserMobile,
          address: this.props.buyer.addedUserAddress,
          initialObj: {
            firstName: this.props.buyer.addedUserFirstName,
            lastName: this.props.buyer.addedUserLastName,
            phone: this.props.buyer.addedUserMobile,
            address: this.props.buyer.addedUserAddress
          }

        });
      }, 1000),

    };
  }

  firstNameChangeHandler = event => {
    this.setState({ firstName: event.target.value });
  };

  lastNameChangeHandler = event => {
    this.setState({ lastName: event.target.value });
  };

  phoneChangeHandler = event => {
    if (!isNaN(event.target.value) && event.target.value.length <= 10) {
      this.setState({ phone: event.target.value });
    }
  };

  addressChangeHandler = event => {
    this.setState({ address: event.target.value });
  };

  confirm = () => {
    console.log("called");
    if (this.state.firstName.trim().length == 0 || this.state.lastName.trim().length == 0 ||
      this.state.phone.trim().length == 0 || this.state.address.trim().length == 0) {
      this.setState({ isWarning: true });
    } else {
      let buyer = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phone: this.state.phone,
        address: this.state.address
      };
      this.setState({ detailActive: false });
      this.props.change(buyer);
    }
  };

  cancel = () => {
    console.log(this.state.initialObj);
    this.setState({
      firstName: this.state.initialObj.firstName,
      lastName: this.state.initialObj.lastName,
      phone: this.state.initialObj.phone,
      address: this.state.initialObj.address,
      detailActive: false
    });
  };

  openform = () => {
    this.setState({ detailActive: true });
  };

  changeActive = () => {
    console.log("called");
    if (this.state.detailActive) {
      this.setState({ detailActive: false });
    } else {
      this.setState({ detailActive: true });
    }
  };

  render() {
    if (this.state.firstName.length != 0 || this.state.lastName.length != 0) {
      clearInterval(this.state.interval);
    }

    return (
      <div className={classes.container}>
        <span className={classes.step}>Step 1 of 3</span>
        <h3 className={classes.header}>Delivery Information</h3>

        {this.state.detailActive ?
          <div className={classes.editDetail}>
            <div className={classes.editDetail__names}>
              <div className={classes.editDetail__names__firstName}>
                <label>First name</label>
                <input type="text" value={this.state.firstName} onChange={this.firstNameChangeHandler} required />
              </div>

              <div className={classes.editDetail__names__lastName}>
                <label>Last name</label>
                <input type="text" value={this.state.lastName} onChange={this.lastNameChangeHandler} required />
              </div>
            </div>

            <div className={classes.editDetail__contacts}>
              <div className={classes.editDetail__contacts__phone}>
                <label>Contact Number</label>
                <div className={classes.editDetail__names__phone__input}>
                  <input type="number" value={this.state.phone} onChange={this.phoneChangeHandler}
                    required />
                </div>
              </div>

              <div className={classes.editDetail__contacts__address}>
                <label>Address</label>
                <div className={classes.editDetail__contacts__address__textarea}>
                  <textarea value={this.state.address} onChange={this.addressChangeHandler} />
                </div>
              </div>
            </div>

            <div className={classes.editDetail__3}>
              <button className={classes.confirm_btn} onClick={this.confirm}>Confirm</button>
              <button className={classes.cancel_btn} onClick={this.cancel}>Cancel</button>
            </div>

            {this.state.isWarning ? <p className={classes.warning}>Please fill all fields.</p> : null}

          </div>
          :
          <div className={classes.contactInfo}>
            <div className={classes.contactInfo__1}>{this.state.firstName} {this.state.lastName}, {this.state.phone}</div>
            <div className={classes.contactInfo__2}>{this.state.address}</div>
            <div className={classes.editBtn}>
              <button onClick={this.openform}>Edit Details</button>
            </div>
          </div>
        }

      </div>
    );

  }


};

export default DeliveryInfo;