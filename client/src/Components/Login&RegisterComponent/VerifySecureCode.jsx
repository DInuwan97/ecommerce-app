import React, { Component } from 'react';

import swal from 'sweetalert';
import jwt_decode from 'jwt-decode'

export default class VerifySecureCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            reloaded : false,
            secureCode:'',
            token: '',
            email:''
        }

        const redirectForm = this.props.location.redirectForm;
        if(redirectForm == 'verifysecurecode'){
            window.location.reload();
        }

        //console.log("User Token is : " +localStorage)
    }

    componentDidMount() {
        const token= localStorage.usertoken
        //const decoded = jwt_decode(token);

        // this.setState({
        //     email:decoded.email,
        //     toek:this.state.token
        // })
    }


    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onSubmitHandler = e =>{
      
        e.preventDefault()
        this.setState({
            isLoading: true
        });
        // axios({
        //     method: 'post',
        //     url: '/api/users/verify',
        //     headers: { headers: {"Authorization" : `Bearer ${this.state.token}`} },
        //     data:
        //         {
        //             "securecode": this.state.securecode    
        //         }

        // })

        const user = {
            securecode:this.state.securecode
        }

     
       
    }


  render() {
    return (
        <div className="login">
        <div className="main-agileits">
          <div className="form-w3agile">
            <h3>Check Your Mobile</h3>
  
  
          <form onSubmit={this.onSubmitHandler}>
  
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
  
            <input type="submit" value="Verifty" />
            <input type="submit" style={{float:'right'}}value="Resend" />
  
            </form>
  
          </div>
         </div>
      </div>
    );
  }
}
