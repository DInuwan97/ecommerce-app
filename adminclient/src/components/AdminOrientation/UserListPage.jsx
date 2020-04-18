import React from 'react';
import DashbordCardPanel from '../DashbordCardPannel/DashobordCardPanel'
import UserListDataTable from '../DataTables/UserListFunctions';
export default class UserListPage extends React.Component {
  
  render(){

    const{companyName} = this.props;
    return (
    
      <div>
          <DashbordCardPanel/>
          <UserListDataTable companyName={companyName}/>
      </div>
    );
  }

}
