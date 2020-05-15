import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import ReviewReplyTableRow from './ReviewReplyRow';
import './ReviewReply.css'


const $ = require('jquery');
$.DataTable = require('datatables.net');



class ReviewReplyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Reviews: [],
            MarkedCount: 0,
            EmailedCount: 0,
            ReviewMsg:""
        }

    }
    componentDidMount = () => {
        this.getReviewReplys()
    }

    getReviewReplys = () => {
        const itemId = this.props.match.params.id;
        const url = `/api/review/admin/getAdminReplies/${itemId}`;
        const token = localStorage.getItem('userLoginToken');
        Axios.get(url, { headers: { Authorization: `bearer ${token}` } }).then(res => {
            let MarkedCount = 0;
            let EmailedCount = 0;
            res.data.forEach((element, index) => {
                if (element.adminsReply == 'Marked as Reviewed') {
                    MarkedCount++;
                } else {
                    EmailedCount++;
                }
                this.setState({
                    Reviews: res.data,
                    MarkedCount,
                    EmailedCount
                });


            })

        }).catch(err => {

        })
    }

    triggerReplyModal=(reply)=>{
        this.setState({
            ReviewMsg:reply
        })
    }

    componentDidUpdate = () => {
        $('#review-reply-table-2').DataTable();
    }
    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Review Replies of Item Name : {this.props.location.state.itemName}</h3>
                    </div>
                    <div className="card-body">
                        <table id="review-reply-table-2" className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Review</th>
                                    <th>Reply</th>
                                    <th>Replied User</th>
                                    <th>Replied Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.Reviews.map((element, index, self) => (
                                        <ReviewReplyTableRow review={element} index={index} 
                                        triggerReplyModal={this.triggerReplyModal}/>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal fade" id="reply-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Reply</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            <p dangerouslySetInnerHTML={{__html: (this.state.ReviewMsg)}} />
                                {/* {this.state.ReviewMsg} */}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ReviewReplyTable);