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
        console.log(items)
      this.setState({
        category: items,
      });
    });
    console.log(this.state.category)
  }

  render() {
    return (
      <div>
        <CategoryForm />
        <CategoryTable categories={this.state.category} />
      </div>
    );
  }
}
