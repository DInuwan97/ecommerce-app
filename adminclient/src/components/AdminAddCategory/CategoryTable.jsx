import React, { Component } from "react";
import TableRow from './CategoryTableRow'
export default class CategoryTable extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Category Code</th>
                <th>Gender</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
               {this.props.categories.map(({categoryName,code,genderType}) => (
                   <TableRow categoryName = {categoryName} code = {code} genderType = {genderType}/>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
