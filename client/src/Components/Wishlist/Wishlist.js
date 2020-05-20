import React, { Component } from 'react';

import classes from './Wishlist.module.css';
import WishlistItem from './WishlistItem/WishlistItem';

import $ from 'jquery';

class Watchlist extends Component {

  state = {
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
        isSelected: false,
        addedDate: '16 May 2020'
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
        isSelected: false,
        addedDate: '16 May 2020'
      },
    ]
  };

  componentDidMount() {
    // get items form db

  }

  ///////////////////////// functions //////////////////////////

  remove = (item) => {
    console.log(item);
    // remove from database
    //
    let tempItems = [...this.state.items];
    tempItems = tempItems.filter(i => {
      if (i.id !== item.id) {
        return i;
      }
    });
    this.setState({ items: tempItems });

  }

  addToCart = (item) => {
    console.log(item);
    // add to cart schema in database
    //
    let tempItems = [...this.state.items];
    tempItems = tempItems.filter(i => {
      if (i.id !== item.id) {
        return i;
      }
    });
    this.setState({ items: tempItems });
  }

  render() {
    let content = (
      <div className={classes.content} >
        {this.state.items.map((item, index) => {
          return <WishlistItem
            key={index}
            item={item}
            remove={this.remove}
            add={this.addToCart} />
        })}
      </div >
    );

    // check wishlist is empty
    if (this.state.items.length == 0) {
      content = (
        <div className={classes.empty}>
          <p className={classes.empty__content}>
            You haven’t added any items to your Wish List yet.
              <a href="/"> Shop Now.</a>
          </p>
        </div>
      );
    }

    return (
      <div className={classes.container}>
        <div className={classes.sub_container}>
          <div className={classes.header}>
            <h2>Wishlist</h2>
          </div>

          {content}

        </div>
      </div>
    );
  }

};

export default Watchlist;

$(document).ready(function () {
  $(this).scrollTop(0);
});