import React from "react";

export default function itemTableRow({ id,itemName, price, category,Brand,declineItem }) {
  return (
        <tr>
            <td>{id}</td>

            <td>{itemName}</td>
            <td>{price}</td>
            <td>{Brand}</td>
            <td>{category}</td>
            <td><button  className ='btn btn-warning'>Approve This</button></td>
            <td><button   onClick ={ () => declineItem(id)} className ='btn btn-danger'>Decline This</button></td>


        </tr>
    );
}
