import React, { Component } from "react";
import TableRow from './itemTableRow'
export default class ItemTable extends Component {
  render() {
    return (
      <table class="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Item Name</th>
            <th scope="col">Price</th>    
            <th scope="col">Brand</th>
            <th scope="col">Category</th>
            <th scope="col">Approve</th>
            <th scope="col">Decline</th>

          </tr>
        </thead>
        <tbody>
          {this.props.items.map(({_id,itemName,price,Brand,category}) => (
            <TableRow id = {_id} itemName = {itemName} price = {price} Brand = {Brand} category = {category}/>
          ))}
        </tbody>
      </table>
    );
  }
}
