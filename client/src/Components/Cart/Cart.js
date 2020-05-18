import React, { Component } from 'react';
import $ from "jquery";

import SelectAll from './Selectall/SelectAll';
import CartItem from './CartItem/CartItem';
import Summary from './Summary/Summary';
import PaymentDetail from './PaymentDetail/PaymentDetail';

import classes from "./Cart.module.css";

class Cart extends Component {
  state = {
    totalItems: 3,
    isAllItemsSelected: false,
    items: [
      {
        id: 1,
        itemName: 'MISSFOX Women Watches Luxury Watch Women Fashion 2020 Fake Chronograph Roman Numerals 18K Gold Ladies Watches Quartz Wristwatch',
        stockQuantity: 10,
        color: 'red',
        size: 'XL',
        price: 1200.30,
        discount: 10,
        itemImage: 'https://res.cloudinary.com/dsuhs6bf5/image/upload/v1587477911/nkifilujjictrq5aof2u.jpg',
        totalPrice: 0,
        quantity: 1,
        isSelected: false
      },
      {
        id: 2,
        itemName: 'MISSFOX Women Watches Luxury Watch Women Fashion 2020 Fake Chronograph Roman Numerals 18K Gold Ladies Watches Quartz Wristwatch',
        stockQuantity: 20,
        color: 'red',
        size: 'XL',
        price: 1200.30,
        discount: 7,
        itemImage: 'https://res.cloudinary.com/dsuhs6bf5/image/upload/v1587477911/nkifilujjictrq5aof2u.jpg',
        totalPrice: 0,
        quantity: 1,
        isSelected: false
      },
    ],
    cartSummary: {
      subtotal: 0,
      totalDiscount: 0,
      total: 0,
      isDisabled: true
    }
  };

  /////////////////////////////////////////// functions ///////////////////////////////////////////////////////
  // select all items in the cart
  selectAllHandler = () => {
    let tempItems = [...this.state.items];

    tempItems.forEach(item => {
      item.isSelected = !this.state.isAllItemsSelected;
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
        item.isSelected = !item.isSelected;
        if (!item.isSelected) {
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
        if (item.isSelected) {
          subAmount += item.price * quantity;
          discount += (item.price * quantity) * (item.discount / 100.0);
        }
      } else {
        if (item.isSelected) {
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
      if (item.isSelected) {
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
                key={item.id}
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


$(window).scroll(function () {
  $('#rightPanel').css('top', Math.max(15, 169 - $(this).scrollTop()));
});

$(document).ready(function () {
  $(this).scrollTop(0);
});

export default Cart;


