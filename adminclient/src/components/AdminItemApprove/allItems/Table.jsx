import React, { Component } from "react";
import TableRow from "./TableRow";

export default class Table extends Component {
  getRow() {
    return this.props.items.map(({
      _id,
      itemName,
      itemImage,
      price,
      Brand,
      category,
      isApproved,
      size,
      stockQuantity,
    
      addedBy
    }) => {
      if (isApproved)
        return (
          <TableRow
            
            id={_id}
            addedBy={addedBy}
            itemName={itemName}
            itemImage= {itemImage}
            price={price}
            Brand={Brand}
            size={size}
            stockQuantity = {stockQuantity}
            category={category}
            declineItem = {this.props.declineItem}
            
          />
        );
    });
  }

  render() {
   
    return (
      <div className="card ">
        <div className="card-header ">
          <h2 className="card-title ">ITEMS IN THE STORE</h2>
        </div>

        <div className="card-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Added By</th>
                <th>Item Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Size</th>
                <th>Stocks Available</th>
                <th>DELETE</th>
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