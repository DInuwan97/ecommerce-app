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
          console.log(users);
          this.setState({
            userList: users,
          });
        });
        console.log(this.state.user);
      }


      approveSalesManagerRequest = (email) => {
        console.log('approveSalesManagerRequest is',email);
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
            console.log(res) 
          })
          .catch((err) =>{
            
          });
      };
      
    render() {

        const { companyName } = this.props;
        console.log('Logged user Company is : ',companyName);
        return (
           <UserList users={this.state.userList} approveSalesManagerRequest = {this.approveSalesManagerRequest} companyName={companyName}/>
        )
    }
}
