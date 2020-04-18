import React, { Component } from "react";
import CardList from './CategoryCardList'
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";
import axios from "axios";
export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      updatingCategory: {},
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

  //adding a new category
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

  //deleting a category
  deleteCategory = (id) => {
    this.setState({
      category: [...this.state.category.filter((cat) => cat._id !== id)],
    });
    axios.delete(`/api/category/${id}`).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  //updating
  updateCategory = (id) => {
    this.setState({
      updatingCategory: {
        categoryName: "newCategory",
        genderType: "Male",
        code: "NM19",
      },
    });
  };

  render() {
    return (
      <div className="container">
        <CardList categoryList = {this.state.category}/>
        <CategoryForm
          addCategory={this.addCategory}
          updateCategory={this.updateCategory}
          updatingCategory = {this.state.updatingCategory}
        
        />
        <CategoryTable
          categories={this.state.category}
          deleteCategory={this.deleteCategory}
          updateCategory={this.updateCategory}
        />
      </div>
    );
  }
}
