import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import Spinner from "../Spinner/Spinner";
export default class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nyName: "dinuwan",
      chartData: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [
          {
            label: "With discount",
            backgroundColor: "rgba(60,141,188,0.9)",
            borderColor: "rgba(60,141,188,0.8)",
            pointRadius: false,
            pointColor: "#3b8bba",
            pointStrokeColor: "rgba(60,141,188,1)",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(60,141,188,1)",
            data: [65, 59, 80, 81, 56, 88, 91],
          },
          {
            label: "No discount",
            backgroundColor: "rgba(210, 214, 222, 1)",
            borderColor: "rgba(210, 214, 222, 1)",
            pointRadius: false,
            pointColor: "rgba(210, 214, 222, 1)",
            pointStrokeColor: "#c1c7d1",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [28, 48, 40, 19, 60, 78, 80],
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
      <div className="card card-success">
        <div className="card-header">
          <h3 className="card-title">Purchasings in Last Week</h3>

          <div class="card-tools">
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
            <div className="chart">
              <Bar data={this.state.chartData} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
