import React, { Component } from 'react'
import {resendEmail} from './UserFunctions';

export default class ResendEmail extends Component {

    constructor(props){
        super(props);
        this.state = {
            email:''
        }
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmitHandler = e =>{
        e.preventDefault()

        const frmData = {
            email : this.state.email
        }

        resendEmail(frmData)
        .then(res =>{
            if(res){
              window.location.replace('/verifysecurecode');
            }
        })

    }


    render() {
        return (
            <div className="login">
        <div className="main-agileits">
          <div className="form-w3agile">
            <h3>Enter Your Email</h3>

  
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
  
            <br/>
            <input type="submit" value="Resned" onClick={this.onSubmitHandler} />

            <div className="forg">
                <a href="/login" className="forg-left" style={{float:'right'}}>
                    Login
                </a>
            </div>
  
         
  
          </div>
         </div>
      </div>
        )
    }
}
