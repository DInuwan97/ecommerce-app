import React, { Component } from "react";
//import $ from "jquery";
import jwt_decode from 'jwt-decode'
import DeliveryInfo from "./DeliveryInfo/DeliveryInfo";
import PaymentInfo from "./PaymentInfo/PaymentInfo";
import Summary from "./Summary/Summary";
import classes from "./Checkout.module.css";
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions';

import swal from 'sweetalert';
const $ = require('jquery')

class Checkout extends Component {

  constructor(props) {
    super(props);
    this.state = {

      buyer: {
        addedUserFirstName: '',
        addedUserLastName: '',
        addedUserEmail: '',
        addedUserAddress: '',
        addedUserMobile: '',
      },

      card_number: '',
      card_holder: '',
      card_expire: '',
      card_cw: '',
      orderError: false,
      isSpinnerActive: false
    }

    this.changeCard = this.changeCard.bind(this);

  }

  componentDidMount() {
    // get users info (buyer)
    const token = localStorage.userLoginToken;
    const decoded = jwt_decode(token);

    if (localStorage.getItem("userLoginToken") !== null) {
      this.setState({
        addedUserLastName: decoded.lastName,
        addedUserEmail: decoded.email,
        addedUserMobile: decoded.mobile
      })
      console.log('Decoded Email in Cart : ', decoded.email);
      console.log('location buyer details email : ', this.state.summary);
      console.log('location buyer details email : ', this.state.items);
    }


    this.getPurchasedCurrentUserDetails(decoded.email);
    // console.log('Chekc oUT USER DATA 11 : ',this.state.buyer.addedUserFirstName);

  }

  getPurchasedCurrentUserDetails = (loggedEmail) => {
    axios({
      method: 'get',
      url: `/api/users/singleUser/${loggedEmail}`
    })
      .then(res => {
        console.log('Chekc oUT USER DATA : ', res.data);
        const user = res.data;
        const userBuyer = {
          addedUserFirstName: res.data.firstName,
          addedUserLastName: res.data.lastName,
          addedUserAddress: res.data.address,
          addedUserMobile: res.data.mobile
        }
        this.setState({
          buyer: userBuyer
        });

        const userDetails = {
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          address: res.data.address,
          mobile: res.data.mobile,
          email: res.data.email
        }

        this.setState({
          buyerDetails: userDetails
        })

        console.log("Check out firstname : ", this.state.buyerDetails.email);
      })

  }
  //////////////////////////////// functions /////////////////////////////////////

  changeDetails = (buyer) => {
    console.log(buyer);
    this.setState({ buyer: buyer, detailActive: false });
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
        // this.props.history.push({
        //   pathname: '/',
        // });

        axios({
          method: 'post',
          url: `/api/pruchase/add`,
          data: {
            purchasedUserEmail: this.state.buyerDetails.email,
            buyerDetails: this.state.buyerDetails,
            items: this.state.items,
            summary: this.state.summary
          }
        })
          .then(res => {
            swal({
              icon: "success",
              title: "Done",
              text: "Order Completed"
            })
          })
          .catch(err => {
            console.log(err);
          })

        axios({
          method: 'delete',
          url: `/api/cart/removeAllMyItemsFromCart/${this.state.buyerDetails.email}`
        })
          .then({

          })
          .catch(err => {
            console.log(err);
          })


      }, 3000);
    }

  };


  render() {

    return (
      <div className={classes.container}>
        <div className={classes.leftPanel}>
          <div className={classes.deliveryInfo}>
            <DeliveryInfo buyer={this.state.buyer} change={this.changeDetails} />
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
            summary={this.props.summary}
            noOfItems={this.props.theItems.length}
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

const mapStateToProps = state => {
  return {
    theItems: state.items,
    summary: state.cartSummary,
    isAllItemsSelected: state.isAllItemsSelected,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateItems: (newItems) => dispatch({ type: actionTypes.UPDATE_ITEMS, newItems: newItems }),
    select: (items, isAllItemsSelected, summary) => dispatch({ type: actionTypes.SELECT, items: items, isAllItemsSelected: isAllItemsSelected, summary: summary }),
    updateItemSummary: (items, summary) => dispatch({ type: actionTypes.UPDATE_ITEMS_SUMMARY, items: items, summary: summary })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
