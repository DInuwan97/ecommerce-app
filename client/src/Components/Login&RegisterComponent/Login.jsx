import React, { Component } from "react";
import { login } from "./UserFunctions";
import { browserHistory } from "react-router";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      reloaded: false,
    };
  }

  componentWillMount() {
    localStorage.removeItem("usertoken");
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({
      isLoading: true,
    });

    const frmData = {
      email: this.state.email,
      password: this.state.password,
    };

    login(frmData).then((res) => {
      if (res) {
        window.location.replace("/");
      }
    });
  };

  render() {
    return (
      <div className="login">
        <div className="main-agileits">
          <div className="form-w3agile">
            <h3>Login</h3>
            <form onSubmit={this.onSubmitHandler}>
              <div className="key">
                <i className="fa fa-user" aria-hidden="true"></i>
                <input
                  type="text"
                  name="email"
                  required=""
                  placeholder="Email"
                  onChange={this.onChangeHandler}
                />
                <div className="clearfix"></div>
              </div>

              <div className="key">
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

              <input
                style={{ marginTop: "2rem" }}
                type="submit"
                value="Login"
              />
            </form>
          </div>
          <div className="forg">
            <a href="/forgotpassword" className="forg-left">
              Forgot Password
            </a>
            <a href="/register" className="forg-right">
              Register
            </a>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    );
  }
}
