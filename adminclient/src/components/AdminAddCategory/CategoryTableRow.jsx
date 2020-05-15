import React from "react";

export default function CategoryTableRow({ id,categoryName, code, genderType,deleteCategory,updateCategory }) {
  return (
    <tr>
      <td>{categoryName}</td>
      <td>{code}</td>
      <td>{genderType}</td>
      <td><button className='btn btn-warning btn-md font-weight-bold' onClick = {() => updateCategory(id)}><i class="fas fa-edit"></i> Update</button></td>
      <td><button className='btn btn-danger btn-md font-weight-bold' onClick = {() => deleteCategory(id)}><i class="fas fa-trash-alt"></i> Delete</button></td>

    </tr>
  );
}
