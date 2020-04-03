import React, { Component } from "react";

export default class Register extends Component {


  constructor(props){
    super(props);
    this.state = {
      userrType : ''
    }
  }


  onChangeHandler = e =>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }


  onSubmitHandler = e =>{
    e.preventDefault();

    const frmData = new FormData();

        frmData.set("userType", this.state.userType);
  }
  
  render(){
  return (
    <div className="login" >


      <div className="main-agileits" >
        <div className="form-w3agile">
          <h3>Register</h3>

          <form onSubmit={this.onSubmitHandler}>

            <div className="key">
              <i className="fa fa-user" aria-hidden="true"></i>
              <input
                type="text"
                name="firstName"
                required=""
                placeholder="First Name"
              />
              <div className="clearfix"></div>
            </div>

            <div className="key">
              <i className="fa fa-user" aria-hidden="true"></i>
              <input
                type="text"
                name="lastName"
                required=""
                placeholder="Last Name"
              />
              <div className="clearfix"></div>
            </div>



            <div className="key">
              <i className="fa fa-envelope" style={{paddingLeft:8}} aria-hidden="true"></i>
              <input
                type="text"
                name="email"
                required=""
                placeholder="Email"
              />
              <div className="clearfix"></div>
            </div>


            <div className="key">
              <i className="fa fa-phone-square" aria-hidden="true"></i>
              <input
                type="text"
                name="mobile"
                required=""
                placeholder="Mobile"
              />
              <div className="clearfix"></div>
            </div>



         

              <div className="input-group mb-3" style={{width:'100%', height:30, marginBottom:20}}>
                  
              <select className="form-control form-control-lg" style={{height:40}} name="userType" required="" onChange={this.onChangeHandler}>

                        <option value="">Select the User Type</option>
                        <option value="Customer">Customer</option>  
                        <option value="SalesManager">SalesManager</option>      
                        <option value="SalesServicer">SalesServicer</option> 
                        <option value="Admin">Admin</option>  

              </select>
        

              <div className="clearfix"></div>
            </div>



            { (this.state.userType === 'SalesManager') &&

            <div>         
            <div className="key">
            <i className="fa fa-university" style={{paddingLeft:8}}aria-hidden="true"></i>
                  <input
                    type="text"
                    name="Company"
                    required=""
                    placeholder="Company"
                  />
                    <div className="clearfix"></div>
            </div>


            <select className="form-control form-control-lg" style={{height:40,marginBottom:20}} name="compantType" required="" >

                <option value="">Select the Package</option>
                <option value="Platinum">Platinum</option>  
                <option value="Gold">Gold</option>      
                <option value="Silver">Silver</option> 
                <option value="Bronze">Bronze</option>  

            </select>

            </div>

            }


            {
              (this.state.userType === 'SalesServicer') &&
              <select className="form-control form-control-lg" style={{height:40,marginBottom:20}} name="compantType" required="" >

                <option value="">Select the Company</option>
                <option value="ODEL">ODEL</option>  
                <option value="Thilakawardhene">Thilakawardhene</option>      
                <option value="House of Fashion">House of Fashion</option> 
                <option value="Kandy">Kandy</option>  

              </select>
            }



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

            <div className="key">
              <i className="fa fa-lock" aria-hidden="true"></i>
              <input
                type="password"
                name="Confirm Password"
                required=""
                placeholder="Confirm Password"
              />
              <div className="clearfix"></div>
            </div>

            <input type="submit" value="Register" />
          </form>



        </div>
      </div>



      </div>


     

  );
  }
}
