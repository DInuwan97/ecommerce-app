import React, { Component } from "react";
import $ from "jquery";

import DeliveryInfo from "./DeliveryInfo/DeliveryInfo";
import PaymentInfo from "./PaymentInfo/PaymentInfo";
import Summary from "./Summary/Summary";
import classes from "./Checkout.module.css";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.location.state.items,
      summary: this.props.location.state.summary,
      buyer: {

      }
    };
  }

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.leftPanel}>
          <div className={classes.deliveryInfo}>
            <DeliveryInfo />
          </div>
          <div className={classes.paymentInfo}>
            <PaymentInfo />
          </div>
          <div className={classes.itemReview}>item reviews</div>
        </div>
        <div id="rightPanel" className={classes.rightPanel}>
          <Summary
            summary={this.state.summary}
            noOfItems={this.state.items.length}
          />
        </div>
      </div>
    );
  }
}

$(window).scroll(function () {
  $("#rightPanel").css("top", Math.max(15, 169 - $(this).scrollTop()));
});

$(document).ready(function () {
  $(this).scrollTop(0);
});

export default Checkout;
