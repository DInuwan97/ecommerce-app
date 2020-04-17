import React, { Component } from "react";
import Card from "./Card";
export default class CardList extends Component {
  render() {
    return (
      <div className="row">
        <Card
          color={"bg-info"}
          icon={"ion-bag"}
          value={150}
          name={"New Order"}
        />
        <Card
          color={"bg-success"}
          icon={"ion-stats-bars"}
          value={60}
          name={"Next Order"}
        />
        <Card
          color={"bg-warning"}
          icon={"ion-person-add"}
          value={150}
          name={"sasa"}
        />
        <Card
          color={"bg-danger"}
          icon={"ion-pie-graph"}
          value={150}
          name={"New Order"}
        />
      </div>
    );
  }
}
