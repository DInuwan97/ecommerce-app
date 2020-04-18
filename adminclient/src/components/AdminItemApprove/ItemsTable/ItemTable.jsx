import React, { Component } from "react";
import ItemTableRow from "./ItemTableRow";

export default class ItemTable extends Component {
  getRow() {
    return this.props.items.map(({
      _id,
      itemName,
      price,
      Brand,
      category,
      isApproved,
      size,
      addedBy
    }) => {
      if (!isApproved)
        return (
          <ItemTableRow
            
            id={_id}
            addedBy={addedBy}
            itemName={itemName}
            price={price}
            Brand={Brand}
            size={size}
            category={category}
            declineItem = {this.props.declineItem}
            approveItem = {this.props.approveItem}
          />
        );
    });
  }

  render() {
   
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">DataTable with default features</h3>
        </div>

        <div className="card-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Added By</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Size</th>
                <th>Category</th>
                <th>Approve</th>
                <th>Decline</th>
              </tr>
            </thead>
            <tbody>
              {this.getRow()}

            </tbody>
            
          </table>
        </div>
      </div>
    );
  }
}



// {this.props.items.map(
//   ({
//     _id,
//     itemName,
//     price,
//     Brand,
//     category,
//     isApproved,
//     size,
//   }) => {
//     if (!isApproved)
//       return (
//         <ItemTableRow
//           declineItem={declineItem}
//           approveItem={approveItem}
//           id={_id}
//           itemName={itemName}
//           price={price}
//           Brand={Brand}
//           size={size}
//           category={category}
//         />
//       );
//   }
// )}