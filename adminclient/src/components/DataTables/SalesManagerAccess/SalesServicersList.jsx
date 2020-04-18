import React, { Component } from 'react';
import SalesServicersDataRow from './SalesServicersDataRow';

export default class SalesServicersList extends Component {
  render() {

    const {  approveSalesServicer,companyName } = this.props;

    return (
        <div className="card">
        <div className="card-header">
          <h3 className="card-title">New Sales Servicers</h3>
        </div>
       
        <div className="card-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
            <tr>
              <th>Username</th>
              <th>email</th>
              <th>Mobile</th>
              <th>Company</th>
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
                  }) =>{
                      if((isSalesServicer) && (secureKeyVerifyStatus)){
                        if(company === companyName){
                        return(
                        <SalesServicersDataRow
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
                            company = {company}
                            packageName = {packageName}
                            approveSalesServicer = {approveSalesServicer}
                        />
                        )
                        }
   
                      }
                  }
                )}
           
            


                  

            </tbody>

          </table>
        </div>
       
      </div>
    );
  }
}
