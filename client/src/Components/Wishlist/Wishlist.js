import React, { Component } from 'react';
import swal from 'sweetalert';
import classes from './Wishlist.module.css';
import WishlistItem from './WishlistItem/WishlistItem';
import axios from 'axios';
import $ from 'jquery';

class Watchlist extends Component {


  constructor(props){
    super(props);
    this.state = {
      items: []
    };
  }

 

  componentDidMount() {
    // get items form db
    axios({
      method:'get',
      url:`/api/wishlist/view/${this.props.loggedEmail}`
    })
    .then(res=>{
      this.setState({
        items:res.data
      })
    })

  }

  ///////////////////////// functions //////////////////////////

  remove = (item) => {
    console.log(item);
    // remove from database
    //

    axios({
      method:'delete',
      url:`/api/wishlist/remove/${item._id}`
    })
    .then(res=>{
      swal({
        icon:"success",
        title:"Done",
        text:"Successfully Removed"
      })
    })
    .catch(err=>{
      console.log(err)
    })
    let tempItems = [...this.state.items];
    tempItems = tempItems.filter(i => {
      if (i._id !== item._id) {
        return i;
      }
    });
    this.setState({ items: tempItems });

  }

  addToCart = (item) => {
    console.log(item);
    // add to cart schema in database
    
    axios({
      method: 'post',
      url: `/api/cart/add`,
      data: {
        itemName: item.itemName,
        price: item.price,
        category: item.category,
        itemImage: item.itemImage,
        size: item.size,
        brand: item.brand,
        discount: this.state.items.discount,
        addedUserFirstName: item.addedUserFirstName,
        addedUserLastName: item.addedUserLastName,
        addedUserEmail: item.addedUserEmail,
        rating: item.rating,
        quantity: item.quantity,
        company: item.company,
        isSelectedItem: false,
        totalPrice: 0
      }
    })
    .then(res=>{
      axios({
        method:'delete',
        url:`/api/wishlist/remove/${item._id}`
      })
      .then(res=>{
        console.log('Deleting Done')
      })
      .catch(err=>{
        console.log('Deleting err')
      })
    })
    .then(() => {
      swal({
        title: "Status",
        text: "Done",
        icon: 'success'
      });
    })
    .catch(err => {
      console.log(err)
    })


    let tempItems = [...this.state.items];
    tempItems = tempItems.filter(i => {
      if (i._id !== item._id) {
        return i;
      }
    });
    this.setState({ items: tempItems });
  }

  // goto single product page
  gotoItem = (item) => {
    console.log(item);
  }

  render() {
    let content = (
      <div className={classes.content} >
        {this.state.items.map((item, index) => {
          return <WishlistItem
            key={index}
            item={item}
            goto={this.gotoItem}
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