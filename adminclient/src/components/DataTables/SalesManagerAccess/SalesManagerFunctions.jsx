import React, { Component } from 'react';
import SalesServicersList from './SalesServicersList';

import axios from 'axios';


const $ = require('jquery');
$.DataTable = require('datatables.net');
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
          this.setState({
            salesServicersList: users,
          });
          $('#salesServicersList-table').DataTable()
        });
      }

      approveSalesServicer = (email) => {
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
         })
         .catch(err=>{
         });
      }


      deleteSalesServicer = (email) =>{
         this.setState({
          salesServicersList: [...this.state.salesServicersList.filter((user) => user.email !== email)]
         })
         axios({
          method:'delete',
          url:`/api/users/deleteSalesManager/${email}`,
          headers: {
              "Authorization" : "Bearer "+localStorage.getItem('userLoginToken')
          }
        })
        .then((res) => {
        })
        .catch((err) =>{
        });
      }
        

  render() {
    const { companyName } = this.props;
    return (
        <SalesServicersList users={this.state.salesServicersList} deleteSalesServicer={this.deleteSalesServicer} approveSalesServicer = {this.approveSalesServicer} companyName={companyName}/>
    );
  }
}
