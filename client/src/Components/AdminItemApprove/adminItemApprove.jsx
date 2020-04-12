import React, { Component } from "react";
import axios from "axios";
export default class adminItemApprove extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    axios.get(`/api/items`).then((res) => {
      const items = res.data;
      console.log("hello world");
      this.setState({ items });
    });
  }

  render() {
    return (
      <div className = 'container'>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Item Name</th>
              <th scope="col">Price</th>
              <th scope="col">Brand</th>
              <th scope="col">Category</th>  
            </tr>
          </thead>
          <tbody>
                {this.state.items.map(item => (
                    <tr>{item.itemName}</tr>
                ))}
          </tbody>
        </table>
      </div>
    );
  }
}
