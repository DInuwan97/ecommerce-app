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
    let floor = Math.floor(this.state.rating);
    const rate = [];
    let unrate = 5 - floor;
    const half = this.state.rating - floor;
    for (let index = 0; index < floor; index++) {
      rate.push(<i className="fa fa-star yellow-star" aria-hidden="true"></i>);
    }
    if(half>=0.5){
      rate.push(<i className="fa fa-star-half-o yellow-star" aria-hidden="true"></i>);
      unrate--;
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
