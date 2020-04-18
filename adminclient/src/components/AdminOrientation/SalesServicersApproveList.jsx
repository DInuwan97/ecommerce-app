import React, { Component } from 'react';
import DashbordCardPanel from '../DashbordCardPannel/DashobordCardPanel'
import SalesManagerSalesServicersApprovalFunctions from '../DataTables/SalesManagerAccess/SalesManagerFunctions';
export default class SalesServicersApproveList extends Component {
  render() {

    const{companyName} = this.props;
    return (
      <div>
        <DashbordCardPanel/>
        <SalesManagerSalesServicersApprovalFunctions companyName={companyName}/>
      </div>
    );
  }
}
