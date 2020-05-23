import React, { Component } from "react";
import { register } from "./UserFunctions";
import { addCompany } from "./UserFunctions";
import axios from "axios";
export default class Register extends Component {
  //WL - warning list

  constructor(props) {
    super(props);
    this.state = {
      userType: "",
      company: "",
      companyList: [],
      packageName: "",
      packageList: [],
    };
  }

  componentDidMount() {
    const userTypeField = document.getElementById("userType");
    //const packageNameField = document.getElementById("packageName");
    userTypeField.style.marginTop = "2.8rem";
    //packageNameField.style.marginTop = "2rem";

    this.getCompanies();
    this.getPackages();
  }

  onChangeHandler = (e) => {
    let value = e.target.value;
    const fnameField = document.getElementById("fname");
    const lnameField = document.getElementById("lname");
    const emailField = document.getElementById("email");
    const mobileField = document.getElementById("mobile");
    const userTypeField = document.getElementById("userType");
    const companySAField = document.getElementById("company_SA");
    const packageNameField = document.getElementById("packageName");
    const companySField = document.getElementById("company_S");
    const pwdField = document.getElementById("pwd");
    const cPwdField = document.getElementById("cPwd");

    const fnameWL = document.getElementById("fnameWL");
    const lnameWL = document.getElementById("lnameWL");
    const emailWL = document.getElementById("emailWL");
    const mobileWL = document.getElementById("mobileWL");
    const userTypeWL = document.getElementById("userTypeWL");
    const companySAWL = document.getElementById("companySAWL");
    const packageNameWL = document.getElementById("packageNameWL");
    const companySWL = document.getElementById("companySWL");
    const pwdWL = document.getElementById("pwdWL");
    const cPwdWL = document.getElementById("cPwdWL");

    switch (e.target.name) {
      case "firstName":
        this.checkFieldEmpty(
          fnameField,
          value,
          fnameWL,
          "First name is required"
        );
        break;

      case "lastName":
        this.checkFieldEmpty(
          lnameField,
          value,
          lnameWL,
          "Last name is required"
        );
        break;

      case "email":
        this.checkFieldEmpty(emailField, value, emailWL, "Email is required");

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          if (emailField.style.border != "1px solid red") {
            emailField.style.border = "1px solid #ccc";
            this.removeWarning(emailWL, "Invalid email");
          }
        } else {
          emailField.style.border = "1px solid red";
          this.addWarning(emailWL, "Invalid email");
        }
        break;

      case "mobile":
        this.checkFieldEmpty(
          mobileField,
          value,
          mobileWL,
          "Mobile number is required"
        );

        break;

      case "userType":
        break;

      case "company":
        break;

      case "company_S":
        break;

      case "password":
        this.checkFieldEmpty(pwdField, value, pwdWL, "Password is required");
        break;

      case "Confirm Password":
        this.checkFieldEmpty(
          cPwdField,
          value,
          cPwdWL,
          "Password confirmation is required"
        );
        break;

      default:
        console.log("no field match");
    }

