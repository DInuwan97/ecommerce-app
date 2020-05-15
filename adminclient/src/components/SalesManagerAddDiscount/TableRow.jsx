import React from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
export default function ItemTableRow({
  id,
  itemName,
  price,
  category,
  Brand,
  size,
  addedBy,
  discount,
  addDiscount,
}) {
  return (
    <tr>
      <td>{addedBy}</td>
      <td>{itemName}</td>
      <td>Rs. {price}</td>
      <td>{Brand}</td>
      <td>{size}</td>
      <td>{discount}%</td>
      <td>Rs. {(1 - discount*0.01) * price}</td>

      <td>
        <button
          className="btn btn-primary btn-md font-weight-bold"
          onClick={() =>
            swal("Please Enter the Discount:", {
              content: "input",
            }).then((value) => {
              parseFloat(value);
              if (value > 0 && value < 100) {
                swal(`${value}% of discount is Added : ${itemName}`);
                addDiscount(id, value);
              } else if (value < 0 || value > 100) {
                swal({
                  title: "ERROR!",
                  text: "INVALID DISCOUNT",
                  icon: "error",
                  button: "Try again",
                });
              } else {
                swal({
                  title: "ERROR!",
                  text: "INVALID DISCOUNT",
                  icon: "error",
                  button: "Try again",
                });
              }
            })
          }
        ><i class="fas fa-plus"></i> ADD Discount
        </button>
      </td>
    </tr>
  );
}

const style = {
  viewLink: {
    size: "20px",
    color: "white",
    textdecoration: "none",
  },
};
