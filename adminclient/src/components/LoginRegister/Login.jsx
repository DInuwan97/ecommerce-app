import React, { Component } from 'react'
import { login }  from './UserFucntions';
import swal from 'sweetalert';

export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            reloaded : false,
          }
    }

    componentWillMount() {
        localStorage.removeItem('usertoken');
    }
    
    
    onChangeHandler = e =>{
        this.setState({
          [e.target.name] : e.target.value
        })
    }
    
    onSubmitHandler = e =>{

        e.preventDefault()
        this.setState({
            isLoading: true
        });
    
        const frmData = {
          email:this.state.email,
          password:this.state.password
        }
    
    
        login(frmData)
        .then(res =>{

            if(res){
              console.log('Login Res is :', res.token);
              if(res.isSalesManager === true || res.isAdmin === true){
                window.location.replace('/home');
              }else{
                swal({
                  title: "Oops!!!",
                  text: "Your are Not Authorized to Admin Panel",
                  icon: "error",
                  button: true,
                })
              }
             
            }
        })
    
    }


    render() {
        return (

            <div className="hold-transition login-page">
            <div className="login-box">
  <div className="login-logo">
    <a href="../../index2.html"><b>Admin</b>LTE</a>
  </div>

  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg">Sign in to start your session</p>

      <form onSubmit={this.onSubmitHandler}>
        <div className="input-group mb-3">
          <input type="email"
            name="email"
           className="form-control" 
           placeholder="Email"
           required=""
           onChange={this.onChangeHandler}/>

          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" 
          className="form-control" 
          placeholder="Password"
          name="password"
          required=""
          onChange={this.onChangeHandler}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="icheck-primary">
              <input type="checkbox" id="remember"/>
              <label for="remember">
                Remember Me
              </label>
            </div>
          </div>
          
          <div className="col-4">
            <input type="submit" className="btn btn-primary btn-block" value="Login"/>
          </div>
         
        </div>
      </form>

      <div className="social-auth-links text-center mb-3">
        <p>- OR -</p>
        <a href="#" className="btn btn-block btn-primary">
          <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
        </a>
        <a href="#" className="btn btn-block btn-danger">
          <i className="fab fa-google-plus mr-2"></i> Sign in using Google+
        </a>
      </div>
    

      <p className="mb-1">
        <a href="forgot-password.html">I forgot my password</a>
      </p>
      <p className="mb-0">
        <a href="register.html" className="text-center">Register a new membership</a>
      </p>
    </div>
   
  </div>
</div>
</div>
        )
    }
}
