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
      console.log(Items);
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
    console.log("Hey its here");
  };

  render() {
    return (
      <div className="row">
        <Card
          color={"bg-info"}
          icon={"ion-bag"}
          value={this.state.allItems}
          name={"ALL ITEMS IN SHOP"}
        />
        <Card
          color={"bg-success"}
          icon={"ion-stats-bars"}
          value={this.state.approvedItems}
          name={"ITEMS TO BE APPROVED"}
        />
        <Card
          color={"bg-warning"}
          icon={"ion-person-add"}
          value={150}
          name={"NEWLY ADDED"}
        />
        <Card
          color={"bg-danger"}
          icon={"ion-pie-graph"}
          value={150}
          name={"DECLINED ITEMS"}
        />
      </div>
    );
  }
}
