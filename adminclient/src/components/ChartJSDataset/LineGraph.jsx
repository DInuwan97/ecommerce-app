import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import Spinner from "../Spinner/Spinner";
import axios from "axios";

export default class LineGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nyName: "dinuwan",
      chartData: {
        labels: ["Chrome", "IE", "FireFox", "Safari", "Opera", "Navigator"],
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

      data: [],
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "/api/pruchase/viewPurchasedItems",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userLoginToken"),
      },
    })
      .then((res) => {
        this.prepareData(res.data);
        this.setState({
          data: res.data,
          isLoading: false,
          firstTimeRendered: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  prepareData = (data) => {
    let dataArray = [];
    dataArray = data;
    console.log("renderes data : " + data.length);
    let companies = [];

    dataArray.forEach((el) => {
      el.items.forEach((item) => {
        console.log(item);
      });
    });
  };

  render() {
    return (
      <div className="card card-info">
        <div className="card-header">
          <h3 className="card-title">Pie Chart</h3>

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
            <div className="chart">
              <Pie
                data={this.state.chartData}
                options={{
                  title: {
                    display: false,
                    text: "sachin",
                    fontSize: 25,
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
