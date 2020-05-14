import React, { Component } from "react";
import Card from './CategoryCard'
import axios from "axios";
export default class CategoryCardList extends Component {
  
  getMaleCount(){
    let maleCount = 0;
    for (let index = 0; index < this.props.categoryList.length; index++) {
      if(this.props.categoryList[index].genderType === 'Male'){
        maleCount++
      } 
    }
    return maleCount;
  }

  getFemaleCount(){
    let female = 0;
    for (let index = 0; index < this.props.categoryList.length; index++) {
      if(this.props.categoryList[index].genderType === 'Female'){
        female++
      } 
    }
    return female;
  }

  render() {
    const { categoryList } = this.props;
    return (
        <div className="row">
        <Card
          color={"bg-info"}
          icon={"ion-bag"}
          value={categoryList.length}
          name={"All Categories"}
        />
        <Card
          color={"bg-success"}
          icon={"ion-stats-bars"}
          value={this.getMaleCount()}
          name={"Male Categories"}
        />
        <Card
          color={"bg-warning"}
          icon={"ion-person-add"}
          value={this.getFemaleCount()}
          name={"Female Categories"}
        />
      </div>
    );
  }
}
