import React, { Component } from 'react';
import swal from 'sweetalert';

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
          <button 
          onClick={()=>{
              swal({
                title: "Are you sure?",
                text: "Do you want to approve?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willApprove)=>{
                if(willApprove){

                    swal({
                      icon:"success",
                      text:"Sales Servicer Approved"
                    })
                    .then(()=>{
                      approveSalesServicer(email)
                    })
                }
                else{
                  swal({
                    icon:"warning",
                    text:"Sales Servicer Not Approved",
                    buttons: true,
                  })
                }
              })
           
          }
        }
            class="btn btn-info btn-sm mr-1">
          Approve</button>
          <button class="btn btn-danger btn-sm">Decline</button>
        </td>

        
        
        </tr>
    );
  
}