    this.setState({
      [e.target.name]: value,
    });
  };

  checkFieldEmpty = (field, value, warningList, warning) => {
    if (value.length == 0 || value == undefined) {
      field.style.border = "1px solid red";
      this.addWarning(warningList, warning);
    } else {
      field.style.border = "1px solid #ccc";
      this.removeWarning(warningList, warning);
    }
  };

  addWarning = (warningList, warning) => {
    let hasNode = false;
    warningList.querySelectorAll("*").forEach((n) => {
      if (n.innerHTML.toString() == warning) {
        hasNode = true;
      }
    });
    if (!hasNode) {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(warning));
      warningList.appendChild(li);
    }
  };

  removeWarning = (warningList, warning) => {
    let hasNode = false;
    warningList.querySelectorAll("*").forEach((n) => {
      if (n.innerHTML == warning) {
        hasNode = true;
      }
    });
    if (hasNode) {
      warningList.innerHTML = "";
    }
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    const frmData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      mobile: this.state.mobile,
      userType: this.state.userType,
      company: this.state.company,
      packageName: this.state.packageName,
      password: this.state.password,
    };
    const token = register(frmData).then((res) => {
      if (res) {
        this.props.history.push(`/verifysecurecode`);
      }
    });

    const resultCompanyRegistation = addCompany(frmData);
  };

  getCompanies = () => {
    axios({
      method: "get",
      url: `api/companies/view`,
    })
      .then((res) => {
        let com = res.data;

        this.setState({
          companyList: com,
          company: com.companyName,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getPackages = () => {
    axios({
      method: "get",
      url: `api/packages/view`,
    })
      .then((res) => {
        let pack = res.data;

        this.setState({
          packageList: pack,
          packageName: pack.packageName,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="login">
        <div className="main-agileits">
          <div className="form-w3agile">
            <h3>Register</h3>

            <form onSubmit={this.onSubmitHandler}>
              <div id="fname" className="key">
                <i className="fa fa-user" aria-hidden="true"></i>
                <input
                  type="text"
                  name="firstName"
                  required=""
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={this.onChangeHandler}
                />
                <div className="clearfix"></div>
              </div>
              <ul
                id="fnameWL"
                style={{
                  listStyle: "none",
                  color: "red",
                  paddingLeft: "1rem",
                  fontSize: "1.2rem",
                }}
              ></ul>

              <div id="lname" className="key">
                <i className="fa fa-user" aria-hidden="true"></i>
                <input
                  type="text"
                  name="lastName"
                  required=""
                  placeholder="Last Name"
                  onChange={this.onChangeHandler}
                />
                <div className="clearfix"></div>
              </div>
              <ul
                id="lnameWL"
                style={{
                  listStyle: "none",
                  color: "red",
                  paddingLeft: "1rem",
                  fontSize: "1.2rem",
                }}
              ></ul>

              <div id="email" className="key">
                <i
                  className="fa fa-envelope"
                  style={{ paddingLeft: 8 }}
                  aria-hidden="true"
                ></i>
                <input
                  type="text"
                  name="email"
                  required=""
                  placeholder="Email"
                  onChange={this.onChangeHandler}
                />
                <div className="clearfix"></div>
              </div>
              <ul
                id="emailWL"
                style={{
                  listStyle: "none",
                  color: "red",
                  paddingLeft: "1rem",
                  fontSize: "1.2rem",
                }}
              ></ul>

              <div id="mobile" className="key">
                <i className="fa fa-phone-square" aria-hidden="true"></i>
                <input
                  type="text"
                  name="mobile"
                  required=""
                  placeholder="Mobile"
                  onChange={this.onChangeHandler}
                />
                <div className="clearfix"></div>
              </div>
              <ul
                id="mobileWL"
                style={{
                  listStyle: "none",
                  color: "red",
                  paddingLeft: "1rem",
                  fontSize: "1.2rem",
                }}
              ></ul>

              <div
                id="userType"
                className="input-group"
                style={{
                  width: "100%",
                  height: 30,
                }}
              >
                <select
                  className="form-control form-control-lg"
                  style={{ height: 40 }}
                  name="userType"
                  required=""
                  onChange={this.onChangeHandler}
                >
                  <option value="">Select the User Type</option>
                  <option value="Customer">Customer</option>
                  <option value="SalesManager">SalesManager</option>
                  <option value="SalesServicer">SalesServicer</option>
                  <option value="Admin">Admin</option>
                </select>
                <div className="clearfix"></div>
              </div>
              <ul
                id="userTypeWL"
                style={{
                  listStyle: "none",
                  color: "red",
                  paddingLeft: "1rem",
                  fontSize: "1.2rem",
                }}
              ></ul>

              {(this.state.userType === "SalesManager" ||
                this.state.userType === "Admin") && (
                <div style={{ marginTop: "2.8rem" }}>
                  <div className="key">
                    <i
                      className="fa fa-university"
                      style={{ paddingLeft: 8 }}
                      aria-hidden="true"
                    ></i>
                    <input
                      id="company_SA"
                      type="text"
                      name="company"
                      required=""
                      placeholder="Company"
                      onChange={this.onChangeHandler}
                    />
                    <ul
                      id="companySAWL"
                      style={{
                        listStyle: "none",
                        color: "red",
                        paddingLeft: "1rem",
                        fontSize: "1.2rem",
                      }}
                    ></ul>
                    <div className="clearfix"></div>
                  </div>

                  <select
                    id="packageName"
                    className="form-control form-control-lg"
                    style={{ height: 40, marginTop: "2.8rem" }}
                    name="packageName"
                    required=""
                    onChange={this.onChangeHandler}
                  >
                    <option value="">Select the Package</option>
                    {this.state.packageList.map((pack) => (
                      <option value={pack.packageName}>
                        {pack.packageName}
                      </option>
                    ))}
                  </select>
                  <ul
                    id="packageNameWL"
                    style={{
                      listStyle: "none",
                      color: "red",
                      paddingLeft: "1rem",
                      fontSize: "1.2rem",
                    }}
                  ></ul>
                </div>
              )}

              {this.state.userType === "SalesServicer" && (
                <div>
                  <select
                    id="company_S"
                    className="form-control form-control-lg"
                    style={{ height: 40, marginTop: "2.8rem" }}
                    name="company"
                    required=""
                    onChange={this.onChangeHandler}
                  >
                    <option value="">Select the Company</option>

                    {this.state.companyList.map((com) => (
                      <option value={com.companyName}>{com.companyName}</option>
                    ))}
                  </select>
                  <ul
                    id="companySWL"
                    style={{
                      listStyle: "none",
                      color: "red",
                      paddingLeft: "1rem",
                      fontSize: "1.2rem",
                    }}
                  ></ul>
                </div>
              )}

              <div id="pwd" className="key">
                <i className="fa fa-lock" aria-hidden="true"></i>
                <input
                  type="password"
                  name="password"
                  required=""
                  placeholder="Password"
                  onChange={this.onChangeHandler}
                />
                <div className="clearfix"></div>
              </div>
              <ul
                id="pwdWL"
                style={{
                  listStyle: "none",
                  color: "red",
                  paddingLeft: "1rem",
                  fontSize: "1.2rem",
                }}
              ></ul>

              <div id="cPwd" className="key">
                <i className="fa fa-lock" aria-hidden="true"></i>
                <input
                  type="password"
                  name="Confirm Password"
                  required=""
                  placeholder="Confirm Password"
                  onChange={this.onChangeHandler}
                />
                <div className="clearfix"></div>
              </div>
              <ul
                id="cPwdWL"
                style={{
                  listStyle: "none",
                  color: "red",
                  paddingLeft: "1rem",
                  fontSize: "1.2rem",
                }}
              ></ul>

              <input
                style={{ marginTop: "2em" }}
                type="submit"
                value="Register"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
