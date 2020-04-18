import React, { Component } from 'react';
import SalesServicersList from './SalesServicersList';

import axios from 'axios';

export default class SalesManagerFunctions extends Component {

    
      constructor(props) {
        super(props);
            this.state = {
            salesServicersList: []
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
            salesServicersList: users,
          });
        });
        //console.log(this.state.user);
      }

      approveSalesServicer = (email) => {
        console.log('Sales Servicer Email : ',email);
        this.setState({
            salesServicersList: [...this.state.salesServicersList.filter((user) => user.email !== email)],
         });
         axios({
             method:'patch',
             url:`/api/users/confirmSalesServicer/${email}`,
             headers:{
                "Authorization" : "Bearer "+localStorage.getItem('userLoginToken')
             }
         })
         .then(res=>{
             console.log(res);
         })
         .catch(err=>{
            console.log(err)
         });
      }

  render() {
    const { companyName } = this.props;
    console.log('Logged user Company is : ',companyName);
    return (
        <SalesServicersList users={this.state.salesServicersList} approveSalesServicer = {this.approveSalesServicer} companyName={companyName}/>
    );
  }
}
