import React, { Component } from 'react'
import {forgotPassword} from './UserFunctions';
export default class ForgotPassword extends Component {

    
    constructor(props){
        super(props);
        this.state = {
            email:'',
            mobile:''
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
            email:this.state.email,
            mobile : this.state.mobile
        }

        forgotPassword(frmData)
        .then(res =>{
            if(res){
              window.location.replace('/securekey');
            }
        })

    }


    render() {
        return (
                 <div className="login">
        <div className="main-agileits">
          <div className="form-w3agile">
            <h3>Forgot Password</h3>
  
  
          
  
            <div className="key">
     
                <input
                  type="text"
                  name="email"
                  required=""
                  placeholder="Enter Email"
                  onChange={this.onChangeHandler}
                />
                <div className="clearfix"></div>
            </div>

            
            <div className="key">
     
                <input
                  type="text"
                  name="mobile"
                  required=""
                  placeholder="Enter Mobile"
                  onChange={this.onChangeHandler}
                />
                <div className="clearfix"></div>
            </div>

            <br/>
  
            <input type="submit" value="Confirm" onClick={this.onSubmitHandler}/>

  

 
     
            <div className="forg">
                <a href="/Register" className="forg-left" style={{float:'right'}}>
                  Register
                </a>
            </div>
           
  
          </div>
         </div>
      </div>
        )
    }
}
