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
  }

  render() {
    return (
      <div className='container'>
        <CardList />
        <Table items={this.state.items} addDiscount={this.addDiscount} />
      </div>
    );
  }
}

export default AddDiscount;
