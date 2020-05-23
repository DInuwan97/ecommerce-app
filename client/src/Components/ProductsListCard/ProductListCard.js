import React, { Component } from "react";
import axios from "axios";
import Categories from "./categories";
import Color from "./colors";
import Size from "./Size";
import Offer from "./offer";
import ProductListRow from "./ProductLIstRow";
import Spinner from '../Layout/Spinner'
export default class ProductListCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: true
    };
  }

  getItemDetails = (type) => {
    let url = '/api/items'
    if (type) {
      url = `/api/items/ItemList/${type}`;
    }
    axios.get(url).then((res) => {
      console.log(res.data, url);

      const items = res.data;
      this.setState({ items, isLoading: false });



    }).catch(err => {
      console.log(err);

    })


  }
  componentDidMount() {
    this.getItemDetails(this.props.match.params.type);
  }
  componentWillReceiveProps(props) {
    if (this.props.match.params.type !== props.match.params.type) {
      this.getItemDetails(props.match.params.type);
    }
  }

  render() {
    return (
      <div className="content">
        <div className="container">
          {/* <div className="col-md-4 w3ls_dresses_grid_left">
            <Categories />
            <Color />
            <Size />
            <Offer />
          </div> */}
          <div className="col-md-12 col-sm-12 women-dresses">
            {/* <div className="col-md-8 col-sm-8 women-dresses"> */}
            {this.state.isLoading && <Spinner />}
            {
              this.state.items.length === 0 && this.state.isLoading !== true ?
            <h1 style={{ color: "#00E58B" }}>No Items in category {this.props.match.params.type}</h1>
                :
                ""
            }
            <ProductListRow items={this.state.items} />
          </div>
        </div>
      </div>
    );
  }
}
