import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import Spinner from "../Spinner/Spinner";
export default class DonutChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donutData: {
        labels: [
          "Women's clothing",
          "Men's clothing",
          "Kid's wear",
          "Casuals",
          "Formals",
          "Inner wear",
        ],
        datasets: [
          {
            data: [700, 500, 400, 600, 300, 100],
            backgroundColor: [
              "#f56954",
              "#00a65a",
              "#f39c12",
              "#00c0ef",
              "#3c8dbc",
              "#d2d6de",
            ],
          },
        ],
      },
      isLoading: true,
    };
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 300);
  }

  render() {
    return (
      <div className="card card-danger">
        <div className="card-header">
          <h3 className="card-title">Categories in Stock</h3>

          <div className="card-tools">
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="collapse"
            >
              <i className="fas fa-minus"></i>
            </button>
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="remove"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div className="card-body">
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <Doughnut data={this.state.donutData} />
          )}
        </div>
      </div>
    );
  }
}
