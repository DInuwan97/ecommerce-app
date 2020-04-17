import React, { Component } from "react";
import ItemTableRow from "./ItemTableRow";

export default class ItemTable extends Component {
  
  render() {
    const { declineItem, approveItem } = this.props;
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">DataTable with default features</h3>
        </div>

        <div className="card-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>id</th>
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
              {this.props.items.map(
                ({
                  _id,
                  itemName,
                  price,
                  Brand,
                  category,
                  isApproved,
                  size,
                 
                }) => {
                  if (!isApproved)
                    return (
                      <ItemTableRow
                        declineItem={declineItem}
                        approveItem = {approveItem}
                        id={_id}
                        itemName={itemName}
                        price={price}
                        Brand={Brand}
                        size={size}
                        category={category}
                      />
                    );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
