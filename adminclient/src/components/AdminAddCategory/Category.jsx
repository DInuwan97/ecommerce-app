import React, { Component } from "react";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";
import axios from "axios";
export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
    };
  }

  componentDidMount() {
    axios.get(`/api/category`).then((res) => {
      const items = res.data;
      console.log(items);
      this.setState({
        category: items,
      });
    });
    console.log(this.state.category);
  }

  addCategory = (category) => {
    this.setState({ category: [...this.state.category, category] });
    axios
      .post("/api/category", {
        categoryName: category.categoryName,
        genderType: category.genderType,
        code: category.code,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <CategoryForm addCategory={this.addCategory} />
        <CategoryTable categories={this.state.category} />
      </div>
    );
  }
}
