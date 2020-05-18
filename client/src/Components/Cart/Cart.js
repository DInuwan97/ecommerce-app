import React, { Component } from 'react';

import jwt_decode from 'jwt-decode'
import SelectAll from './Selectall/SelectAll';
import CartItem from './CartItem/CartItem';
import Summary from './Summary/Summary';
import PaymentDetail from './PaymentDetail/PaymentDetail';

import classes from "./Cart.module.css";
import axios from 'axios';
const $ =require('jquery')
const decoded = '';
class Cart extends Component {

constructor(props){
  super(props);
  this.state = {

    
    addedUserFirstName:'',
    addedUserLastName:'',
    addedUserEmail:'',
    totalItems:'',
    isAllItemsSelected: false,
    items: [
 
    ],
    cartSummary: {
      subtotal: 0,
      totalDiscount: 0,
      total: 0,
      isDisabled: true
    }


  }
}

 

  /////////////////////////////////////////// functions ///////////////////////////////////////////////////////
  // select all items in the cart
  componentDidMount = () =>{
    const token = localStorage.userLoginToken;
    const decoded = jwt_decode(token);
    if (localStorage.getItem("userLoginToken") !== null) {

      this.setState({
        addedUserFirstName:decoded.firstName,
        addedUserLastName:decoded.lastName,
        addedUserEmail:decoded.email,
      })
      console.log('Decoded Email in Cart : ',decoded.email);
    }

   
    this.getCartItems(decoded.email);

  }

  getCartItems = (email) =>{
    axios({
      method:'get',
      url:`/api/cart/view/${email}`
    })
    .then(res=>{
      let cartProducts = res.data
      this.setState({
        items:res.data,
        totalItems:cartProducts.length
      })
      console.log('Items details : ',this.state.items);
    })
  }


  selectAllHandler = () => {
    let tempItems = [...this.state.items];

    tempItems.forEach(item => {
      item.isSelectedItem = !this.state.isAllItemsSelected;
    });

    // set summary
    let summary = this.setSummary(tempItems);

    this.setState({ items: tempItems, isAllItemsSelected: !this.state.isAllItemsSelected, cartSummary: summary });
  };

  // select single item in the cart
  itemSelectHandler = (id) => {
    console.log(id);
    let tempItems = [...this.state.items];
    let allItemsSelected = true;
    tempItems.forEach(item => {
      if (item.id === id) {
        item.isSelectedItem = !item.isSelectedItem;
        if (!item.isSelectedItem) {
          allItemsSelected = false;
        }
      }
    });

    // set summary
    let summary = this.setSummary(tempItems);

    if (!allItemsSelected) {
      this.setState({ items: tempItems, isAllItemsSelected: false, cartSummary: summary });
      return;
    }

    console.log(this.state.items);
    this.setState({ items: tempItems, cartSummary: summary });
  };

  // remove an item from the cart
  removeItem = (id) => {
    console.log(id);
    let tempItems;
    tempItems = this.state.items.filter(item => {
      if (item.id !== id) {
        return item;
      }
    });

    // remove the item from cartItems schema in database
    //
    //

    // set summary
    let summary = this.setSummary(tempItems);
    this.setState({ items: tempItems, cartSummary: summary });
  };

  // add an item to wishlist
  moveToWishList = (id) => {
    console.log(id);
    let tempItems;
    let moveItem;
    tempItems = this.state.items.filter(item => {
      if (item.id !== id) {
        return item;
      } else {
        moveItem = item;
      }
    });

    // move item to wishlist schema in database
    //
    //

    // set summary
    let summary = this.setSummary(tempItems);
    this.setState({ items: tempItems, cartSummary: summary });
    this.setState({ items: tempItems, cartSummary: summary });
  };

  // change quantity of an item
  changeQuantity = (id, quantity) => {
    console.log(id + ' ' + quantity);
    let tempItems = [...this.state.items];
    let subAmount = 0;
    let discount = 0;
    let isDisabled = true;

    tempItems.forEach(item => {
      if (item.id === id) {
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;
        if (item.isSelectedItem) {
          subAmount += item.price * quantity;
          discount += (item.price * quantity) * (item.discount / 100.0);
        }
      } else {
        if (item.isSelectedItem) {
          subAmount += item.price * item.quantity;
          discount += (item.price * item.quantity) * (item.discount / 100.0);
        }
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

    this.setState({ items: tempItems, cartSummary: summary });
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

  // when user clicked buy
  buy = () => {
    // selected items move to the checkout component
    console.log('buy');

    setTimeout(() => {
      if (this.state.cartSummary.subtotal > 0) {
        let object = {
          items: this.state.items,
          summary: this.state.cartSummary
        };
        this.props.history.push({
          pathname: '/checkout',
          state: object
        });
      }
    }, 3000);

  };

  render() {
    let content = (
      <div className={classes.container}>
        <div className={classes.leftPanel}>
          <div className={classes.selectAll}>
            <SelectAll
              totalItems={this.totalItems}
              clicked={this.selectAllHandler}
              selected={this.state.isAllItemsSelected}
              totalItems={this.state.items.length} />
          </div>

          <div className={classes.cartItems}>
            {this.state.items.map(item =>
              <CartItem
                key={item._id}
                item={item}
                allSelected={this.state.isAllItemsSelected}
                select={this.itemSelectHandler}
                move={this.moveToWishList}
                remove={this.removeItem}
                changeQuantity={this.changeQuantity} />
            )}
          </div>

          <div className={classes.paymentDetail}>
            <PaymentDetail />
          </div>

          <div className={classes.moreItems}>more items</div>
        </div>

        <div id="rightPanel" className={classes.rightPanel} >
          <Summary details={this.state.cartSummary} buy={this.buy} />
        </div>
      </div>
    );

    // check cart is empty
    if (this.state.items.length == 0) {
      content = (
        <div className={classes.emptyCart}>
          <img src={require('./assets/images/emptyCart.jpeg')} alt="Empty cart" />
          <h2>Your Shopping Cart is empty</h2>
          <a href="/">Start shopping now</a>
        </div>
      );
    }

    return (
      content
    );
  }
}

export default Cart;
$(window).scroll(function () {
  $('#rightPanel').css('top', Math.max(15, 169 - $(this).scrollTop()));
});

$(document).ready(function () {
  $(this).scrollTop(0);
});

// $(window).scroll(function () {
//   $('#rightPanel').css('top', Math.max(15, 169 - $(this).scrollTop()))
// });





