import React, { Component } from 'react';

import SelectAll from './Selectall/SelectAll';
import CartItem from './CartItem/CartItem';
import Summary from './Summary/Summary';

import classes from "./Cart.module.css";

import $ from 'jquery';

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
        price: 1200,
        discount: 10,
        itemImage: 'https://res.cloudinary.com/dsuhs6bf5/image/upload/v1587477911/nkifilujjictrq5aof2u.jpg',
        totalPrice: 0,
        quantity: 1,
        isSelected: false
      },
      {
        id: 2,
        itemName: 'MISSFOX Women Watches Luxury Watch Women Fashion 2020 Fake Chronograph Roman Numerals 18K Gold Ladies Watches Quartz Wristwatch',
        stockQuantity: 10,
        color: 'red',
        size: 'XL',
        price: 1200,
        discount: 10,
        itemImage: 'https://res.cloudinary.com/dsuhs6bf5/image/upload/v1587477911/nkifilujjictrq5aof2u.jpg',
        totalPrice: 0,
        quantity: 1,
        isSelected: false
      },
    ],
    cartSummary: {
      subtotal: 0,
      totalDiscount: 0,
      total: 0
    }
  };

  /////////////////////////////////////////// functions ///////////////////////////////////////////////////////
  // select all items in the cart
  selectAllHandler = () => {
    let tempItems = [...this.state.items];
    tempItems.forEach(item => {
      item.isSelected = !this.state.isAllItemsSelected;
    });
    console.log(this.state.items);
    this.setState({ items: tempItems, isAllItemsSelected: !this.state.isAllItemsSelected });
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

    if (!allItemsSelected) {
      this.setState({ item: tempItems, isAllItemsSelected: false });
      return;
    }

    console.log(this.state.items);
    this.setState({ item: tempItems });
  };

  // remove an item from the cart

  // add an item to wishlist

  // increase quantity of an item

  // decrease quantity of an item

  // when user clicked buy

  render() {
    $(window).scroll(function () {
      $('#rightPanel').css('top', Math.max(15, 169 - $(this).scrollTop()))
    });

    return (

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
                select={this.itemSelectHandler} />
            )}
          </div>

          <div className={classes.paymentDetail}>payment details</div>

          <div className={classes.moreItems}>more items</div>
        </div>

        <div id="rightPanel" className={classes.rightPanel}>
          <Summary />
        </div>
      </div>
    );
  }
}

export default Cart;