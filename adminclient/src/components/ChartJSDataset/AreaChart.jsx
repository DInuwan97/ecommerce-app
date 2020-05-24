import React, { Component } from "react";
import { Line } from "react-chartjs-2";
export default class AreaChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nyName: "dinuwan",
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Digital Goods",
            backgroundColor: "rgba(60,141,188,0.9)",
            borderColor: "rgba(60,141,188,0.8)",
            pointRadius: false,
            pointColor: "#3b8bba",
            pointStrokeColor: "rgba(60,141,188,1)",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(60,141,188,1)",
            data: [28, 48, 40, 19, 86, 27, 90],
          },
          {
            label: "Electronics",
            backgroundColor: "rgba(210, 214, 222, 1)",
            borderColor: "rgba(210, 214, 222, 1)",
            pointRadius: false,
            pointColor: "rgba(210, 214, 222, 1)",
            pointStrokeColor: "#c1c7d1",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40],
          },
        ],
      },
    };
  }
  render() {
    return (
      <div class="card card-primary">
        <div className="card-header">
          <h3 className="card-title">Area Chart</h3>

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
          <div className="chart">
            <Line
              data={this.state.chartData}
              options={{
                title: {
                  display: true,
                  text: "sachin",
                  fontSize: 25,
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
