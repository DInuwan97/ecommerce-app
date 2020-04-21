import React, { Component } from "react";
import axios from "axios";
export default class ViewSingleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
    };
  }

  componentDidMount() {
    axios.get(`/api/items/5e9ea6c18f5c193690c16f7a`).then((res) => {
      const items = res.data;
      console.log("hello world");

      this.setState({ items });
    });
  }

  render() {
    const {
      itemImage,
      company,
      itemName,
      price,
      size,
      addedBy,
    } = this.state.items;
    return (
      <section class="content">
        <div class="card card-solid">
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-sm-6">
                <h3 class="d-inline-block d-sm-none">
                  LOWA Men’s Renegade GTX Mid Hiking Boots Review
                </h3>
                <div class="col-12">
                  <img
                    src={itemImage}
                    class="product-image"
                    alt="Product Image"
                  />
                </div>
              </div>
              <div class="col-12 col-sm-6">
                <h3 class="my-3">{company}</h3>
                <h3>{itemName}</h3><br/>
                <h3>{addedBy}</h3>
                <hr />
                <h4>Available Colors</h4>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="btn btn-default text-center active">
                    <input
                      type="radio"
                      name="color_option"
                      id="color_option1"
                      autocomplete="off"
                      checked=""
                    />
                    Green
                    <br />
                    <i class="fas fa-circle fa-2x text-green"></i>
                  </label>
                  <label class="btn btn-default text-center">
                    <input
                      type="radio"
                      name="color_option"
                      id="color_option2"
                      autocomplete="off"
                    />
                    Blue
                    <br />
                    <i class="fas fa-circle fa-2x text-blue"></i>
                  </label>
                  <label class="btn btn-default text-center">
                    <input
                      type="radio"
                      name="color_option"
                      id="color_option3"
                      autocomplete="off"
                    />
                    Purple
                    <br />
                    <i class="fas fa-circle fa-2x text-purple"></i>
                  </label>
                  <label class="btn btn-default text-center">
                    <input
                      type="radio"
                      name="color_option"
                      id="color_option4"
                      autocomplete="off"
                    />
                    Red
                    <br />
                    <i class="fas fa-circle fa-2x text-red"></i>
                  </label>
                  <label class="btn btn-default text-center">
                    <input
                      type="radio"
                      name="color_option"
                      id="color_option5"
                      autocomplete="off"
                    />
                    Orange
                    <br />
                    <i class="fas fa-circle fa-2x text-orange"></i>
                  </label>
                </div>

                <h4 class="mt-3">
                  Size <small>Please select one</small>
                </h4>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="btn btn-default text-center">
                    <input
                      type="radio"
                      name="color_option"
                      id="color_option1"
                      autocomplete="off"
                    />
                    <span class="text-xl">{size}</span>
                  </label>
                </div>

                <div class="bg-gray py-2 px-3 mt-4">
                  <h2 class="mb-0">Rs.{price}</h2>
                </div>

                <div class="mt-4">
                  <div class="btn btn-primary btn-lg btn-flat">
                    <i class="fas fa-cart-plus fa-lg mr-2"></i>
                    Approve Item
                  </div>

                  <div class="btn btn-default btn-lg btn-flat">
                    <i class="fas fa-heart fa-lg mr-2"></i>
                    Decline Item
                  </div>
                </div>

                <div class="mt-4 product-share">
                  <a href="#" class="text-gray">
                    <i class="fab fa-facebook-square fa-2x"></i>
                  </a>
                  <a href="#" class="text-gray">
                    <i class="fab fa-twitter-square fa-2x"></i>
                  </a>
                  <a href="#" class="text-gray">
                    <i class="fas fa-envelope-square fa-2x"></i>
                  </a>
                  <a href="#" class="text-gray">
                    <i class="fas fa-rss-square fa-2x"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
