import React from "react";
import swal from "sweetalert";
import {Link} from 'react-router-dom'
export default function TableRow({
  id,
  itemName,
  price,
  category,
  itemImage,
  Brand,
  declineItem,
 
  size,
  stockQuantity,
  addedBy,
}) {
  return (
    <tr>
      <td>{addedBy}</td>
      <td><img src={itemImage} style = {style.img}/></td>
      <td>{itemName}</td>
      <td>{price}</td>
      <td>{Brand}</td>
      <td>{size}</td>
      <td>{stockQuantity}</td>
      <td>
        <button
          onClick={() =>
            swal({
              title: "Are you sure?",
              text: "Do you want to Decline this item",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then((willDelete) => {
              if (willDelete) {
                swal("The item has been Declined", {
                  icon: "success",
                }).then(() => declineItem(id));
              } else {
                swal("The Item is Not Yet Declined");
              }
            })
          }
          className="btn btn-danger btn-md font-weight-bold"
        >
          <i class="fas fa-trash-alt"></i> Decline
        </button>
      </td>
    </tr>
  );
}


const style = {
  viewLink : {
    size : '20px',
    color : 'white',
    textdecoration : 'none'
  },
  img : {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '5px',
    width: '150px'
  }
}
