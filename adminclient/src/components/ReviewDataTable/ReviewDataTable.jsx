import React, { Component } from 'react';
import ReviewRaw from './ReviewTableRow';
import Axios from 'axios';


const $ = require('jquery');
$.DataTable = require('datatables.net');

class ReviewDataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            UnasweredReviewCount: 0,
            TotalReviewCount: 0
        }
    }

    getTableData = () => {
        const url = "/api/review/admin/itemsReviews/";
        const token = localStorage.getItem('userLoginToken');
        if (token) {
            Axios.get(url, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }).then(res => {
                let UnasweredReviewCount = 0;
                let TotalReviewCount = 0;
                res.data.data.map((element) => {
                    UnasweredReviewCount += element.count - element.replyCount;
                    TotalReviewCount += element.count;
                });
                this.setState({
                    items: res.data.data,
                    TotalReviewCount,
                    UnasweredReviewCount
                });



            });
        }
    }

    componentDidMount = () => {
        this.getTableData();
    }
    componentDidUpdate = () => {
        $('#review-table').DataTable()
    }


    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-3 col-6">

                        <div className="small-box bg-info">
                            <div className="inner">
                                <h3>{this.state.TotalReviewCount}</h3>

                                <p>All Reviews </p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-email"></i>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6">

                        <div className="small-box bg-success">
                            <div className="inner">
                                <h3>{this.state.UnasweredReviewCount}</h3>

                                <p>Unanswered Reviews</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-email-unread"></i>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6">

                        <div className="small-box bg-warning">
                            <div className="inner">
                                <h3>{this.state.TotalReviewCount - this.state.UnasweredReviewCount}</h3>

                                <p>Answered Reviews</p>
                            </div>
                            <div className="icon">
                                <i class="far fa-envelope-open"></i>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="info-box bg-danger">
                            <span className="info-box-icon"><i className="fas fa-comments" /></span>
                            <div className="info-box-content">
                                <span className="info-box-text">Reply Rate</span>
                                <span className="info-box-number">{this.state.UnasweredReviewCount+" / "+this.state.TotalReviewCount}</span>
                                <div className="progress">
                                    <div className="progress-bar" style={{ width:  this.state.TotalReviewCount !=0  ? 100 - this.state.UnasweredReviewCount / this.state.TotalReviewCount * 100 + "%" : '100%'}} />
                                </div>
                                <span className="progress-description">
                                    {
                                    this.state.TotalReviewCount !=0 ?
                                        "Reply Rate is " + (100 - this.state.UnasweredReviewCount / this.state.TotalReviewCount * 100).toFixed(2) + "%"
                                    :
                                    "Reply Rate is " + "100%"
                                    }
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
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
                                    <th>Reply Count</th>
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