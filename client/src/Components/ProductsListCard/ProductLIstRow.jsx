import React, { Component } from "react";
import Product from "./Product";
export default class ProductLIstRow extends Component {
  getRow() {
    return this.props.items.map(
      ({
        _id,
        itemImage,
        itemName,
        price,
        Brand,
        discount,
        category,
        rating,
        isApproved,
        size,
        addedBy,
      }) => {
        if (isApproved)
          return (
            <Product
              id={_id}
              addedBy={addedBy}
              itemName={itemName}
              itemImage={itemImage}
              price={price}
              Brand={Brand}
              discount = {discount}
              rating = {rating}
              size={size}
              category={category}
              declineItem={this.props.declineItem}
              approveItem={this.props.approveItem}
            />
          );
      }
    );
  }
  render() {
    return (
      <div className="women-set1">
        {this.getRow()}
        <div className="clearfix"></div>
      </div>
    );
  }
}
