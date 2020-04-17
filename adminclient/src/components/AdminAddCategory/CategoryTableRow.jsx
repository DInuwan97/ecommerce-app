import React from "react";

export default function CategoryTableRow({ categoryName, code, genderType }) {
  return (
    <tr>
      <td>{categoryName}</td>
      <td>{code}</td>
      <td>{genderType}</td>
      <td><button className='btn btn-warning'>Update</button></td>
      <td><button className='btn btn-danger'>Danger</button></td>

    </tr>
  );
}
