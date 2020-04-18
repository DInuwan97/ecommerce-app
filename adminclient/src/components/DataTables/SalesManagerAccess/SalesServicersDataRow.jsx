import React, { Component } from 'react';

export default function SalesServicersDataRow({id,
  firstName,
  lastName,
  email,
  mobile,
  company,
  packageName,
  approveSalesServicer}) {

    return (
        <tr>

        <td>{firstName} {' '} {lastName}</td>
        <td>{email}</td>
        <td>{mobile}</td>
        <td>{company}</td>
        <td>
          <button class="btn btn-info btn-sm mr-1">Approve</button>
          <button class="btn btn-danger btn-sm">Decline</button>
        </td>
        
        </tr>
    );
  
}
