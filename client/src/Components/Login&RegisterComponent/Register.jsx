import React, { Component } from "react";
import { register } from "./UserFunctions";
import { addCompany } from "./UserFunctions";
import axios from "axios";
export default class Register extends Component {
  //WL - warning list

  constructor(props) {
    super(props);
    this.state = {
      companyList: [],
      packageName: "",
      packageList: [],

      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      userType: "",
      company: "",
      packageName: "",
      password: "",
      cPassword: "",
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
        this.setState({
          firstName: value,
        });
        break;

      case "lastName":
        this.checkFieldEmpty(
          lnameField,
          value,
          lnameWL,
          "Last name is required"
        );
        this.setState({
          lastName: value,
        });
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
        this.setState({
          email: value,
        });
        break;

      case "mobile":
        this.checkFieldEmpty(
          mobileField,
          value,
          mobileWL,
          "Mobile number is required"
        );

        if (value[0] == "0") {
          value = "";
        }

        if (value.length < 9) {
          mobileField.style.border = "1px solid red";
          this.addWarning(mobileWL, "Please follow the format-: 7********");
        } else {
          if (mobileField.style.border != "1px solid red") {
            mobileField.style.border = "1px solid #ccc";
          }
          this.removeWarning(mobileWL, "Please follow the format-: 7********");
        }

        if (!isNaN(value)) {
          this.setState({
            mobile: value,
          });
        }

        break;

      case "userType":
        this.checkFieldEmpty(
          userTypeField,
          value,
          userTypeWL,
          "Please select a user type"
        );

        if (
          (this.state.userType == "SalesManager" && value == "Admin") ||
          (this.state.userType == "Admin" && value == "SalesManager")
        ) {
          this.setState({
            userType: value,
          });
        } else {
          this.setState({
            userType: value,
            packageName: undefined,
            company: "",
          });
        }

        break;

      case "company_SA":
        this.checkFieldEmpty(
          companySAField,
          value,
          companySAWL,
          "Please select a company"
        );

        this.setState({
          company: value,
        });
        break;

      case "packageName":
        this.checkFieldEmpty(
          packageNameField,
          value,
          packageNameWL,
          "Please select a package"
        );
        this.setState({
          packageName: value,
        });
        break;

      case "company_S":
        this.checkFieldEmpty(
          companySField,
          value,
          companySWL,
          "Company name is required"
        );
        this.setState({
          company: value,
        });
        break;

      case "password":
        console.log(cPwdField.value);
        console.log(value);
        this.checkFieldEmpty(pwdField, value, pwdWL, "Password is required");

        if (value == this.state.cPassword) {
          cPwdField.style.border = "1px solid #ccc";
          this.removeWarning(cPwdWL, "Passwords do not match");
        } else {
          cPwdField.style.border = "1px solid red";
          this.addWarning(cPwdWL, "Passwords do not match");
        }

        this.setState({
          password: value,
        });
        break;

      case "Confirm Password":
        this.checkFieldEmpty(
          cPwdField,
          value,
          cPwdWL,
          "Password confirmation is required"
        );

        if (value != this.state.password) {
          cPwdField.style.border = "1px solid red";
          this.addWarning(cPwdWL, "Passwords do not match");
        } else {
          if (cPwdField.style.border != "1px solid red") {
            cPwdField.style.border = "1px solid #ccc";
          }
          this.removeWarning(cPwdWL, "Passwords do not match");
        }

        this.setState({ cPassword: value });
        break;

      default:
        console.log("no field match");
    }
  };

  checkFieldEmpty = (field, value, warningList, warning) => {
    if (value == undefined || value == "" || value.length == 0) {
      field.style.border = "1px solid red";
      this.addWarning(warningList, warning);
    } else {
      field.style.border = "1px solid #ccc";
      this.removeWarning(warningList, warning);
    }
  };

