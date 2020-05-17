import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import jwt_decode from "jwt-decode";
export default class addNewItemComponent extends Component {
  constructor() {
    super();
    this.state = {
      itemName: "",
      price: 0,
      Brand: "",
      category: [],
      selectedCategory: "",
      size: "",
      stockQuantity: 0,
      addedBy: "",
      description: "",
      itemImage: null,
      company: "",
    };
    this.onChange = this.onChange.bind(this);
    console.log("localstorage login token :", localStorage.userLoginToken);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //image on Change
  onChangeImage = (e) => {
    this.setState({ itemImage: e.target.files[0] });
  };

  // this.setState({ category: [...this.state.category, category] });
  componentDidMount() {
    axios.get(`/api/category`).then((res) => {
      const items = res.data;
      console.log(items);
      let categoryInfo = items.map((item) => {
        console.log(item);
        return { categoryName: item.categoryName };
      });
      this.setState({
        category: categoryInfo,
      });
    });
  }

  onImageHandle = () => {
    let formData = new FormData();
    formData.append("image", this.state.itemImage);
    axios
      .patch(`/api/items/image/${this.state.itemName}`, formData)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  onSubmitHandler = (e) => {
    const token = localStorage.userLoginToken;
    const decoded = jwt_decode(token);
    e.preventDefault();
    console.log(this.state.selectedCategory);
    console.log(this.state);

    axios
      .post("/api/items", {
        itemName: this.state.itemName,
        price: this.state.price,
        Brand: this.state.Brand,
        category: this.state.selectedCategory,
        size: this.state.size,
        stockQuantity: this.state.stockQuantity,
        addedBy: decoded.email,
        description: this.state.description,
        company: decoded.company,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        swal({
          title: "THANK YOU",
          text: "ITEM ADDED SUCESSFULLY",
          icon: "success",
          button: "OKAY",
        });
      })
      .catch(function (error) {
        console.log(error.response);
        swal({
          title: "Oops!!!",
          text: "Fields are Empty",
          icon: "error",
          button: "Please Enter the Again",
        });
      });

    this.onImageHandle();

    this.setState({
      itemName: "",
      price: 0,
      Brand: "",
      size: "",
      stockQuantity: 0,
    });
  };

  render() {
    return (
      <div className="login">
        <div className="main-agileits">
          <div className="form-w3agile">
            <h3>ADD NEW ITEM</h3>
            <form enctype="multipart/form-data" onSubmit={this.onSubmitHandler}>
              <div class="form-group">
                <label>Item Name</label>
                <input
                  type="text"
                  class="form-control"
                  name="itemName"
                  placeholder="Item Name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div class="form-group">
                <label>Price</label>
                <input
                  type="text"
                  class="form-control"
                  name="price"
                  placeholder="Price"
                  value={this.state.price}
                  onChange={this.onChange}
                />
              </div>
              <div
                className="input-group mb-3"
                style={{ width: "100%", height: 30, marginBottom: 20 }}
              >
                <label>Category</label>
                <select
                  className="form-control form-control-lg"
                  style={{ height: 40 }}
                  name="category"
                  required=""
                  onChange={(e) =>
                    this.setState({ selectedCategory: e.target.value })
                  }
                >
                  {this.state.category.map((cat) => (
                    <option value={cat.categoryName}>{cat.categoryName}</option>
                  ))}
                </select>

                <div className="clearfix"></div>
              </div>

              <div
                className="input-group mb-3"
                style={{ width: "100%", height: 30, marginBottom: 20 }}
              >
                <label>Size</label>
                <select
                  className="form-control form-control-lg"
                  style={{ height: 40 }}
                  name="size"
                  required=""
                  onChange={this.onChange}
                >
                  <option value="">SIZE</option>
                  <option value="Extra Small">Extra Small</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="Extra Large">Extra Large</option>
                  <option value="No-Size">No-Size</option>
                </select>

                <div className="clearfix"></div>
              </div>

              <div class="form-group">
                <label>Brand</label>
                <input
                  type="text"
                  class="form-control"
                  name="Brand"
                  placeholder="Brand"
                  value={this.state.Brand}
                  onChange={this.onChange}
                />
              </div>
              <div class="form-group">
                <label>Image</label>
                <input
                  type="file"
                  class="form-control"
                  name="itemImage"
                  placeholder="itemImage"
                  onChange={this.onChangeImage}
                />
              </div>
              <div class="form-group">
                <label>Stock Quantity</label>
                <input
                  type="text"
                  class="form-control"
                  name="stockQuantity"
                  placeholder="Stock Quantity"
                  value={this.state.stockQuantity}
                  onChange={this.onChange}
                />
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea
                  rows="4"
                  cols="50"
                  type="text-area"
                  class="form-control"
                  name="description"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.onChange}
                />
              </div>
              <button class="btn btn-primary btn-block btn-lg ">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
