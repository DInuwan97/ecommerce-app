import React, { Component } from "react";
import classes from "./UserProfile.module.css";
import axios from "axios";
import Avatar from "react-avatar";
import swal from 'sweetalert';
export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      firstName: "",
      lastName: "",
      mobile: "",
      address: "",
      email: "",
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
      nameFontSize: "",
    };

    this.uploadSingleFile = this.uploadSingleFile.bind(this);
  }

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


    axios({
      method:'',
      url:'/api/review/admin/changeUserData'
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

  };

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

  componentDidMount() {
    this.getUser();
  }

  uploadSingleFile(e) {
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
    });

    this.setState({
      userImageUrl: e.target.files[0],
    });
  }

  onChangeHandler = (e) => {
    switch (e.target.name) {
      case "firstName":
      case "lastName":
        const fname = document.getElementById("fname");
        const lname = document.getElementById("lname");
        const fullname = document.getElementById("fullname");

        if (fname.offsetWidth + lname.offsetWidth > fullname.offsetWidth) {
          fullname.style.flexDirection = "column";
          fullname.style.alignItems = "center";
        } else {
          fullname.style.flexDirection = "row";
          fullname.style.alignItems = "center";
        }

        if (fname.offsetWidth >= fullname.offsetWidth) {
          fname.style.overflow = "hidden";
        } else {
          fname.style.overflow = "visible";
        }

        if (lname.offsetWidth >= fullname.offsetWidth) {
          lname.style.overflow = "hidden";
        } else {
          lname.style.overflow = "visible";
        }
        this.setState({
          [e.target.name]: e.target.value.trim(),
        });
        break;

      case "mobile":
        if (!isNaN(e.target.value) && e.target.value.length <= 10) {
          this.setState({
            [e.target.name]: e.target.value.trim(),
          });
        }
        break;

      default:
        console.log(e.target.value);
        this.setState({
          [e.target.name]: e.target.value,
        });
    }
  };

  clearSpace = (e) => {
    this.setState({
      [e.target.name]: e.target.value.trim(),
    });
  };

  render() {
    let imgPreview;
    if (this.state.file) {
      imgPreview = (
        <img
          src={this.state.file}
          alt=""
          style={{
            width: "160px",
            height: "160px",
            borderRadius: "100px",
          }}
        />
      );
    } else {
      imgPreview = (
        <Avatar name={this.state.firstName + " " + this.state.lastName} />
      );
    }

    return (
      <div>
        <div className="contact">
          <div className="container">
            <div className="col-md-4 col-sm-4 contact-left">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className={classes.container}>
                    <div className={classes.header}>
                      {imgPreview}

                      <div id="fullname" className={classes.header__name}>
                        <span id="fname" className={classes.header__name_1}>
                          {this.state.firstName.trim()}
                        </span>
                        <span id="lname" className={classes.header__name_2}>
                          {this.state.lastName.trim()}
                        </span>
                      </div>

                      <p style={{ color: "black" }}>
                        {this.state.userDesignation}
                      </p>

                      <span class="label label-primary">
                        {this.props.companyName}
                      </span>
                    </div>

                    <div className={classes.details}>
                      <div className={classes.subtotal}>
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                          }}
                        >
                          EMAIL
                        </span>
                        <span style={{ fontWeight: "bold" }}>
                          {this.props.loggedEmail}{" "}
                        </span>
                      </div>
                      <div className={classes.discount}>
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                          }}
                        >
                          MOBILE
                        </span>
                        <span style={{ fontWeight: "bold" }}>
                          {this.state.mobile}
                        </span>
                      </div>
                      <div className={classes.discount}>
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                          }}
                        >
                          HEAD QUATERS HOTLINE
                        </span>
                        <span style={{ fontWeight: "bold" }}>+34476354689</span>
                      </div>
                      <div className={classes.discount}>
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                          }}
                        >
                          COMPLAINS
                        </span>
                        <span style={{ fontWeight: "bold" }}>+34476354689</span>
                      </div>
                    </div>

                    <div className={classes.button} style={{ marginBottom: 5 }}>
                      <button
                        className={classes.button_buy}
                        style={{ background: "black" }}
                      >
                        SEND EMAIL
                      </button>
                    </div>

                    <div className={classes.button}>
                      <button className={classes.button_buy}>VOICE</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-md-8 col-sm-8 contact-right"
              style={{ background: "#f5f5f5" }}
            >
              <div className="form-w3agile">
                <h3 style={{ marginTop: 15 }}>Edit Your Profile</h3>

                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required=" "
                  value={this.state.firstName}
                  onChange={this.onChangeHandler}
                  onClick={this.clearSpace}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required=" "
                  value={this.state.lastName}
                  onChange={this.onChangeHandler}
                  onClick={this.clearSpace}
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  required=" "
                  value={this.props.loggedEmail}
                  onChange={this.onChangeHandler}
                />
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile"
                  required=" "
                  value={this.state.mobile}
                  onChange={this.onChangeHandler}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  required=" "
                  style={{ marginBottom: 30 }}
                  value={this.state.address}
                  onChange={this.onChangeHandler}
                />
                <input
                  type="text"
                  name="Joined Date"
                  placeholder="Joined Date"
                  required=" "
                />

                <div className={classes.imageUpload}>
                  {imgPreview}
                  <input
                    className={classes.fileInput}
                    type="file"
                    style={{ marginBottom: 15 }}
                    name="userImageUrl"
                    onChange={this.uploadSingleFile}
                  />
                </div>

                <div className={classes.send}>
                  <input
                   type="submit" 
                   value="Update"
                   onClick={() => {
                    swal({
                      title: "Done",
                      text: "Profile was Updated",
                      icon: "success",
                    }).then(() => {
                      this.updateMyProfile(this.props.loggedEmail);
                    });
                  }}  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
