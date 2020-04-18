import React, { Component } from "react";
import Card from './CategoryCard'
import axios from "axios";
export default class CategoryCardList extends Component {
  render() {
    const { categoryList } = this.props;
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
      </div>
    );
  }
}
