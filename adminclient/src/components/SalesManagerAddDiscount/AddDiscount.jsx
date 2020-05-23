import React, { Component } from "react";
import axios from "axios";
import CardList from "./CardList";
import Table from "./Table";
export class AddDiscount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    this.addDiscount = this.addDiscount.bind(this);
  }

  getItems() {
    axios.get(`/api/items/company/${this.props.companyName}`).then((res) => {
      const items = res.data;
      this.setState({ items });
    });
  }

  componentDidMount() {
    this.getItems();
  }

  addDiscount(id, discount) {
    axios
      .patch(`/api/items/addDiscount`, {
        _id: id,
        discount,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));

    this.setState({
      items: this.state.items.map((item) => {
        if (item._id === id) {
          item.discount = discount;
        }
        return item;
      }),
    });
  }

  render() {
    return (
      <div className="container">
        <CardList items={this.state.items} />
        <Table items={this.state.items} addDiscount={this.addDiscount} />
      </div>
    );
  }
}

export default AddDiscount;
