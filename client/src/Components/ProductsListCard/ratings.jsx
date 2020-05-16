import React, { Component } from "react";
import axios from "axios";

export default class ratings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/review/getRating/${this.props.itemId}`)
      .then((res) => {
        this.setState({ rating: res.data.AverageStarRating });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getRating() {
    this.state.rating = Math.ceil(this.state.rating);
    const rate = [];
    const unrate = 5 - this.state.rating;
    for (let index = 0; index < this.state.rating; index++) {
      rate.push(<i className="fa fa-star yellow-star" aria-hidden="true"></i>);
    }
    for (let index = 0; index < unrate; index++) {
      rate.push(<i className="fa fa-star gray-star" aria-hidden="true"></i>);
    }
    return rate;
  }

  render() {
    return <div>{this.getRating()}</div>;
  }
}
