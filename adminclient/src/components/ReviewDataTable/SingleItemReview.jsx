import React, { Component } from 'react';
import Axios from 'axios';
import SingleItemRow from './SingleItemReviewRow';
import swal from 'sweetalert';

const $ = require('jquery');
$.DataTable = require('datatables.net');

let dtable;
class SingleItemReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            UnansweredCount: 0,
            MarkedAsCheckedCount: 0,
            RepliedCount: 0
        }
    }


    componentDidMount = () => {
        this.getData();
    }


    getData = () => {
        const { id } = this.props.match.params;
        const url = `/api/review/${id}`;
        // const url = `/api/review/${id}`;
        Axios.get(url).then(async res => {
            await this.setState({
                reviews: res.data.CommentDocuments
            })
            dtable = $('#review-table-2').DataTable(
                //     {
                //     "order": [[ 5, "desc" ]]
                // }
            )
            let UnansweredCount = 0;
            let MarkedAsCheckedCount = 0;
            let RepliedCount = 0;
            res.data.CommentDocuments.forEach((element) => {
                if (!element.didAdminReplied) {
                    UnansweredCount++;
                }
                if (element.adminsReply === "Marked as Reviewed") {
                    MarkedAsCheckedCount++;
                }
                if (element.adminsReply !== "Marked as Reviewed" && element.didAdminReplied) {
                    RepliedCount++;
                }
            });
            this.setState({
                UnansweredCount,
                MarkedAsCheckedCount,
                RepliedCount,
            })


        }).catch(err => {
            console.log(err);
        })
    }

    deleteReview = async (reviewId) => {
        const token = localStorage.getItem('userLoginToken');
        const { id } = this.props.match.params;
        const url = `/api/Review/deleteReviewComment/${id}`
        if (token) {
            await Axios.delete(url, {
                headers: {
                    Authorization: `bearer ${token}`
                },
                data: {
                    reviewID: reviewId,
                    adminAccess: true
                }
            }).then(res => {
                this.getData();
                swal({
                    title: "Status",
                    text: res.data.msg,
                    icon: 'success'
                });
            }).catch(err => {
                swal({
                    title: "Error!",
                    text: err.message,
                    icon: 'error'
                });
            })
        } else {
            swal({
                title: "Error!",
                text: "Login/Signup to Perform actions",
                icon: "error"
            });
        }
    }

    goToCompose = (data) => {
        const token = localStorage.getItem('userLoginToken');

        if (token) {
            this.props.history.push(
                '/compose',
                {
                    to: data.reviewerEmail,
                    msg: `Your Review : ${data.reviewMessage}`,
                    subject: `Regarding the Review on our item`,
                    cc: "",
                    bcc: "",
                    reviewId: data._id
                })
        } else {
            swal({
                title: "Error!",
                text: "Login/Signup to reply to reviews",
                icon: 'error'
            })
        }
    }

    MarkAsRead = (id) => {
        const url = `/api/review/admin/markAsRead/${id}`;
        Axios.patch(url, "", {
            headers: {
                Authorization: `bearer ${localStorage.getItem('userLoginToken')}`
            }
        }).then(res => {
            swal({
                text: res.data.msg,
                title: "Status",
                icon: 'success'
            });
            this.getData();
        }).catch(err => {
            swal({
                title: "Error!",
                text: err.response.data.msg,
                icon: 'error'
            });
        });
    }


    goToRepliedReviews = () => {
        const id = this.props.match.params.id;
        swal({
            title:'Redirect',
            text:'Do you want to see the review replys?',
            buttons:{
                cancel: {
                    text: "No",
                    value: null,
                    visible: true,
                    className: "",
                    closeModal: true,
                  },
                  confirm: {
                    text: "Yes",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: true
                  }
            }
        }).then(value=>{
            if(value){
                this.props.history.push({
                    pathname: `/ReviewReplies/${id}`,
                })
            }
        })
        
    }


    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-3 col-6">

                        <div className="small-box bg-info">
                            <div className="inner">
                                <h3>{this.state.reviews.length}</h3>

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
                                <h3>{this.state.UnansweredCount}</h3>

                                <p>Unanswered Reviews</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-email-unread"></i>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6">

                        <div className="small-box bg-warning" onClick={() => this.goToRepliedReviews()}>
                            <div className="inner">
                                <h3>{this.state.MarkedAsCheckedCount}</h3>

                                <p>Marked Reviews</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-android-checkmark-circle"></i>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6" onClick={() => this.goToRepliedReviews()}>

                        <div className="small-box bg-danger">
                            <div className="inner">
                                <h3>{this.state.RepliedCount}</h3>

                                <p>Replied Reviews</p>
                            </div>
                            <div className="icon">
                                <i class="far fa-envelope-open"></i>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Reviews for Item</h3>
                    </div>
                    <div className="card-body">
                        <table id="review-table-2" className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Review</th>
                                    <th>User</th>
                                    <th>Likes</th>
                                    <th>Dislikes</th>
                                    <th>Added</th>
                                    <th>Reviewed</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.reviews.map((element, index, actions) => (
                                        <SingleItemRow commentDocument={element} index={index}
                                            DeleteReview={this.deleteReview}
                                            goToCompose={this.goToCompose}
                                            MarkAsRead={this.MarkAsRead} />
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

export default SingleItemReview;