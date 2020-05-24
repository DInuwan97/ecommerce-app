import React, { Component } from "react";
import "./assets/css/imageUploadPreview.css";
import swal from "sweetalert";
import axios from "axios";
import Avatar from "react-avatar";
import { Link, withRouter } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
export default class SalesManagerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      mobile: "",
      address: "",
      isAdmin: "",
      isSalesManager: "",
      isSalesServicer: "",
      isCustomer: "",
      userDesignation: "",
      userImageUrl: "",
      saleManagerCompany: "",

      itemImage: "",
      itemList: [],

      reviewList: [],
      reviewUserFirstName: "",
      reviewUserLastName: "",
      reviewedUserId: "",
      AddedTime: "",
      userImageUrlReview: "",
      reviewMessage: "",

      isLoading: true,
    };

    // this.uploadSingleFile = this.uploadSingleFile.bind(this);
    //this.upload = this.upload.bind(this);
  }

  getUser = () => {
    axios({
      method: "get",
      url: `/api/users/singleUser/${this.props.salesManagerEmail}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userLoginToken"),
      },
    })
      .then((res) => {
        const user = res.data;

        this.setState({
          firstName: user.firstName,
          lastName: user.lastName,
          mobile: user.mobile,
          address: user.address,
          isAdmin: user.isAdmin,
          isSalesManager: user.isSalesManager,
          isSalesServicer: user.isSalesServicer,
          isCustomer: user.isCustomer,
          userImageUrl: user.userImageUrl,
          file: user.userImageUrl,
          saleManagerCompany: user.company,
        });

        //this.state.file = this.state.userImageUrl;

        if (this.state.isCustomer === true) {
          this.setState({
            userDesignation: "Customer",
          });
        } else if (this.state.isAdmin === true) {
          this.setState({
            userDesignation: "Admin",
          });
        } else if (this.state.isSalesManager === true) {
          this.setState({
            userDesignation: "Sales Manager",
          });
        } else if (this.state.isSalesServicer === true) {
          this.setState({
            userDesignation: "Sales Servicer",
          });
        }
      })
      .catch((err) => {});
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    this.getUser();
    //     this.getItemstoYourCompany();

    setTimeout(() => {
      this.getReviewsByCompany();
    }, 1000);
  }

  getItemstoYourCompany = () => {
    axios({
      method: "get",
      url: `/api/items/company/${this.state.company}`,
    })
      .then((res) => {
        const item = res.data;

        this.setState({
          itemList: item,
          itemImage: item.itemImage,
        });
      })
      .catch((err) => {});
  };

  getReviewsByCompany = () => {
    axios({
      method: "get",
      url: `/api/review/reviews/view/${this.state.saleManagerCompany}`,
    })
      .then((res) => {
        let review = res.data;

        this.setState({
          reviewList: review,
          reviewUserFirstName: review.reviewUserFirstName,
          reviewUserLastName: review.reviewUserLastName,
          reviewedUserId: review.reviewedUserId,
          AddedTime: review.AddedTime,
          userImageUrlReview: review.userImageUrl,
          reviewMessage: review.reviewMessage,
          isLoading: false,
        });
      })
      .catch((err) => {});
  };
  render() {
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    let imgPreview;
    if (this.state.userImageUrl !== "") {
      imgPreview = (
        <img
          src={this.state.userImageUrl}
          alt=""
          style={{ width: "160px", height: "160px", borderRadius: "100px" }}
        />
      );
    } else {
      imgPreview = (
        <Avatar
          name={this.state.firstName + " " + this.state.lastName}
          round="50%"
          size="120"
        />
      );
    }

    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">{imgPreview}</div>

                  <h3 className="profile-username text-center">
                    {this.state.firstName} {this.state.lastName}
                  </h3>

                  <p className="text-muted text-center">
                    {this.state.userDesignation}
                  </p>
                  <center>
                    <p class="badge badge-warning">
                      {this.state.saleManagerCompany}
                    </p>
                  </center>
                  <ul className="list-group list-group-unbordered mb-3">
                    <li className="list-group-item">
                      <i class="fas fa-envelope-open-text"></i>
                      <b> Email</b>{" "}
                      <b>
                        <a
                          className="float-right"
                          href={"mailto:" + this.props.salesManagerEmail}
                        >
                          {this.props.salesManagerEmail}
                        </a>
                      </b>
                    </li>
                    <li className="list-group-item">
                      <i class="fas fa-phone-square-alt"></i>
                      <b> Mobile</b>
                      <b>
                        <a className="float-right">{this.state.mobile}</a>
                      </b>
                    </li>
                  </ul>

                  <a
                    href={"skype:" + this.state.mobile + "?call"}
                    className="btn btn-success btn-block"
                  >
                    <b> Voice</b>
                  </a>
                  <a href="/compose" className="btn btn-dark btn-block">
                    <b>Mail</b>
                  </a>
                </div>
              </div>

              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">About Me</h3>
                </div>

                <div className="card-body">
                  <strong>
                    <i className="fas fa-map-marker-alt mr-1"></i> Location
                  </strong>

                  <p className="text-muted">{this.state.address}</p>

                  <hr />
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="card">
                <div className="card-header p-2">
                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#activity"
                        data-toggle="tab"
                      >
                        Activity
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#timeline"
                        data-toggle="tab"
                      >
                        Timeline
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="card-body">
                  <div className="tab-content">
                    {this.state.isLoading ? (
                      <Spinner />
                    ) : (
                      <div className="active tab-pane" id="activity">
                        {this.state.reviewList.slice(0, 3).map((rev) => (
                          <div className="post">
                            <div className="user-block">
                              {rev.userImageUrl == "" && (
                                <Avatar
                                  name={
                                    rev.reviewUserFirstName +
                                    " " +
                                    rev.reviewUserLastName
                                  }
                                  round="50%"
                                  size="40"
                                  style={{
                                    float: "left",
                                    width: "40px",
                                    height: "40px",
                                  }}
                                />
                              )}

                              {rev.userImageUrl != "" && (
                                <img
                                  className="img-circle img-bordered-sm"
                                  src={rev.userImageUrl}
                                />
                              )}

                              <span className="username">
                                <a href="#">
                                  {rev.reviewUserFirstName}{" "}
                                  {rev.reviewUserLastName}
                                </a>
                                <a href="#" className="float-right btn-tool">
                                  <i className="fas fa-times"></i>
                                </a>
                              </span>
                              <span className="description">
                                Shared publicly -{" "}
                                {new Intl.DateTimeFormat(
                                  "en-US",
                                  options
                                ).format(new Date(Date.parse(rev.AddedTime)))}
                              </span>
                            </div>

                            <p>{rev.reviewMessage}</p>

                            <p>
                              <a href="#" className="link-black text-sm mr-2">
                                <i className="fas fa-share mr-1"></i> Share
                              </a>
                              <a href="#" className="link-black text-sm">
                                <i className="far fa-thumbs-up mr-1"></i> Like
                              </a>
                              <span className="float-right">
                                <a href="#" className="link-black text-sm">
                                  <i className="far fa-comments mr-1"></i>{" "}
                                  {rev.itemName}
                                </a>
                              </span>
                            </p>
                          </div>
                        ))}

                        <div className="post"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
