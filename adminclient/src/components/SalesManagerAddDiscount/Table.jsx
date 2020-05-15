import React, { Component } from "react";
import TableRow from "./TableRow";

export default class Table extends Component {
  getRow() {
    return this.props.items.map(
      ({
        _id,
        itemName,
        price,
        Brand,
        category,
        isApproved,
        size,
        discount,
        addedBy,
      }) => {
        if (isApproved)
          return (
            <TableRow
              id={_id}
              addedBy={addedBy}
              itemName={itemName}
              price={price}
              Brand={Brand}
              size={size}
              category={category}
              discount={discount}
              addDiscount = {this.props.addDiscount}
            />
          );
      }
    );
  }

  render() {
    return (
      <div className="card ">
        <div className="card-header ">
          <h2 className="card-title ">ITEMS TO ADD DISCOUNT</h2>
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
                {/* <th>Category</th> */}
                <th>Discount</th>
                <th>New Price</th>
                <th>Add Discount</th>
              </tr>
            </thead>
            <tbody>{this.getRow()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
