import React, { Component } from 'react'

export default class ResendEmail extends Component {
    render() {
        return (
            <div className="login">
        <div className="main-agileits">
          <div className="form-w3agile">
            <h3>Enter Your Email</h3>
  
  
          <form onSubmit={this.onSubmitHandler}>
  
            <div className="key">
                <i className="fa fa-shield" aria-hidden="true"></i>
                <input
                  type="text"
                  name="email"
                  required=""
                  placeholder="Your Email"
                  onChange={this.onChangeHandler}
                />
                <div className="clearfix"></div>
            </div>
  
            <input type="submit" value="Resned" />

            <div className="forg">
                <a href="/login" className="forg-left" style={{float:'right'}}>
                    Login
                </a>
            </div>
  
            </form>
  
          </div>
         </div>
      </div>
        )
    }
}
