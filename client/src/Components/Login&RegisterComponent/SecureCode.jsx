import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import swal from 'sweetalert';
export default class SecureCode extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            reloaded : false,
            email:'',
        }

        const redirectForm = this.props.location.redirectForm;
        if(redirectForm == 'verifysecurecode'){
            window.location.reload();
        }

    
    }

    componentDidMount(){
        
    if (localStorage.getItem("forgotPwd") !== null) {
        const token = localStorage.getItem("forgotPwd");
        const decoded = jwt_decode(token);
        this.setState({
          email: decoded.email,
        })
  
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
            secureCode : this.state.secureCode
        }


     
        axios({
            method: 'post',
            url: `/api/users/enterSecureCode/${this.state.email}`,
            data:{
                "secureKey":this.state.secureCode
            }
        })
        .then(res =>{
            swal({
                title: "Done",
                text: "Verified Successfully!",
                icon: "success",
                buttons: {
                    confirm: {
                        text: "Change Passwords",
                        value: true,
                        visible: true,
                        closeModal: true
                    }
                }
            }).then(value=>{
                if(value){
                    this.props.history.push('/changePasswords');
                }
            })
        })
        .catch(err=>{
          if(err.response.status === 404){
                swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Incorrect Secure Code!!!',
                    footer: 'OK'
                  })
            }
        })

      
    }

    
    render() {
        return (
            <div className="login">
            <div className="main-agileits">
              <div className="form-w3agile">
                <h3>Check Your Mobile</h3>
      
      
              
      
                <div className="key">
                    <i className="fa fa-shield" aria-hidden="true"></i>
                    <input
                      type="text"
                      name="secureKey"
                      required=""
                      placeholder="Secureity Code"
                      onChange={this.onChangeHandler}
                    />
                    <div className="clearfix"></div>
                </div>
    
                <br/>
      
                <input type="submit" value="Verifty" onClick={this.onSubmitHandler}/>
    
      
                <input type="submit" style={{float:'right'}}value="Resend" onClick='/login'/>
     
         
                <div className="forg">
                    <a href="/ResendEmail" className="forg-left" style={{float:'right'}}>
                       Resend Email
                    </a>
                </div>
               
      
              </div>
             </div>
          </div>
        )
    }
}
