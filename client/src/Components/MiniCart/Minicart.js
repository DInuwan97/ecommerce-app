import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import classes from './Minicart.module.css';
import MiniCartItem from './MiniCartItem/MiniCartItem';
import * as actionTypes from '../../Store/Actions';
import WindowLoadingSpinner from '../WindowLoadingSpinner/WindowLoadingSpinner';

class Minicart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addedUserFirstName: '',
      addedUserLastName: '',
      addedUserEmail: '',
      totalItems: '',
      isLoading: true

    };
  }

  componentDidMount() {
    // should fix 
    // close minicart when clicked outside
    document.addEventListener("click", (evt) => {
      const minicartEl = document.getElementById("minicart");
      const clickedEl = evt.target;
      const minicartIcon = document.getElementById("minicartIcon");

      if (minicartEl) {
        if (clickedEl != minicartEl && clickedEl != minicartIcon) {
          //this.props.close();
          //console.log(this.props.active);
          //minicartEl.style.display = "none";
        }
      }
    });

    // get details from daatabase
    const token = localStorage.userLoginToken;
    const decoded = jwt_decode(token);

    if (localStorage.getItem("userLoginToken") !== null) {

      const userBuyer = {
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        mobile: decoded.mobile,
        email: decoded.email
      }

      this.setState({
        addedUserFirstName: decoded.firstName,
        addedUserLastName: decoded.lastName,
        addedUserEmail: decoded.email,
        buyerDetails: userBuyer
      })
      console.log('Decoded Email in Cart : ', decoded.email);
    }

    // check if cart item already have
    if (this.props.theItems.length == 0) {
      this.getCartItems(decoded.email);
    }

  }

  // USED REDUX
  getCartItems = (email) => {
    axios({
      method: 'get',
      url: `/api/cart/view/${email}`
    })
      .then(res => {
        let cartProducts = res.data;
        this.setState({ isLoading: false });
        this.props.updateItems(res.data);
        // this.setState({
        //   items: res.data
        // })
        console.log('Items details : ', this.props.theItems);
      })
  }

  // change quantity of an item - REDUX
  changeQuantity = (id, quantity) => {
    console.log(id + ' ' + quantity);
    let tempItems = [...this.props.theItems];
    let subAmount = 0;
    let discount = 0;
    let isDisabled = true;

    tempItems.forEach(item => {
      if (item._id === id) {
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;
        subAmount += item.price * quantity;
        discount += (item.price * quantity) * (item.discount / 100.0);
      } else {
        subAmount += item.price * item.quantity;
        discount += (item.price * item.quantity) * (item.discount / 100.0);
      }
    });

    if (subAmount > 0) {
      isDisabled = false;
    }
    let summary = {
      subtotal: subAmount,
      totalDiscount: discount,
      total: subAmount - discount,
      isDisabled: isDisabled
    };

    this.props.updateItemSummary(tempItems, summary);
    // this.setState({ items: tempItems, cartSummary: summary });

  };

  // remove an item from the cart - REDUX
  removeItem = (id) => {
    console.log(id);
    let tempItems;
    tempItems = this.props.theItems.filter(item => {
      if (item._id !== id) {
        axios({
          method: 'delete',
          url: `/api/cart/remove/${id}`,
        })
        // .then(res=>{
        //   return item;
        // })
        // .catch(err=>{
        //   console.log(err);
        // })
        return item;
      }
    });

    // remove the item from cartItems schema in database
    //
    //

    //change minicart quatity
    const changeQuantity = (cartItemId, quantity) => {
      if (quantity <= 1) {
        return;
      }
      let number = quantity - 1;


      axios({
        method: 'patch',
        url: `/api/cart/setQuantity/${cartItemId}`,
        data: {
          quantity: quantity
        }
      })
    };

    // set summary
    let summary = this.setSummary(tempItems);
    this.props.updateItemSummary(tempItems, summary);
    // this.setState({ items: tempItems, cartSummary: summary });

  };

  setSummary = (tempItems) => {
    let subAmount = 0;
    let discount = 0;
    let total = 0;
    let isDisabled = true;

    tempItems.forEach(item => {
      if (item.isSelectedItem) {
        subAmount += item.price * item.quantity;
        discount += (item.price * item.quantity) * (item.discount / 100.0);
      }
    });
    if (subAmount > 0) {
      isDisabled = false;
    }
    let summary = {
      subtotal: subAmount,
      totalDiscount: discount,
      total: subAmount - discount,
      isDisabled: isDisabled
    };

    return summary;
  };

  render() {
    // console.log("rendered");
    let content = (
      <div className={classes.content}>
        <div className={classes.items}>
          {this.props.theItems.map((i, index) => {
            return <MiniCartItem key={index} item={i} changeQuantity={this.changeQuantity} remove={this.removeItem} />
          })}
        </div>

        <div className={classes.footer}>
          <div className={classes.summary}>
            <span>Total: LKR {this.props.summary.total.toFixed(2)}</span>
          </div>

          <div className={classes.action}>
            <a href={'/cart'}>Go to cart</a>
          </div>
        </div>
      </div>
    );

    if (this.props.theItems.length == 0) {
      content = (
        <p className={classes.empty}>Shopping Cart is empty. Start shopping</p>
      );

    }

    return (
      <div id="minicart" className={classes.container}>
        <div className={classes.subContainer}>
          <div className={classes.closeBtn} onClick={() => this.props.close()}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
              <title>close</title>
              <path d="M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z"></path>
            </svg>
          </div>

          {content}

          {this.state.isLoading && this.props.theItems.length == 0 ?
            <div className={classes.loading}>
              <WindowLoadingSpinner />
            </div>

            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    theItems: state.items,
    summary: state.cartSummary
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateItems: (newItems) => dispatch({ type: actionTypes.UPDATE_ITEMS, newItems: newItems }),
    updateItemSummary: (items, summary) => dispatch({ type: actionTypes.UPDATE_ITEMS_SUMMARY, items: items, summary: summary })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Minicart);

