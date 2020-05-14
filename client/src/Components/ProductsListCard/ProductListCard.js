import React, { Component } from "react";
import axios from "axios";
import Categories from "./categories";
import Color from "./colors";
import Size from "./Size";
import Offer from "./offer";
import ProductListRow from "./ProductLIstRow";
export default class ProductListCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    axios.get("/api/items").then((res) => {
      const items = res.data;
      this.setState({ items });
    });
  }

  render() {
    return (
      <div className="content">
        <div className="container">
          <div className="col-md-4 w3ls_dresses_grid_left">
            <Categories />
            <Color />
            <Size />
            <Offer />
          </div>
          <div className="col-md-8 col-sm-8 women-dresses">
            <ProductListRow items={this.state.items} />
          </div>
        </div>
      </div>
    );
  }
}
