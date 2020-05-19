import React, { Component } from "react";
import Card from "./Card";

export default class CardList extends Component {
  constructor(props) {
    super(props);
    this.discountedItems = 0;
    this.notDiscountedItems = 0;
  }

  getDiscountedItems() {
    for (let index = 0; index < this.props.items.length; index++) {
      if (this.props.items[index].discount > 0) {
        this.discountedItems++;
      }
    }
    return this.discountedItems;
  }

  getNotDiscountedItems() {
    for (let index = 0; index < this.props.items.length; index++) {
      if (this.props.items[index].discount == 0) {
        this.notDiscountedItems++;
      }
    }
    return this.notDiscountedItems;
  }

  render() {
    return (
      <div className="row">
        <Card
          color={"bg-info"}
          icon={"ion-bag"}
          value={this.props.items.length}
          name={"Company Items"}
        />
        <Card
          color={"bg-success"}
          icon={"ion-stats-bars"}
          value={this.getDiscountedItems()}
          name={"Discounted Items"}
        />
        <Card
          color={"bg-warning"}
          icon={"ion-person-add"}
          value={this.getNotDiscountedItems()}
          name={"Not Discounted"}
        />
        <Card
          color={"bg-danger"}
          icon={"ion-pie-graph"}
          value={150}
          name={"New Items"}
        />
      </div>
    );
  }
}
