import React, { Component } from 'react';
import Axios from 'axios';
import ContactUsDTrow from './ContactusDTRow';
import swal from 'sweetalert';
const $ = require('jquery');
$.DataTable = require('datatables.net');

class ContactusDT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repliedCount: 0,
            totalCount: 0,
            replyRate: 100,
            notRepliedCount: 0,
            messages: [],
            showReply: ""
        }
    }

    getMessages = () => {
        const url = '/api/contactus/';
        const token = localStorage.getItem('userLoginToken');
        if (token) {
            Axios.get(url, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }).then(async res => {
                let repliedCount = 0;
                let totalCount = res.data.data.length;
                await res.data.data.forEach(element => {
                    if (element.replied) {
                        repliedCount++;
                    }
                });
                let notRepliedCount = totalCount - repliedCount;
                let replyRate;
                if (totalCount != 0)
                    replyRate = ((repliedCount / totalCount) * 100).toFixed(2);
                else
                    replyRate = 100
                await this.setState({
                    notRepliedCount,
                    replyRate,
                    repliedCount,
                    totalCount,
                    messages: res.data.data
                })
                $('#message-table').DataTable();
            }).catch(err => {

            })
        }
    }

    componentDidMount = () => {
        this.getMessages();
    }

    // componentDidUpdate=()=>{
    //     $('#message-table').DataTable();
    // }

    showReply = (index) => {

        this.setState({
            showReply: this.state.messages[index].reply
        })
    }

    deleteReply = (id) => {
        const url = `/api/contactus/delete/${id}`;
        const token = localStorage.getItem('userLoginToken');
        if (!token) {
            swal({
                title: 'Error!',
                text: 'Login/Signup to Delete Messages',
                icon: 'error'
            })
        } else {
            swal({
                title: "Confirm",
                text: "Delete this message?",
                dangerMode: true,
                buttons: {
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
            }).then(value => {
                if (value) {
                    Axios.delete(url, {
                        headers: {
                            Authorization: `bearer ${token}`
                        }
                    }).then(res => {
                        this.getMessages();
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
                    });
                }
            })

        }

    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-3 col-6">

                        <div className="small-box bg-info">
                            <div className="inner">
                                <h3>{this.state.totalCount}</h3>

                                <p>All Messages </p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-email"></i>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6">

                        <div className="small-box bg-success">
                            <div className="inner">
                                <h3>{this.state.notRepliedCount}</h3>

                                <p>Not Replied Messages</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-email-unread"></i>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6">

                        <div className="small-box bg-warning">
                            <div className="inner">
                                <h3>{this.state.repliedCount}</h3>

                                <p>Replied Messages</p>
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
                                <span className="info-box-number">{this.state.repliedCount + " / " + this.state.totalCount}</span>
                                <div className="progress">
                                    <div className="progress-bar" style={{ width: this.state.totalCount != 0 ? this.state.replyRate * 100 + "%" : '100%' }} />
                                </div>
                                <span className="progress-description">
                                    {
                                        this.state.TotalReviewCount != 0 ?
                                            "Reply Rate is " + this.state.replyRate + "%"
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
                        <h3 className="card-title">Messages</h3>
                    </div>
                    <div className="card-body">
                        <table id="message-table" className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Added On</th>
                                    <th>Name</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Phone Number</th>
                                    <th>Email</th>
                                    <th>Replied</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.messages.map((element, index, self) => (
                                        <ContactUsDTrow message={element} showReply={this.showReply}
                                            deleteReply={this.deleteReply} index={index} />
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
                                <p dangerouslySetInnerHTML={{ __html: (this.state.showReply) }} />
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

export default ContactusDT;