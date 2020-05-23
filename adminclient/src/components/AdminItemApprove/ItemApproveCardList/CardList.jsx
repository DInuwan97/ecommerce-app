import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
export default class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: 0,
      approvedItems: 0,
    };
  }

  //getting all the items
  getAllItems = () => {
    axios.get("api/items").then((res) => {
      const Items = res.data;
      this.setState({ Items });

      let count = 0;
      let allItemCount = 0;
      for (let index = 0; index < Items.length; index++) {
        if (!Items[index].isApproved) {
          count++;
          this.setState({ approvedItems: count });
        } else {
          allItemCount++;
          this.setState({ allItems: allItemCount });
        }
      }
    });
  };

  componentDidMount() {
    this.getAllItems();
  }

  getNumber = () => {
  };

  render() {
    return (
      <div className="row">
        <Card
          color={"bg-info"}
          icon={"ion-bag"}
          value={this.state.allItems}
          name={"ALL ITEMS IN SHOP"}
          link = {'/allItems'}
        />
        <Card
          color={"bg-success"}
          icon={"ion-stats-bars"}
          value={this.state.approvedItems}
          name={"ITEMS TO BE APPROVED"}
          link = {'/itemApprove'}
        />
        <Card
          color={"bg-warning"}
          icon={"ion-person-add"}
          value={1}
          name={"NEWLY ADDED"}
        />
        <Card
          color={"bg-danger"}
          icon={"ion-pie-graph"}
          value={3}
          name={"DECLINED ITEMS"}
        />
      </div>
    );
  }
}
