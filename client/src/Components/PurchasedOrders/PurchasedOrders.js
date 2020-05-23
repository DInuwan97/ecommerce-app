import React, { Component } from 'react';

import classes from './PurchasedOrders.module.css';
import POrderCart from './POrderCard/POrderCard';
import axios from 'axios';
class PurchasedOrders extends Component {


  constructor(props){
    super(props);
    this.state = {
      orders:[]
    }
  }

  componentDidMount = () =>{
    axios({
      method:'get',
      url:`/api/pruchase/viewByUser/${this.props.loggedEmail}`
    })
    .then(res=>{
      let purchasedOrders = res.data;
      this.setState({
        orders:purchasedOrders
      })
    })
  }

  remove = (id) => {
    console.log(id);
  }

  render() {

    let content = (
      <div className={classes.content} >
        {this.state.orders.map((order, index) => {
          return <POrderCart key={index} order={order} remove={this.remove} />
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