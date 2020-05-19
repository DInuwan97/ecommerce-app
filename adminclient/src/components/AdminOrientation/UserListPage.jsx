import React from 'react';
import DashbordCardPanel from '../DashbordCardPannel/DashobordCardPanel'
import UserListDataTable from '../DataTables/UserListFunctions';
export default class UserListPage extends React.Component {
  
  render(){

    const{companyName,usersList,loggedUserDetails,getNoOfSalesManagersToBeApprove} = this.props;
    return (
    
      <div>
          <DashbordCardPanel usersList={usersList} loggedUserDetails={loggedUserDetails}/>
          <UserListDataTable companyName={companyName} /*getNoOfSalesManagersToBeApprove={getNoOfSalesManagersToBeApprove}*/ />
      </div>
    );
  }

}
