import React, { Component } from "react";
import {register} from './UserFunctions';
import {addCompany} from './UserFunctions';
import axios from 'axios';
export default class Register extends Component {


  constructor(props){
    super(props);
    this.state = {
      userType : '',
      company:'',
      companyList:[],
      packageName:'',
      packageList:[]
    }
  }


  componentDidMount(){
    this.getCompanies();
    this.getPackages();
  }


  onChangeHandler = e =>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }


  onSubmitHandler = e =>{
    
    e.preventDefault();

    const frmData = {
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      email:this.state.email,
      mobile:this.state.mobile,
      userType:this.state.userType,
      company:this.state.company,
      packageName:this.state.packageName,
      password:this.state.password
    }
    const token = register(frmData)
    .then(res =>{
        if(res){
            this.props.history.push(`/verifysecurecode`)
        }
       
    })

    const resultCompanyRegistation = addCompany(frmData);

  }


  getCompanies =() =>{
    axios({
      method:'get',
      url:`api/companies/view`
    })
    .then(res=>{
      let com = res.data;

      this.setState({
        companyList:com,
        company:com.companyName
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }

  getPackages =() =>{
    axios({
      method:'get',
      url:`api/packages/view`
    })
    .then(res=>{
      let pack = res.data;

      this.setState({
        packageList:pack,
        packageName:pack.packageName
      })
    })
    .catch(err=>{
      console.log(err);
    })
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
                value={this.state.firstName}
                onChange={this.onChangeHandler}
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
                onChange={this.onChangeHandler}
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
                onChange={this.onChangeHandler}
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
                onChange={this.onChangeHandler}
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



            { ((this.state.userType === 'SalesManager') || (this.state.userType === 'Admin') ) &&

            <div>         
            <div className="key">
            <i className="fa fa-university" style={{paddingLeft:8}}aria-hidden="true"></i>
                  <input
                    type="text"
                    name="company"
                    required=""
                    placeholder="Company"
                    onChange={this.onChangeHandler}
                  />
                    <div className="clearfix"></div>
            </div>


            <select className="form-control form-control-lg" style={{height:40,marginBottom:20}} name="packageName" required="" onChange={this.onChangeHandler}>

                <option value="">Select the Package</option>
                {this.state.packageList.map((pack) => (
                    <option value={pack.packageName}>{pack.packageName}</option>
                  ))}

            </select>

            </div>

            }


            {
              (this.state.userType === 'SalesServicer') &&
              <select className="form-control form-control-lg" style={{height:40,marginBottom:20}} name="company" required="" onChange={this.onChangeHandler}>

                <option value="">Select the Company</option>

                  {this.state.companyList.map((com) => (
                    <option value={com.companyName}>{com.companyName}</option>
                  ))}
                         

            

              </select>

      

            
            }

          



            <div className="key">
              <i className="fa fa-lock" aria-hidden="true"></i>
              <input
                type="password"
                name="password"
                required=""
                placeholder="Password"
                onChange={this.onChangeHandler}
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
