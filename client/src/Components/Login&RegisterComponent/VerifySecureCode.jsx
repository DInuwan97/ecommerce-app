import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
//import jwt_decode from 'jwt-decode'



export default class VerifySecureCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            reloaded : false,
            email:'',
            secureCode:''
        }

        console.log("Localstoragetoken : " +localStorage.getItem('usertoken'));
        const redirectForm = this.props.location.redirectForm;
        if(redirectForm == 'verifysecurecode'){
            window.location.reload();
        }

        this.setState({
            secureCode:localStorage.getItem('usertoken')
        })


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

        console.log("Verify Token is : " +localStorage.getItem('usertoken'))
        console.log("Form data is : "+this.state.secureCode);

     
        axios({
            method: 'post',
            url: '/api/users/verify',
            headers: {
                "Authorization" : "Bearer "+localStorage.getItem('usertoken')
            },
            data:{
                "secureCode":this.state.secureCode
            }
        })
        .then(res =>{
            swal({
                title: "Congratulations!",
                text: "Verified Successfully!",
                icon: "success",
                buttons: {
                    confirm: {
                        text: "Back to Login",
                        value: true,
                        visible: true,
                        closeModal: true
                    }
                }
            }).then(value=>{
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
                    text: 'Re-activate Security Key...',
                    footer: 'OK'
                  })
            }else if(err.response.status === 404){
                swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Incorrect Secure Code!!!',
                    footer: 'OK'
                  })
            }
        })

        const user = {
            secureCode:this.state.secureCode
        }

     
       
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
                  name="secureCode"
                  required=""
                  placeholder="Secureity Code"
                  onChange={this.onChangeHandler}
                />
                <div className="clearfix"></div>
            </div>
  
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
    );
  }
}
