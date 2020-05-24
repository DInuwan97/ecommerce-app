import React, { Component } from 'react'
import UserList from './UsersList';
import axios from 'axios';
import swal from 'sweetalert';
export default class UserListFunctions extends Component {


    constructor(props) {
        super(props);
        this.state = {
          userList: [],
          consirmSalesManager: {},
        };
      }
    
      componentDidMount() {

        axios({
            method:'get',
            url:'/api/users/viewusers',
            headers: {
                "Authorization" : "Bearer "+localStorage.getItem('userLoginToken')
            }
        })
        .then((res) => {
          const users = res.data;
          this.setState({
            userList: users,
          });
        });
      }


      approveSalesManagerRequest = (email) => {
         this.setState({
            userList: [...this.state.userList.filter((user) => user.email !== email)],
         });
        axios({
            method:'post',
            url:'/api/users/confirmSalesManager',
            headers: {
                "Authorization" : "Bearer "+localStorage.getItem('userLoginToken')
            },
            data:{
                "email":email
            }
        })
          .then((res) => {
            this.sendEmailToSalesManager(email);
          })
          .catch((err) =>{
            
          });
      };


    deleteSalesManager = (email) =>{
       this.setState({
        userList: [...this.state.userList.filter((user) => user.email !== email)],
       })
       axios({
        method:'delete',
        url:`/api/users/deleteSalesManager/${email}`
        // headers: {
        //     "Authorization" : "Bearer "+localStorage.getItem('userLoginToken')
        // }
      })
      .then((res) => {
      })
      .catch((err) =>{
      });
    }


    sendEmailToSalesManager = (email) => {
      axios({
       method:'post',
       url:'/api/users/admin/sendMail/',
       headers: {
        "Authorization" : "Bearer "+localStorage.getItem('userLoginToken')
       },
       data:{
         msg:"CONGRATULATIONS!!! Admin has been approved the Your Connetion Request on  joining with Fashion Club.",
         to:email,
         subject:"Fashion Club - Salas Manager Approval Statement"
       }
      })
      .then(res=>{
        console.log(res);
      })
      .catch(err=>{
        console.log(err);
      })
    }
      
    render() {
        const { companyName } = this.props;
        return (
           <UserList users={this.state.userList} deleteSalesManager = {this.deleteSalesManager} approveSalesManagerRequest = {this.approveSalesManagerRequest} companyName={companyName}/>
        )
    }
}
