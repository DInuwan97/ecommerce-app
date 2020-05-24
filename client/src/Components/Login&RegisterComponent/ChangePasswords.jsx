import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import swal from 'sweetalert';
export default class ChangePasswords extends Component {


    constructor(props){
        super(props);
        this.state = {
            newPassword:'',
            confirmPassword:'',
            email:''
        }
    }

    componentDidMount(){
        
        if (localStorage.getItem("forgotPwd") !== null) {
            const token = localStorage.getItem("forgotPwd");
            const decoded = jwt_decode(token);
            this.setState({
              email:decoded.user.email
            })
      
        }
    }


    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    changeUserPassword = () => {
        axios({
          method: "patch",
          url: `/api/users/changePasswordForgot/${this.state.email}`,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("forgotPwd"),
          },
          data: {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            confirmPassword: this.state.confirmPassword,
            token:localStorage.getItem("forgotPwd")
          },
        }).then(res=>{
            swal({
                icon:'success',
                title:'Done',
                text:'Passwords Changed',
                buttons: {
                    confirm: {
                        text: "Back to Login",
                        value: true,
                        visible: true,
                        closeModal: true
                    }
                }
            })
            .then(value=>{
                if(value){
                    this.props.history.push('/login');
                }
            })
        })
        .catch(err=>{
            if(err.response.status === 403){
                swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Passwords are not matching!!!',
                    footer: 'OK'
                  })
            }
        });
      };

  render() {
    return (
        <div className="login">
        <div className="main-agileits">
          <div className="form-w3agile">
            <h3>Change Password</h3>
  
  
          
  
            <div className="key">
     
                <input
                  type="password"
                  name="newPassword"
                  required=""
                  placeholder="Enter New Password"
                  onChange={this.onChangeHandler}
                />
                <div className="clearfix"></div>
            </div>

            
            <div className="key">
     
                <input
                  type="password"
                  name="confirmPassword"
                  required=""
                  placeholder="Confirm Your Password"
                  onChange={this.onChangeHandler}
                />
                <div className="clearfix"></div>
            </div>

            <br/>
  
            <input type="submit" value="Confirm" onClick={this.changeUserPassword} />

  

 
     
            <div className="forg">
                <a href="/Register" className="forg-left" style={{float:'right'}}>
                  Register
                </a>
            </div>
           
  
          </div>
         </div>
      </div>
    );
  }
}
