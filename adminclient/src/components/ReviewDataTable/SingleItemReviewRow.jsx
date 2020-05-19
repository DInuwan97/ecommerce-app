import React, { Component } from 'react';
import swal from 'sweetalert';
import { Redirect } from 'react-router';
import Axios from 'axios';

class SingleItemReviewRow extends Component {
    constructor(props) {
        super(props);
        this.state={
            reviewMessage:""
        }
    }
    

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

    showReview=()=>{
        swal({
            title:"Review Message",
            text:this.props.commentDocument.reviewMessage
        });
    }

    componentDidMount=()=>{
        if(this.props.commentDocument.reviewMessage.length>25){
            this.setState({
                reviewMessage:this.props.commentDocument.reviewMessage.slice(0,25)+"..."
            })
        }else{
            this.setState({
                reviewMessage:this.props.commentDocument.reviewMessage
            })
        }
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
                <td onClick={()=>this.showReview()}>{this.state.reviewMessage}</td>
                <td>{this.props.commentDocument.reviewUserFirstName + " " + this.props.commentDocument.reviewUserLastName}</td>
                <td>{this.props.commentDocument.reviewHelpfulCount}</td>
                <td>{this.props.commentDocument.reviewNotHelpfulCount}</td>
                <td>{AddedDate}</td>
                <td style={{ textAlign: 'center' }}>
                    {this.props.commentDocument.didAdminReplied ?
                        this.props.commentDocument.adminsReply === "Marked as Reviewed" ?
                            <i class="fa fa-check" style={{ color: 'green' }}></i>
                            :
                            <i class="fa fa-check-double" style={{ color: 'green' }}></i>
                        :
                        <i class="fa fa-times" style={{ color: '#dc3545' }}></i>}
                </td>
                <td>
                    <div className='btn-group' style={{ width: '100%' }}>
                        {
                            this.props.commentDocument.didAdminReplied ? "" :
                                <button className='btn btn-success' title="Mark Reviewed" onClick={() => this.props.MarkAsRead(this.props.commentDocument._id)} >
                                    {/* <span class="glyphicon glyphicon-check" ></span> */}
                                    <i class="fa fa-check-square" style={{ color: 'white' }}></i>
                                </button>
                        }
                        <button className='btn btn-info' title="Reply"
                            onClick={() => this.props.goToCompose(this.props.commentDocument)}
                        >
                            <i class="fa fa-envelope"></i>
                        </button>
                        <button title="Delete Review" className='btn btn-danger' onClick={() => this.DeleteReview()}><i class="fa fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        );
    }
}

export default SingleItemReviewRow;