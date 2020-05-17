import React, { Component } from "react";
import Rating from "./ratings";
export default class Product extends Component {
  getDiscountPrice() {
    if (this.props.discount > 0 && this.props.discount <= 100) {
      return (
        <div>
          {" "}
          <span>{(1 - this.props.discount * 0.01) * this.props.price}</span>
        </div>
      );
    } else {
      return <span>{this.props.price}</span>;
    }
  }

  render() {
    const { itemName, price, itemImage, discount } = this.props;

    return (
      <div
        className="col-md-4 women-grids wp1 animated wow slideInUp"
        data-wow-delay=".5s"
      >
        <a href="single.html">
          <div className="product-img">
            <img src={itemImage} alt="" />
            <div className="p-mask">
              <form action="#" method="post">
                <input type="hidden" name="cmd" value="_cart" />
                <input type="hidden" name="add" value="1" />
                <input type="hidden" name="w3ls1_item" value="Watch" />
                <input type="hidden" name="amount" value="50.00" />
                <button type="submit" className="w3ls-cart pw3ls-cart">
                  <i className="fa fa-cart-plus" aria-hidden="true"></i> Add to
                  cart
                </button>
              </form>
            </div>
          </div>
        </a>

        <Rating itemId={this.props.id} />
        <h4>{itemName}</h4>
        <h5>
          <div className="">
            <span
              style={{
                textDecoration: discount > 0 ? "line-through" : "none",
                visibility: discount == 0 ? "hidden" : "none",
              }}
            >
              Rs. {price}
            </span>
          </div>

          <div className="">
            <span>Rs. {this.getDiscountPrice()} </span>
          </div>
        </h5>
      </div>
    );
  }
}