  checkAllFiedsEmpty = () => {
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

    this.checkFieldEmpty(
      fnameField,
      this.state.firstName,
      fnameWL,
      "First name is required"
    );
    this.checkFieldEmpty(
      lnameField,
      this.state.lastName,
      lnameWL,
      "Last name is required"
    );
    this.checkFieldEmpty(
      emailField,
      this.state.email,
      emailWL,
      "Email is required"
    );
    this.checkFieldEmpty(
      mobileField,
      this.state.mobile,
      mobileWL,
      "Mobile number is required"
    );
    this.checkFieldEmpty(
      userTypeField,
      this.state.userType,
      userTypeWL,
      "Please select a user type"
    );
    this.checkFieldEmpty(
      pwdField,
      this.state.password,
      pwdWL,
      "Password is required"
    );
    this.checkFieldEmpty(
      cPwdField,
      this.state.cPassword,
      cPwdWL,
      "Password confirmation is required"
    );

    if (
      this.state.userType == "SalesManager" ||
      this.state.userType == "Admin"
    ) {
      this.checkFieldEmpty(
        companySAField,
        this.state.company,
        companySAWL,
        "Please select a company"
      );
      this.checkFieldEmpty(
        packageNameField,
        this.state.packageName,
        packageNameWL,
        "Please select a package"
      );
    }
    if (this.state.userType == "SalesServicer") {
      this.checkFieldEmpty(
        companySField,
        this.state.company,
        companySWL,
        "Company name is required"
      );
    }

    let isValid = true;

    if (
      this.state.firstName.trim().length == 0 ||
      this.state.lastName.trim().length == 0 ||
      this.state.email.trim().length == 0 ||
      this.state.mobile.length == 0 ||
      this.state.userType == "" ||
      this.state.userType == undefined ||
      this.state.password.trim().length == 0 ||
      this.state.cPassword.trim().length == 0 ||
      emailField.style.border == "1px solid red" ||
      mobileField.style.border == "1px solid red" ||
      pwdField.style.border == "1px solid red" ||
      cPwdField.style.border == "1px solid red"
    ) {
      isValid = false;
    }

    if (
      this.state.userType == "SalesManager" ||
      this.state.userType == "Admin"
    ) {
      if (
        companySAField.style.border == "1px solid red" ||
        packageNameField.style.border == "1px solid red" ||
        this.state.packageName == undefined ||
        this.state.company.trim().length == 0
      ) {
        isValid = false;
      }
    }
    if (this.state.userType == "SalesServicer") {
      if (companySField.style.border == "1px solid red") {
        isValid = false;
      }
    }

    return isValid;
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

    // check all fields
    if (this.checkAllFiedsEmpty()) {
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
      console.log("submited");
      const token = register(frmData).then((res) => {
        if (res) {
          this.props.history.push(`/verifysecurecode`);
        }
      });
      const resultCompanyRegistation = addCompany(frmData);
    } else {
      return;
    }
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
                  value={this.state.lastName}
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
                  value={this.state.email}
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
                  maxLength="9"
                  required=""
                  value={this.state.mobile}
                  placeholder="Mobile ex-: 7********"
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
                  <div id="company_SA" className="key">
                    <i
                      className="fa fa-university"
                      style={{ paddingLeft: 8 }}
                      aria-hidden="true"
                    ></i>
                    <input
                      type="text"
                      name="company_SA"
                      required=""
                      placeholder="Company"
                      value={this.state.company}
                      onChange={this.onChangeHandler}
                    />
                    <div className="clearfix"></div>
                  </div>
                  <ul
                    id="companySAWL"
                    style={{
                      listStyle: "none",
                      color: "red",
                      paddingLeft: "1rem",
                      fontSize: "1.2rem",
                    }}
                  ></ul>

                  <select
                    id="packageName"
                    className="form-control form-control-lg"
                    style={{ height: 40, marginTop: "2.8rem" }}
                    name="packageName"
                    required=""
                    onChange={this.onChangeHandler}
                  >
                    <option value="">Select the Package</option>
                    {this.state.packageList.map((pack, index) => (
                      <option key={index} value={pack.packageName}>
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
                    name="company_S"
                    required=""
                    onChange={this.onChangeHandler}
                  >
                    <option value="">Select the Company</option>

                    {this.state.companyList.map((com, index) => (
                      <option key={index} value={com.companyName}>
                        {com.companyName}
                      </option>
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
                  value={this.state.password}
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
                  value={this.state.cPassword}
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
