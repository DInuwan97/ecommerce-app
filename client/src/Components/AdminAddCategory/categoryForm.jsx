import React, { Component } from "react";
import axios from 'axios'
export default class categoryForm extends Component {
  constructor() {
    super();
    this.state = {
      categoryName: "",
      genderType: "",
      code: "",
    };

    this.onChange = this.onChange.bind(this);
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmitHandler = e => {
      e.preventDefault();
        axios.post('/api/category',{
            categoryName : this.state.categoryName,
            genderType : this.state.genderType,
            code : this.state.code
        }).then((res) => {
            console.log(res);
            console.log(res.data);
          })
          .catch(function (error) {
            console.log(error);
          });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmitHandler}>
          <div class="form-group">
            <label>Category Name</label>
            <input
              type="text"
              class="form-control"
              name="categoryName"
              placeholder="Item Name"
              value={this.state.categoryName}
              onChange={this.onChange}
            />
          </div>
          <div class="form-group">
            <label>Gender</label>
            <input
              type="text"
              class="form-control"
              name="genderType"
              placeholder="genderType"
              value={this.state.genderType}
              onChange={this.onChange}
            />
          </div>


          <div class="form-group">
            <label>Code</label>
            <input
              type="text"
              class="form-control"
              name="code"
              placeholder="Code "
              value={this.state.code}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
