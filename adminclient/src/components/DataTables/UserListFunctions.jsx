import React, { Component } from 'react'
import UserList from './UsersList';
import axios from 'axios';
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
      
    render() {
        return (
           <UserList users={this.state.userList}/>
        )
    }
}
