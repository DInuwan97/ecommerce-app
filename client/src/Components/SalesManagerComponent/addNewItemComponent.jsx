import React, { Component } from "react";
import axios from "axios";
export default class addNewItemComponent extends Component {
  constructor() {
    super();
    this.state = {
      itemName: "",
      price: 0,
      Brand: "",
      category: "",
      stockQuantity: 0,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .post("/api/items", {
        itemName: this.state.itemName,
        price: this.state.price,
        Brand: this.state.Brand,
        category: this.state.category,
        stockQuantity: this.state.stockQuantity,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmitHandler}>
          <div class="form-group">
            <label>Item Name</label>
            <input
              type="text"
              class="form-control"
              name="itemName"
              placeholder="Item Name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </div>
          <div class="form-group">
            <label>Price</label>
            <input
              type="text"
              class="form-control"
              name="price"
              placeholder="Price"
              value={this.state.price}
              onChange={this.onChange}
            />
          </div>
          <div
            className="input-group mb-3"
            style={{ width: "100%", height: 30, marginBottom: 20 }}
          >
            <select
              className="form-control form-control-lg"
              style={{ height: 40 }}
              name="category"
              required=""
              onChange={this.onChange}
            >
              <option value="">Category Type</option>
              <option value="BRONZE">BRONZE</option>
              <option value="SILVER">SILVER</option>
              <option value="GOLD">GOLD</option>
              <option value="PLATINUM">PLATINUM</option>
            </select>

            <div className="clearfix"></div>
          </div>

          <div class="form-group">
            <label>Brand</label>
            <input
              type="text"
              class="form-control"
              name="Brand"
              placeholder="Brand"
              value={this.state.Brand}
              onChange={this.onChange}
            />
          </div>
          <div class="form-group">
            <label>Stock Quantity</label>
            <input
              type="text"
              class="form-control"
              name="stockQuantity"
              placeholder="Stock Quantity"
              value={this.state.stockQuantity}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
