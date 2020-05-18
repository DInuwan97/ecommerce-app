import React, { Component } from 'react';
import $ from 'jquery';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import classes from './Minicart.module.css';
import MiniCartItem from './MiniCartItem/MiniCartItem';

class Minicart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addedUserFirstName: '',
      addedUserLastName: '',
      addedUserEmail: '',
      totalItems: '',
      items: [
        {
          _id: 1,
          itemName: 'Women Watches',
          brand: '',
          rating: '',
          isApproved: true,
          category: '',
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
          _id: 2,
          itemName: 'Women Watches',
          brand: '',
          rating: '',
          isApproved: true,
          category: '',
          stockQuantity: 10,
          color: 'red',
          size: 'XL',
          price: 1200.30,
          discount: 10,
          itemImage: 'https://res.cloudinary.com/dsuhs6bf5/image/upload/v1587477911/nkifilujjictrq5aof2u.jpg',
          totalPrice: 0,
          quantity: 1,
          isSelected: false
        }],
      cartSummary: {
        subtotal: 0,
        totalDiscount: 0,
        total: 0
      }
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
          this.props.close();
          //console.log(this.props.active);
          //minicartEl.style.display = "none";
        }
      }
    });


  }

  render() {
    // console.log("rendered");
    let content = (
      <div className={classes.content}>
        <div className={classes.items}>
          {this.state.items.map((i, index) => {
            return <MiniCartItem key={index} item={i} />
          })}
        </div>

        <div className={classes.footer}>
          <div className={classes.summary}>
            summary
          </div>

          <div className={classes.action}>
            action
          </div>
        </div>
      </div>
    );

    if (this.state.items.length == 0) {
      content = (
        <p className={classes.empty}>Shopping Cart is empty. Start shopping</p>
      );

    }

    return (
      <div id="minicart" className={classes.container}>
        <div className={classes.closeBtn} onClick={() => this.props.close()}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <title>close</title>
            <path d="M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z"></path>
          </svg>
        </div>

        {content}

      </div>
    );
  }
}



export default Minicart;

