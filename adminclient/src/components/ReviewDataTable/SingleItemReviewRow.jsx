import React, { Component } from 'react';
import swal from 'sweetalert';
import { Redirect } from 'react-router';

class SingleItemReviewRow extends Component {

    DeleteReview = () => {
        swal("Are you sure?", {
            dangerMode: true,
            buttons: true,
        }).then(res => {
            if (res) {
                this.props.DeleteReview(this.props.commentDocument._id);
            }
        })
    }


    render() {
        const options = {
            month: "long", day: "numeric", year: "numeric",
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: true,
        };
        const date = new Date(Date.parse(this.props.commentDocument.AddedTime));
        const AddedDate = new Intl.DateTimeFormat("en-US", options).format(date);
        return (
            <tr>
                <td>{this.props.commentDocument.reviewMessage}</td>
                <td>{this.props.commentDocument.reviewUserFirstName + " " + this.props.commentDocument.reviewUserLastName}</td>
                <td>{this.props.commentDocument.reviewHelpfulCount}</td>
                <td>{this.props.commentDocument.reviewNotHelpfulCount}</td>
                <td>{AddedDate}</td>
                <td>
                    <div className='btn-group' style={{ width: '100%' }}>
                        <button className='btn btn-info'
                            onClick={() => this.props.goToCompose(this.props.commentDocument)}
                        >
                            Reply
                        </button>
                        <button className='btn btn-danger' onClick={() => this.DeleteReview()}>Delete</button>
                    </div>
                </td>
            </tr>
        );
    }
}

export default SingleItemReviewRow;