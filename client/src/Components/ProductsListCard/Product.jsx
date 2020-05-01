import React, { Component } from "react";

export default class Product extends Component {
  render() {
    const { itemName, price, itemImage } = this.props;

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
        <i className="fa fa-star yellow-star" aria-hidden="true"></i>
        <i className="fa fa-star yellow-star" aria-hidden="true"></i>
        <i className="fa fa-star yellow-star" aria-hidden="true"></i>
        <i className="fa fa-star yellow-star" aria-hidden="true"></i>
        <i className="fa fa-star gray-star" aria-hidden="true"></i>
        <h4>{itemName}</h4>
        <h5>{price}</h5>
      </div>
    );
  }
}
