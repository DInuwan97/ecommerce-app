import React, { Component } from "react";
import SalesServicersList from "./SalesServicersList";
import Spinner from "../../Spinner/Spinner";
import axios from "axios";

const $ = require("jquery");
$.DataTable = require("datatables.net");
export default class SalesManagerFunctions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salesServicersList: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "/api/users/viewusers",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userLoginToken"),
      },
    }).then((res) => {
      const users = res.data;
      this.setState({
        salesServicersList: users,
        isLoading: false,
      });
      $("#salesServicersList-table").DataTable();
    });
  }

  approveSalesServicer = (email) => {
    this.setState({
      salesServicersList: [
        ...this.state.salesServicersList.filter((user) => user.email !== email),
      ],
    });
    axios({
      method: "patch",
      url: `/api/users/confirmSalesServicer/${email}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userLoginToken"),
      },
    })
      .then((res) => {
        this.sendEmailToSalesServicer(email);
      })
      .catch((err) => {});
  };

  deleteSalesServicer = (email) => {
    this.setState({
      salesServicersList: [
        ...this.state.salesServicersList.filter((user) => user.email !== email),
      ],
    });
    axios({
      method: "delete",
      url: `/api/users/deleteSalesManager/${email}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userLoginToken"),
      },
    })
      .then((res) => {})
      .catch((err) => {});
  };

  sendEmailToSalesServicer = (email) => {
    axios({
      method: "post",
      url: "/api/users/admin/sendMail/",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userLoginToken"),
      },
      data: {
        msg:
          "CONGRATULATIONS!!! Ypur Sales Manager has been approved the Your Connetion Request on  joining with Fashion Club as a Sales Servicer.",
        to: email,
        subject: "Fashion Club - Salas Servicer Approval Statement",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { companyName } = this.props;
    let content = (
      <SalesServicersList
        users={this.state.salesServicersList}
        deleteSalesServicer={this.deleteSalesServicer}
        approveSalesServicer={this.approveSalesServicer}
        companyName={companyName}
      />
    );
    if (this.state.isLoading) {
      content = <Spinner />;
    }

    return <div>{content}</div>;
  }
}
