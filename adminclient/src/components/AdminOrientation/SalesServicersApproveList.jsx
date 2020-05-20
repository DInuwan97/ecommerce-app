import React, { Component } from 'react';
import DashbordCardPanel from '../DashbordCardPannel/DashobordCardPanel'
import SalesManagerSalesServicersApprovalFunctions from '../DataTables/SalesManagerAccess/SalesManagerFunctions';
export default class SalesServicersApproveList extends Component {
  render() {

    const{companyName,usersList,loggedUserDetails} = this.props;
    return (
      <div>
        <DashbordCardPanel usersList={usersList} loggedUserDetails={loggedUserDetails} itemsList={this.props.itemsList}/>
        <SalesManagerSalesServicersApprovalFunctions companyName={companyName}/>
      </div>
    );
  }
}
