import React, { Component, Fragment } from 'react';

class ReviewReplyRow extends Component {
    render() {
        const options = {
            year: "numeric", month: "numeric", day: "numeric",
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: true,
        };
        const date = new Date(Date.parse(this.props.review.adminsReplyTime));
        const AddedDate = new Intl.DateTimeFormat("en-US", options).format(date);
        return (
            <Fragment>
                <tr>
                    <td>{this.props.review._id}</td>
                    <td>{this.props.review.reviewMessage}</td>
                    <td>{this.props.review.adminsReply === "Marked as Reviewed" ? "Marked" :
                        <button className="btn btn-info" data-toggle="modal" data-target="#reply-modal"
                            onClick={() => this.props.triggerReplyModal(this.props.review.adminsReply)}>
                            View Reply
                            </button>
                    }
                    </td>
                    <td>
                        <button className="btn btn-info" data-toggle="modal"
                            data-target="#profile-modal"
                            onClick={()=>this.props.setAdminProfile(this.props.review.repliedAdmin)}>
                            {this.props.review.repliedAdmin}
                        </button>
                    </td>
                    <td>{AddedDate}</td>
                </tr>
            </Fragment>
        );
    }
}

export default ReviewReplyRow;