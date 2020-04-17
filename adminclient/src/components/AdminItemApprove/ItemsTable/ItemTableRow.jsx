import React from "react";
import swal from "sweetalert";
export default function ItemTableRow({
  id,
  itemName,
  price,
  category,
  Brand,
  declineItem,
  approveItem,
  size,
}) {
  return (
    <tr>
      <td>{id}</td>
      <td>{itemName}</td>
      <td>{price}</td>
      <td>{Brand}</td>
      <td>{size}</td>
      <td>{category}</td>
      <td>
        <button
          onClick={() =>
            swal({
              title: "Are you sure?",
              text: "Do you want to approve this item",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then((willApprove) => {
              if (willApprove) {
                swal("The item has been Approved", {
                  icon: "success",
                }).then(() => approveItem(id));
              } else {
                swal("The Item is Not Yet Approved");
              }
            })
          }
          className="btn btn-warning"
        >
          Approve This
        </button>
      </td>
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
          className="btn btn-danger"
        >
          Decline This
        </button>
      </td>
    </tr>
  );
}
