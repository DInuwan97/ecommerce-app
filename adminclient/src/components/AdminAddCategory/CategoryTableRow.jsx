import React from "react";

export default function CategoryTableRow({ id,categoryName, code, genderType,deleteCategory,updateCategory }) {
  return (
    <tr>
      <td>{categoryName}</td>
      <td>{code}</td>
      <td>{genderType}</td>
      <td><button className='btn btn-warning' onClick = {() => updateCategory(id)}>Update</button></td>
      <td><button className='btn btn-danger' onClick = {() => deleteCategory(id)}>Danger</button></td>

    </tr>
  );
}
