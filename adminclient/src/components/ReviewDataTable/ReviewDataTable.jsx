import React, { Component } from 'react';
import ReviewRaw from './ReviewTableRow';
import Axios from 'axios';


const $ = require('jquery');
$.DataTable = require('datatables.net');

class ReviewDataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }

    }

    getTableData = () => {
        const url = "/api/review/admin/itemsReviews/";
        const token = localStorage.getItem('userLoginToken');
        if(token){
            Axios.get(url, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }).then(async res => {
                await this.setState({
                    items: res.data.data
                });
                
            });
        }
    }

    componentDidMount = () => {
        this.getTableData();
    }
    componentDidUpdate = ()=>{
        $('#review-table').DataTable()
    }


    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Item Reviews</h3>
                    </div>
                    <div className="card-body">
                        <table id="review-table" className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Item Name</th>
                                    <th>Review Count</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <td>Id              </td>
                                    <td>Item Name       </td>
                                    <td>Review Count    </td>
                                    <td>Actions         </td>
                                </tr> */}
                                {
                                    this.state.items.map((element, index, actions) => (
                                        <ReviewRaw data={element} index={index} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReviewDataTable;