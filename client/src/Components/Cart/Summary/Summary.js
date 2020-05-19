import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Summary.module.css';
import spinnerClasses from './Spinner.module.css';
import * as actionTypes from '../../../Store/Actions';

class Summary extends Component {
  // console.log(props.details);

  state = {
    spinner: false
  };

  buy = () => {
    //spinner = true;
    this.setState({ spinner: true });
    this.props.buy();
  };

  render() {
    console.log("summary " + this.props.items);
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <h2>Order Summary</h2>
        </div>

        <div className={classes.details}>
          <div className={classes.subtotal}>
            <span>Subtotal</span>
            <span>LKR {this.props.summary.subtotal.toFixed(2)}</span>
          </div>
          <div className={classes.discount}>
            <span>Discount</span>
            <span>{this.props.summary.totalDiscount.toFixed(2)}</span>
          </div>
        </div>

        <div className={classes.total}>
          <span className={classes.total__span1}>Total</span>
          <span className={classes.total__span2}>LKR {this.props.summary.total.toFixed(2)}</span>
        </div>

        <div className={classes.button}>
          {this.state.spinner ? <div className={spinnerClasses.loader}>Loading...</div> :
            <button className={classes.button_buy} onClick={this.buy} disabled={this.props.summary.isDisabled}>BUY</button>
          }
        </div>
      </div>
    );
  }

};

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
export default connect(mapStateToProps, mapDispatchToProps)(Summary);