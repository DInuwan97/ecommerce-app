import React, { Component } from "react";
import axios from "axios";
import Table from './ItemTable/ItemTable'
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
        <Table items = {this.state.items}/>
      </div>
    );
  }
}
