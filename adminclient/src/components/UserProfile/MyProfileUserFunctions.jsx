import React, { Component } from "react";
import "./assets/css/imageUploadPreview.css";
import swal from "sweetalert";
import axios from "axios";
import Avatar from "react-avatar";

export default class MyProfileUserFunctions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
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

      itemImage: "",
      itemList: [],

      oldPassword: "",
      newPassword: "",
      confirmPassword: "",

      reviewList: [],
      reviewUserFirstName: "",
      reviewUserLastName: "",
      reviewedUserId: "",
      AddedTime: "",
      userImageUrlReview: "",
      reviewMessage: "",
    };

    this.uploadSingleFile = this.uploadSingleFile.bind(this);
    this.upload = this.upload.bind(this);
  }

  getUser = () => {
    axios({
      method: "get",
      url: `/api/users/singleUser/${this.props.loggedEmail}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userLoginToken"),
      },
    })
      .then((res) => {
        const user = res.data;
        console.log("User data are : ", user.isSalesManager);

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
      .catch((err) => {
        console.log(err);
      });
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    this.getUser();
    this.getItemstoYourCompany();
    this.getReviewsByCompany();
  }

  onImageHandle = () => {
    let formData = new FormData();
    formData.append("image", this.state.userImageUrl);
    axios({
      method: "patch",
      url: `/api/users/updateImage/:${this.props.loggedEmail}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userLoginToken"),
      },
      data: formData,
    })
      //.patch(`/api/users/updateImage/:${this.props.loggedEmail}`, formData)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  updateMyProfile = (email) => {
    console.log("Sales Servicer Email : ", email);
    axios({
      method: "patch",
      url: `/api/users/updatemyProfile/${email}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userLoginToken"),
      },
      data: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        mobile: this.state.mobile,
        address: this.state.address,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    let formData = new FormData();
    formData.append("image", this.state.userImageUrl);
    axios({
      method: "patch",
      url: `/api/users/updateImage/${this.props.loggedEmail}`,
      data: formData,
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  uploadSingleFile(e) {
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
    });

    this.setState({
      userImageUrl: e.target.files[0],
    });
  }

  upload(e) {
    e.preventDefault();
    console.log(this.state.file);
  }

  getItemstoYourCompany = () => {
    axios({
      method: "get",
      url: `/api/items/company/${this.props.companyName}`,
    })
      .then((res) => {
        const item = res.data;

        this.setState({
          itemList: item,
          itemImage: item.itemImage,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changeUserPassword = () => {
    axios({
      method: "patch",
      url: `/api/users/changePassword/${this.props.loggedEmail}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userLoginToken"),
      },
      data: {
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
        confirmPassword: this.state.confirmPassword,
      },
    }).then({});
  };

  getReviewsByCompany = () => {
    axios({
      method: "get",
      url: `/api/review/reviews/view/${this.props.companyName}`,
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
        });

        console.log("review data", review[0].userImageUrl);
      })
      .catch((err) => {
        console.log(err);
      });
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
    if (this.state.file) {
      imgPreview = (
        <img
          src={this.state.file}
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
                    <p class="badge badge-warning">{this.props.companyName}</p>
                  </center>
                  <ul className="list-group list-group-unbordered mb-3">
                    <li className="list-group-item">
                      <i class="fas fa-envelope-open-text"></i>
                      <b> Email</b>{" "}
                      <b>
                        <a className="float-right">{this.props.loggedEmail}</a>
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

                  <a href="#" className="btn btn-success btn-block">
                    <b>Voice</b>
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
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#settings"
                        data-toggle="tab"
                      >
                        Settings
                      </a>
                    </li>

                    <div style={{ float: "right" }}>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        style={{ float: "right" }}
                      >
                        Change Password
                      </button>
                    </div>

                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Modal title
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <div className="form-group">
                              <label
                                for="recipient-name"
                                className="col-form-label"
                              >
                                Old Password:
                              </label>
                              <input
                                type="password"
                                onChange={this.onChangeHandler}
                                name="oldPassword"
                                palceholder="Old Password"
                                className="form-control"
                                id="oldPassword"
                              />
                            </div>

                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label
                                    for="message-text"
                                    className="col-form-label"
                                  >
                                    New Password:
                                  </label>
                                  <input
                                    type="password"
                                    onChange={this.onChangeHandler}
                                    name="newPassword"
                                    palceholder="New Password"
                                    className="form-control"
                                    id="newPassword"
                                  />
                                </div>
                              </div>

                              <div className="col">
                                <div className="form-group">
                                  <label
                                    for="message-text"
                                    className="col-form-label"
                                  >
                                    Confirm New Password:
                                  </label>
                                  <input
                                    type="password"
                                    onChange={this.onChangeHandler}
                                    name="confirmPassword"
                                    palceholder="Confirm New Password"
                                    className="form-control"
                                    id="confirmPassword"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              className="btn btn-primary"
                              onClick={
                                () =>
                                  swal({
                                    title: "Password Changing",
                                    text: "Are your sure ? ",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                  }).then((willConfirm) => {
                                    if (willConfirm) {
                                      if (
                                        this.state.newPassword ===
                                          this.state.confirmPassword &&
                                        this.state.newPassword != null
                                      ) {
                                        swal("Password has been Changed", {
                                          icon: "success",
                                        }).then(() => {
                                          this.changeUserPassword();
                                        });
                                      } else {
                                        swal({
                                          title: "Oops!!!",
                                          text: "Passwords are not matching",
                                          icon: "error",
                                          button: true,
                                        });
                                      }
                                    } else {
                                      swal({
                                        title: "Canceled",
                                        text: "No changes happend",
                                        icon: "success",
                                        buttons: true,
                                      });
                                    }
                                  })

                                // }else{
                                //   swal({
                                //     title: "Oops!!!",
                                //     text: "Passwords are not matching",
                                //     icon: "error",
                                //     button: true,
                                // })
                                // }
                              }
                              data-dismiss="modal"
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content">
                    <div className="active tab-pane" id="activity">
                      {this.state.reviewList.slice(0, 9).map((rev) => (
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
                              {new Intl.DateTimeFormat("en-US", options).format(
                                new Date(Date.parse(rev.AddedTime))
                              )}
                            </span>
                          </div>

                          <p>{rev.reviewMessage}</p>

                          <p>
                            <a href="#" className="link-black text-sm mr-2">
                              <i className="fas fa-share mr-1" ></i> Share

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

                      <div className="post">
                        <div className="row mb-3">
                          <div className="col-sm-6">
                            <img
                              className="img-fluid"
                              src="../../dist/img/photo1.png"
                              alt="Photo"
                            />
                          </div>

                          <div className="col-sm-6">
                            <div className="row">
                              <div className="col-sm-6">
                                <img
                                  className="img-fluid mb-3"
                                  src="../../dist/img/photo2.png"
                                  alt="Photo"
                                />
                                <img
                                  className="img-fluid"
                                  src="../../dist/img/photo3.jpg"
                                  alt="Photo"
                                />
                              </div>

                              <div className="col-sm-6">
                                <img
                                  className="img-fluid mb-3"
                                  src="../../dist/img/photo4.jpg"
                                  alt="Photo"
                                />
                                <img
                                  className="img-fluid"
                                  src="../../dist/img/photo1.png"
                                  alt="Photo"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <p>
                          <a href="#" className="link-black text-sm mr-2">
                            <i className="fas fa-share mr-1"></i> Share
                          </a>
                          <a href="#" className="link-black text-sm">
                            <i className="far fa-thumbs-up mr-1"></i> Like
                          </a>
                          <span className="float-right">
                            <a href="#" className="link-black text-sm">
                              <i className="far fa-comments mr-1"></i> Comments
                              (5)
                            </a>
                          </span>
                        </p>

                        <input
                          className="form-control form-control-sm"
                          type="text"
                          placeholder="Type a comment"
                        />
                      </div>
                    </div>

                    <div className="tab-pane" id="timeline">
                      <div className="timeline timeline-inverse">
                        <div className="time-label">
                          <span className="bg-danger">10 Feb. 2014</span>
                        </div>

                        <div>
                          <i className="fas fa-envelope bg-primary"></i>

                          <div className="timeline-item">
                            <span className="time">
                              <i className="far fa-clock"></i> 12:05
                            </span>

                            <h3 className="timeline-header">
                              <a href="#">Support Team</a> sent you an email
                            </h3>

                            <div className="timeline-body">
                              Etsy doostang zoodles disqus groupon greplin oooj
                              voxy zoodles, weebly ning heekya handango imeem
                              plugg dopplr jibjab, movity jajah plickers sifteo
                              edmodo ifttt zimbra. Babblely odeo kaboodle quora
                              plaxo ideeli hulu weebly balihoo...
                            </div>
                            <div className="timeline-footer">
                              <a href="#" className="btn btn-primary btn-sm">
                                Read more
                              </a>
                              <a href="#" className="btn btn-danger btn-sm">
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>

                        <div>
                          <i className="fas fa-user bg-info"></i>

                          <div className="timeline-item">
                            <span className="time">
                              <i className="far fa-clock"></i> 5 mins ago
                            </span>

                            <h3 className="timeline-header border-0">
                              <a href="#">Sarah Young</a> accepted your friend
                              request
                            </h3>
                          </div>
                        </div>

                        <div>
                          <i className="fas fa-comments bg-warning"></i>

                          <div className="timeline-item">
                            <span className="time">
                              <i className="far fa-clock"></i> 27 mins ago
                            </span>

                            <h3 className="timeline-header">
                              <a href="#">Jay White</a> commented on your post
                            </h3>

                            <div className="timeline-body">
                              Take me to your leader! Switzerland is small and
                              neutral! We are more like Germany, ambitious and
                              misunderstood!
                            </div>
                            <div className="timeline-footer">
                              <a
                                href="#"
                                className="btn btn-warning btn-flat btn-sm"
                              >
                                View comment
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="time-label">
                          <span className="bg-success">3 Jan. 2014</span>
                        </div>

                        <div>
                          <i className="fas fa-camera bg-purple"></i>

                          <div className="timeline-item">
                            <span className="time">
                              <i className="far fa-clock"></i> 2 days ago
                            </span>

                            <h3 className="timeline-header">
                              <a href="#">{this.props.companyName}</a> 's Latest
                              updates
                            </h3>

                            <div className="timeline-body">
                              {this.state.itemList
                                .slice(0, 5)
                                .map(({ itemImage }) => {
                                  return (
                                    <img
                                      src={itemImage}
                                      alt="..."
                                      style={{
                                        width: "10%",
                                        height: "20%",
                                        marginRight: 30,
                                      }}
                                    />
                                  );
                                })}
                            </div>
                          </div>
                        </div>

                        <div>
                          <i className="far fa-clock bg-gray"></i>
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane" id="settings">
                      <div className="form-group row">
                        <label
                          for="firstName"
                          className="col-sm-2 col-form-label"
                        >
                          First Name
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            value={this.state.firstName}
                            onChange={this.onChangeHandler}
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          for="lastName"
                          className="col-sm-2 col-form-label"
                        >
                          Last Name
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            value={this.state.lastName}
                            onChange={this.onChangeHandler}
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          for="userEmail"
                          className="col-sm-2 col-form-label"
                        >
                          Email
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="email"
                            value={this.props.loggedEmail}
                            disabled
                            onChange={this.onChangeHandler}
                            className="form-control"
                            id="userEmail"
                            name="userEmail"
                            placeholder="Email"
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          for="userMobile"
                          className="col-sm-2 col-form-label"
                        >
                          Mobile
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            value={this.state.mobile}
                            onChange={this.onChangeHandler}
                            className="form-control"
                            id="userMobile"
                            name="mobile"
                            placeholder="Mobile"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          for="userAddress"
                          className="col-sm-2 col-form-label"
                        >
                          Address
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            value={this.state.address}
                            onChange={this.onChangeHandler}
                            className="form-control"
                            id="address"
                            placeholder="Address"
                            name="address"
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          for="inputSkills"
                          className="col-sm-2 col-form-label"
                        >
                          Your DP
                        </label>
                        <div className="col-sm-10">
                          <div className="form-group preview">{imgPreview}</div>

                          <input
                            type="file"
                            name="userImageUrl"
                            onChange={this.uploadSingleFile}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="offset-sm-2 col-sm-10">
                          <div className="checkbox">
                            <label>
                              <input type="checkbox" /> I agree to the{" "}
                              <a href="#">terms and conditions</a>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="offset-sm-2 col-sm-10">
                          <button
                            onClick={() => {
                              swal({
                                title: "Done",
                                text: "Profile was Updated",
                                icon: "success",
                              }).then(() => {
                                this.updateMyProfile(this.props.loggedEmail);
                              });
                            }}
                            className="btn btn-danger"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
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
