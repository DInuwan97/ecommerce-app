import React, { Component, Fragment } from 'react';
import swal from 'sweetalert';

class ReviewReplyRow extends Component {
    constructor(props) {
        super(props);
        this.state={
            reviewMessage:""
        }
    }
    componentDidMount=()=>{
        if(this.props.review.reviewMessage.length>25){
            this.setState({
                reviewMessage:this.props.review.reviewMessage.slice(0,25)+"..."
            })
        }else{
            this.setState({
                reviewMessage:this.props.review.reviewMessage
            })
        }
    }

    showReview =()=>{
        swal({
            text:this.props.review.reviewMessage,
            title:"Review Message"
        });
    }
    

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
                    <td onClick={()=>this.showReview()}>{this.state.reviewMessage}</td>
                    <td>{this.props.review.adminsReply === "Marked as Reviewed" ? "Marked Only" :
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
                            View Profile
                        </button>
                    </td>
                    <td>{AddedDate}</td>
                </tr>
            </Fragment>
        );
    }
}

export default ReviewReplyRow;