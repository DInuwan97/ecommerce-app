import React, { Component } from 'react'
import swal from "sweetalert";
export default function({id,
    firstName,
    lastName,
    email,
    mobile,
    adminVerification,
    company,
    packageName,
    approveSalesManagerRequest}) {

    
        return (
                 <tr>
                  <td>{firstName} {' '} {lastName}</td>
                  <td>{company}</td>
                  <td>{email}</td>
                  <td>{mobile}</td>
                  <td>{packageName}</td>
                {
                (()=>{
                    if(adminVerification){
                        return(
                        <td>
                            <button class="btn btn-info btn-sm mr-1">Approve</button>
                            <button class="btn btn-danger btn-sm">Decline</button>
                        </td>
                        )
                    }else{
                        return(
                        <td>
                            <button class="btn btn-info btn-sm mr-1">Approve</button>
                            <button class="btn btn-danger btn-sm">Decline</button>
                        </td>
                        )
                    }
                }
                )}

                    <td>
                            <button 
                              onClick={() =>
                                swal({
                                  title: "Are you sure?",
                                  text: "Do you want to approve?",
                                  icon: "warning",
                                  buttons: true,
                                  dangerMode: true,
                                })
                                .then((willApprove) => {
                                  if (willApprove) {

                                    swal("The Sales Manager has been Approved", {
                                      icon: "success",
                                    }).then(() => {

                                    approveSalesManagerRequest(email)
                                    this.history.push(`/salesManagerapprove`)
                                    })
                                
                                  } else {
                                    swal("The Sales Manager Not Yet Approved");
                                  }
                                })
                              }
                             class="btn btn-info btn-sm mr-1">
                                 Approve
                            </button>
                            <button class="btn btn-danger btn-sm">Decline</button>
                        </td>
                </tr>
      
        )
    
}
