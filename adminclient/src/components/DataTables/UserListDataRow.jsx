import React, { Component } from 'react'

export default function({id,firstName,lastName,email,mobile,adminVerification,company,packageName}) {

        return (
                 <tr>
                  <td>{firstName} {' '} {lastName}</td>
                  <td>{company}</td>
                  <td>{email}</td>
                  <td>{mobile}</td>
                  <td>{packageName}</td>
                  <td>
                    <button class="btn btn-info btn-sm mr-1">Approve</button>
                    <button class="btn btn-danger btn-sm">Decline</button>
                  </td>
                </tr>
      
        )
    
}
