import React from "react";

export default function Login() {
  return (
    <div className="login">
      <div className="main-agileits">
        <div className="form-w3agile">
          <h3>Login</h3>
          <form action="#" method="post">

          <div className="key">
              <i className="fa fa-user" aria-hidden="true"></i>
              <input
                type="text"
                name="email"
                required=""
                placeholder="Email"
              />
              <div className="clearfix"></div>
          </div>

          <div className="key">
              <i className="fa fa-lock" aria-hidden="true"></i>
              <input
                type="password"
                name="Password"
                required=""
                placeholder="Password"
              />
              <div className="clearfix"></div>
          </div>

        

            <input type="submit" value="Login" />

          </form>
        </div>
        <div className="forg">
          <a href="#" className="forg-left">
            Forgot Password
          </a>
          <a href="register.html" className="forg-right">
            Register
          </a>
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  );
}
