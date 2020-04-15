import React from 'react';
import DashbordCardPanel from '../DashbordCardPannel/DashobordCardPanel'
import UserListDataTable from '../DataTables/UsersList';
export default function UserListPage() {
  return (
    <div>
        <DashbordCardPanel/>
        <UserListDataTable/>
    </div>
  );
}
