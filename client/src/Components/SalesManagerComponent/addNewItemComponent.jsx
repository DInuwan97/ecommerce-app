import React, { Component } from "react";
import axios from "axios";
export default class addNewItemComponent extends Component {
  constructor() {
    super();
    this.state = {
        name: "",
        price: "",
        brand: "",
        category: "",
      };
      this.onChange = this.onChange.bind(this)
  }
  

  onChange = (e) => {
    this.setState( { 
        [e.target.name] : e.target.value
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    const newItem = this.state
    console.log("new item is " + newItem);

    axios.post('/api/items', { newItem })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
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
              name = "name"
              placeholder="Item Name"
              value={this.state.name}
              onChange={ this.onChange}
            />
          </div>
          <div class="form-group">
            <label>Price</label>
            <input
              type="text"
              class="form-control"
              name = "price"
              placeholder="Price"
              value={this.state.price}
              onChange={ this.onChange}
            />
          </div>
          <div class="form-group">
            <label>Category</label>
            <input
              type="text"
              class="form-control"
              name = "category"
              placeholder="Category"
              value={this.state.category}
              onChange={ this.onChange}
            />
          </div>
          <div class="form-group">
            <label>Brand</label>
            <input
              type="text"
              class="form-control"
              name = "brand"
              placeholder="Brand"
              value={this.state.brand}
              onChange={ this.onChange}
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
