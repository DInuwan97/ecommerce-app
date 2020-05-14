import React, { Component } from 'react'

import UserListDataRow from './UserListDataRow';

const $ = require('jquery');
$.DataTable = require('datatables.net');

export default class UsersList extends Component {


    render() {
      const { approveSalesManagerRequest,companyName } = this.props;
        return (
            <div className="card">
            <div className="card-header">
              <h3 className="card-title">DataTable with default features</h3>
            </div>
           
            <div className="card-body">

              <table id="example1" className="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>Username</th>
                  <th>Company</th>
                  <th>email</th>
                  <th>Mobile</th>
                  <th>Package</th>
                  <th>Verification</th>
                </tr>
                </thead>

                <tbody>
               
                {this.props.users.map(
                ({ 
                  _id,
                  firstName,
                  lastName,
                  email,
                  mobile,
                  isAdmin,
                  isSalesManager,
                  isSalesServicer,
                  isCustomer,
                  salasManagerVerification,
                  adminVerification,
                  secureKeyVerifyStatus,
                  company,
                  packageName
                 }) => {
                   if((isSalesManager) && (secureKeyVerifyStatus) && (!adminVerification)){
                          //  if(company === companyName){
                   return(
                    <UserListDataRow
                      id={_id}
                      firstName={firstName}
                      lastName={lastName}
                      email={email}
                      mobile={mobile}
                      key={_id}
                      isAdmin = {isAdmin}
                      isSalesManager= {isSalesManager}
                      isSalesServicer = {isSalesServicer}
                      isCustomer = {isCustomer}
                      salasManagerVerification = {salasManagerVerification}
                      secureKeyVerifyStatus = {secureKeyVerifyStatus}
                      adminVerification = {adminVerification}
                      company = {company}
                      packageName = {packageName}
                      approveSalesManagerRequest = {approveSalesManagerRequest}
                    />
                   )
                            //}
                   }
                 }
              )}


                      

                </tbody>

              </table>
            </div>
           
          </div>
        )
    }
}
