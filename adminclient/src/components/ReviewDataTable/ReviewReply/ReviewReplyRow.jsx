import React, { Component, Fragment } from 'react';

class ReviewReplyRow extends Component {
    render() {
        const options = {
            month: "long", day: "numeric", year: "numeric",
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
                    <td>
                        <button className="btn btn-info" data-toggle="modal" data-target="#reply-modal"
                            onClick={() => this.props.triggerReplyModal(this.props.review.adminsReply)}>
                            View Reply
                            </button>
                    </td>
                    <td>{this.props.review.repliedAdmin}</td>
                    <td>{AddedDate}</td>
                </tr>
            </Fragment>
        );
    }
}

export default ReviewReplyRow;