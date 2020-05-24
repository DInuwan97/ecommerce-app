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
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
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
    // console.log("renderes data : " + data.length);
    let dataArray = [];
    let itemsArray = [];
    let companies = [];
    let filteredCompanies = [];

    dataArray = data;

    dataArray.forEach((el) => {
      el.items.forEach((item) => {
        companies.push(item.company);
        itemsArray.push(item);
      });
    });

    // remove duplicates
    filteredCompanies = companies.filter((com, index) => {
      return companies.indexOf(com) === index;
    });

    // assign value 1 for all companies
    let quantitiies = new Array(filteredCompanies.length);
    let backgroundColors = new Array(filteredCompanies.length);

    for (let i = 0; i < quantitiies.length; i++) {
      quantitiies[i] = 1;
      backgroundColors[i] = this.getRandomColors();
    }

    // set company purchased amounts to a array
    itemsArray.forEach((item, index) => {
      for (let i = 0; i < filteredCompanies.length; i++) {
        if (item.company == filteredCompanies[i]) {
          quantitiies[i] += 1;
        }
      }
    });

    console.log(quantitiies);

    this.setState({
      chartData: {
        labels: filteredCompanies,
        datasets: [
          {
            data: quantitiies,
            backgroundColor: backgroundColors,
          },
        ],
      },
    });
  };

  getRandomColors = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  render() {
    return (
      <div className="card card-info">
        <div className="card-header">
          <h3 className="card-title">Purchasings by Companies</h3>

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
