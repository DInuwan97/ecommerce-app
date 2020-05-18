import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import ReviewReplyTableRow from './ReviewReplyRow';
import './ReviewReply.css'
import swal from 'sweetalert';
import JwtDecode from 'jwt-decode';


const $ = require('jquery');
$.DataTable = require('datatables.net');



class ReviewReplyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Reviews: [],
            MarkedCount: 0,
            EmailedCount: 0,
            ReviewMsg: "",
            reviweAdminFirstName: "",
            reviweAdminLastName: "",
            reviweAdminImage: "",
            reviewAdminPosition: "",
            reviewAdminCompany: "",
            reviewAdminMail: ""
        }
    } componentDidMount = () => {
        this.getReviewReplys();
    }

    getReviewReplys = () => {
        const itemId = this.props.match.params.id;
        const url = `/api/review/admin/getAdminReplies/${itemId}`;
        const token = localStorage.getItem('userLoginToken');
        Axios.get(url, { headers: { Authorization: `bearer ${token}` } }).then(async res => {
            let MarkedCount = 0;
            let EmailedCount = 0;
            await res.data.forEach((element, index) => {
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

    triggerReplyModal = (reply) => {
        this.setState({
            ReviewMsg: reply
        })
    }

    componentDidUpdate = () => {
        $('#review-reply-table-2').DataTable();
    }

    sendEmailToAdmin = () => {
        if (this.state.reviewAdminMail != "") {
            this.props.history.push({
                pathname: '/compose',
                state: {
                    to: this.state.reviewAdminMail,
                    cc: "",
                    bcc: "",
                    subject: "Regarding a Review Reply",
                    msg: ""
                }
            })
        }
    }

    setAdminProfile = (id) => {

        const url = `/api/review/admin/viewuser/${id}`;
        const token = localStorage.getItem('userLoginToken');
        Axios.get(url, { headers: { Authorization: `bearer ${token}` } }).then(res => {
            if (res) {
                const user = JwtDecode(res.data.data);
                let designation = "Customer";
                if (user.data.isAdmin) {
                    designation = "Admin";
                } else if (user.data.isSalesManager) {
                    designation = "Sales Manager";
                } else if (user.data.isSalesServicer) {
                    designation = "Sales Servicer";
                }
                this.setState({
                    reviweAdminFirstName: user.data.firstName,
                    reviweAdminLastName: user.data.lastName,
                    reviweAdminImage: user.data.userImageUrl,
                    reviewAdminPosition: designation,
                    reviewAdminCompany: user.data.company,
                    reviewAdminMail: user.data.email
                })


            }
        }).catch(err => {
            this.setState({
                reviweAdminFirstName: "Error!",
                reviweAdminImage: "https://res.cloudinary.com/dsuhs6bf5/image/upload/v1589621741/zehopwq1wkhq1fjfctza.png",
                reviewAdminPosition: err.message,
                reviweAdminLastName: "",
                reviewAdminPosition: "",
                reviewAdminCompany: "",
                reviewAdminMail: ""
            })
        })

    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-3 col-6">

                        <div className="small-box bg-info">
                            <div className="inner">
                                <h3>{this.state.Reviews.length}</h3>

                                <p>All Reviews </p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-email"></i>
                            </div>
                        </div>
                    </div>

                    {/* <div className="col-lg-3 col-6">

                        <div className="small-box bg-success">
                            <div className="inner">
                                <h3>{this.state.UnansweredCount}</h3>

                                <p>Unanswered Reviews</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-email-unread"></i>
                            </div>
                        </div>
                    </div> */}

                    <div className="col-lg-3 col-6">

                        <div className="small-box bg-warning">
                            <div className="inner">
                                <h3>{this.state.MarkedCount}</h3>

                                <p>Marked Reviews</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-android-checkmark-circle"></i>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6">

                        <div className="small-box bg-danger">
                            <div className="inner">
                                <h3>{this.state.EmailedCount}</h3>

                                <p>Replied Reviews</p>
                            </div>
                            <div className="icon">
                                <i class="far fa-envelope-open"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="info-box bg-success">
                            <span className="info-box-icon"><i class="fa fa-share-square"></i></span>
                            <div className="info-box-content">
                                <span className="info-box-text">Reply Rate</span>
                                <span className="info-box-number">{this.state.EmailedCount + " /" + this.state.Reviews.length}</span>
                                <div className="progress">
                                    <div className="progress-bar" style={{ width: this.state.Reviews.length != 0 ? ((this.state.EmailedCount / this.state.Reviews.length) * 100).toFixed(2) : '100%' }} />
                                </div>
                                <span className="progress-description">
                                    {this.state.Reviews.length != 0 ? ((this.state.EmailedCount / this.state.Reviews.length) * 100).toFixed(2) : "100"}% Reply Rate
                            </span>
                            </div>
                            {/* /.info-box-content */}
                        </div>
                        {/* /.info-box */}
                    </div>

                </div>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">{this.props.location.state ? "Review Replies of Item Name :" + this.props.location.state.itemName : "Review Replies"}</h3>
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
                                            triggerReplyModal={this.triggerReplyModal}
                                            setAdminProfile={this.setAdminProfile}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal fade" id="reply-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div class="modal-dialog" id="reply-modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Reply</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" id="reply-modal-body">
                                <p dangerouslySetInnerHTML={{ __html: (this.state.ReviewMsg) }} />
                                {/* {this.state.ReviewMsg} */}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="profile-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Profile</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="card card-primary">
                                    <div className="card-body box-profile">
                                        <div className="text-center">
                                            {
                                                this.state.reviweAdminImage ?
                                                    <img src={this.state.reviweAdminImage} alt='' style={{ width: '160px', height: '160px', borderRadius: '100px' }} />

                                                    :
                                                    <div alt='' style={{ width: '160px', height: '160px', borderRadius: '100px', backgroundColor: 'white' }} />
                                            }
                                        </div>

                                        <h3 className="profile-username text-center">
                                            {this.state.reviweAdminFirstName} {this.state.reviweAdminLastName}
                                        </h3>

                                        <p className="text-muted text-center">
                                            {this.state.reviewAdminPosition}
                                        </p>
                                        <center>
                                            <p class="badge badge-warning">
                                                {this.state.reviewAdminCompany}
                                            </p>
                                        </center>
                                    </div>

                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" onClick={() => this.sendEmailToAdmin()} class="btn btn-secondary" data-dismiss="modal">Send Email</button>
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