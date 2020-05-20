import React, { Component } from 'react';

import classes from './PurchasedOrders.module.css';
import POrderCart from './POrderCard/POrderCard';

class PurchasedOrders extends Component {

  state = {
    orders: [
      {
        buyerDetails: {
          firstName: "Dinuwan ",
          lastName: "Kalubowila  ",
          address: "Horana,Pokunuwita,Sri Lanka",
          mobile: "0712184518"
        },
        summary: {
          subtotal: 17400,
          totalDiscount: 1980,
          total: 15420
        },
        items: [
          {
            brand: "",
            stockQuantity: 0,
            discount: 0,
            rating: 0,
            isApproved: true,
            quantity: 1,
            _id: "5ec261b1458bdc0d78d44763",
            itemName: "Casual Shooes",
            price: 4200,
            category: "Shooes",
            itemImage: "https://res.cloudinary.com/dsuhs6bf5/image/upload/v1587477911/nkifilujjictrq5aof2u.jpg",
            size: "Large",
            addedUserFirstName: "Dinuwan ",
            addedUserLastName: "Kalubowila  ",
            addedUserEmail: "dinuwan@gmail.com",
            addedDate: "2020-05-18T10:21:37.793Z",
            company: "Thilakawardhene",
            isSelectedItem: true,
            totalPrice: 0,
            __v: 0
          },
          {
            brand: "",
            stockQuantity: 0,
            discount: 0,
            rating: 0,
            isApproved: true,
            quantity: 1,
            _id: "5ec261b1458bdc0d78d44763",
            itemName: "Casual Shooes",
            price: 4200,
            category: "Shooes",
            itemImage: "https://res.cloudinary.com/dsuhs6bf5/image/upload/v1587477911/nkifilujjictrq5aof2u.jpg",
            size: "Large",
            addedUserFirstName: "Dinuwan ",
            addedUserLastName: "Kalubowila  ",
            addedUserEmail: "dinuwan@gmail.com",
            addedDate: "2020-05-18T10:21:37.793Z",
            company: "Thilakawardhene",
            isSelectedItem: true,
            totalPrice: 0,
            __v: 0
          },
        ]
      },
      {
        buyerDetails: {
          firstName: "Dinuwan ",
          lastName: "Kalubowila  ",
          address: "Horana,Pokunuwita,Sri Lanka",
          mobile: "0712184518"
        },
        summary: {
          subtotal: 17400,
          totalDiscount: 1980,
          total: 15420
        },
        items: [
          {
            brand: "",
            stockQuantity: 0,
            discount: 0,
            rating: 0,
            isApproved: true,
            quantity: 1,
            _id: "5ec261b1458bdc0d78d44763",
            itemName: "Casual Shooes",
            price: 4200,
            category: "Shooes",
            itemImage: "https://res.cloudinary.com/dsuhs6bf5/image/upload/v1587477911/nkifilujjictrq5aof2u.jpg",
            size: "Large",
            addedUserFirstName: "Dinuwan ",
            addedUserLastName: "Kalubowila  ",
            addedUserEmail: "dinuwan@gmail.com",
            addedDate: "2020-05-18T10:21:37.793Z",
            company: "Thilakawardhene",
            isSelectedItem: true,
            totalPrice: 0,
            __v: 0
          },
          {
            brand: "",
            stockQuantity: 0,
            discount: 0,
            rating: 0,
            isApproved: true,
            quantity: 1,
            _id: "5ec261b1458bdc0d78d44763",
            itemName: "Casual Shooes",
            price: 4200,
            category: "Shooes",
            itemImage: "https://res.cloudinary.com/dsuhs6bf5/image/upload/v1587477911/nkifilujjictrq5aof2u.jpg",
            size: "Large",
            addedUserFirstName: "Dinuwan ",
            addedUserLastName: "Kalubowila  ",
            addedUserEmail: "dinuwan@gmail.com",
            addedDate: "2020-05-18T10:21:37.793Z",
            company: "Thilakawardhene",
            isSelectedItem: true,
            totalPrice: 0,
            __v: 0
          },
        ]
      }
    ]
  }

  remove = (id) => {
    console.log(id);
  }

  goToItem = (item) => {
    console.log(item);
  }

  render() {
    let content = (
      <div className={classes.content} >
        {this.state.orders.map((order, index) => {
          return <POrderCart key={index} order={order} />
        })}
      </div >
    );

    // check oders is empty
    if (this.state.orders.length == 0) {
      content = (
        <div className={classes.empty}>
          <p className={classes.empty__content}>
            Your orders are empty.
          </p>
        </div>
      );
    }

    return (
      <div className={classes.container}>
        <div className={classes.sub_container}>
          <div className={classes.header}>
            <h2>Orders</h2>
          </div>

          {content}

        </div>
      </div>
    );
  }

}

export default PurchasedOrders;