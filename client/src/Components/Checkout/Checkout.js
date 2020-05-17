import React, { Component } from "react";
//import $ from "jquery";

import DeliveryInfo from "./DeliveryInfo/DeliveryInfo";
import PaymentInfo from "./PaymentInfo/PaymentInfo";
import Summary from "./Summary/Summary";
import classes from "./Checkout.module.css";

class Checkout extends Component {
  state = {
    items: this.props.location.state.items,
    summary: this.props.location.state.summary,
    buyer: {
      name: "Sachin Athukorala",
      phone: "771234567",
      address: "No 131/1, Sandalla, Yalagala Road, Horana"
    },
    detailActive: false,
    card_number: '',
    card_holder: '',
    card_expire: '',
    card_cw: '',
    orderError: false,
    isSpinnerActive: false
  };

  constructor(props) {
    super(props);
    this.changeCard = this.changeCard.bind(this);
  }

  componentDidMount() {
    // get users info (buyer)
  }

  //////////////////////////////// functions /////////////////////////////////////

  changeDetails = (buyer) => {
    console.log(buyer);
    this.setState({ buyer: buyer, detailActive: false });
  }

  changeActive = () => {
    console.log("called");
    if (this.state.detailActive) {
      this.setState({ detailActive: false });
    } else {
      this.setState({ detailActive: true });
    }
  };

  changeCard = (field, value) => {
    console.log(field);
    if (field == "number") {
      if (isNaN(value[value.length - 1]) || value.length > 19) {
        console.log(value);
        //return;
      } else {
        if (value.length == 4 || value.length == 9 || value.length == 14) {
          value += " ";
          this.setState({ card_number: value });
          return;
        } else {
          this.setState({ card_number: value });
          return;
        }
      }

    }
    if (field == "number_b") {
      this.setState({ card_number: value });
      return;
    }
    if (field == "holder") {
      if (value.trim().length != 0) {
        this.setState({ card_holder: value });
      }
      return;
    }
    if (field == "expire") {
      if (isNaN(value[value.length - 1]) || value.length > 5) {
        return;
      } else {
        if (value.length == 2) {
          console.log("ffffffffff");
          value += "/";
        }
        this.setState({ card_expire: value });
        return;
      }

    }
    if (field == "expire_b") {
      this.setState({ card_expire: value });
      return;
    }
    if (field == "cw") {
      if (isNaN(value[value.length - 1]) || value.length > 3) {
      } else {
        this.setState({ card_cw: value });
      }

    }

  };

  order = () => {
    if (this.state.card_number.trim() == 0 || this.state.card_holder.trim() == 0 || this.state.card_expire.trim() == 0
      || this.state.card_cw.trim() == 0) {
      this.setState({ orderError: true, isSpinnerActive: false });
    } else {
      console.log(this.state.card_number);
      console.log(this.state.card_holder);
      console.log(this.state.card_expire);
      console.log(this.state.card_cw);

      // place order, calling payment gateway and other fucking stuff
      setTimeout(() => {
        alert("Your order has been placed");
        this.props.history.push({
          pathname: '/',
        });
      }, 3000);
    }

  };

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.leftPanel}>
          <div className={classes.deliveryInfo}>
            <DeliveryInfo buyer={this.state.buyer} change={this.changeDetails} isActive={this.state.detailActive} changeActive={this.changeActive} />
          </div>
          <div className={classes.paymentInfo}>
            <PaymentInfo change={this.changeCard}
              number={this.state.card_number}
              holder={this.state.card_holder}
              expire={this.state.card_expire}
              cw={this.state.card_cw} />
          </div>
          <div className={classes.itemReview}>item reviews</div>
        </div>
        <div id="rightPanel" className={classes.rightPanel}>
          <Summary
            summary={this.state.summary}
            noOfItems={this.state.items.length}
            order={this.order}
            orderError={this.state.orderError}
            isSpinnerActive={this.state.isSpinnerActive}
          />
        </div>
      </div>
    );
  }
}

// $(window).scroll(function () {
//   $("#rightPanel").css("top", Math.max(15, 169 - $(this).scrollTop()));
// });

$(document).ready(function () {
  $(this).scrollTop(0);
});

export default Checkout;
