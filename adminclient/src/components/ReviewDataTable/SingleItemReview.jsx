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
        this.state={
            reviews:[]
        }
    }
    

    componentDidMount = () => {
        this.getData();
        
    }


    getData = () =>{
        const { id } = this.props.match.params;
        const url = `/api/review/${id}`;
        // const url = `/api/review/${id}`;
        Axios.get(url).then(async res=>{
            await this.setState({
                reviews:res.data.CommentDocuments
            })
            dtable=$('#review-table-2').DataTable({
                "order": [[ 5, "desc" ]]
            })

        }).catch(err=>{
            console.log(err);
        })
    }

    deleteReview =async (reviewId)=>{
        const token = localStorage.getItem('userLoginToken');
        const { id } = this.props.match.params;
        const url = `/api/Review/deleteReviewComment/${id}`
        if(token){
            await Axios.delete(url,{
                headers: {
                  Authorization: `bearer ${token}`
                },
                data: {
                  reviewID: reviewId,
                  adminAccess:true
                }
              }).then(res=>{
                this.getData();
                swal({
                    title: "Status",
                    text: res.data.msg,
                    icon: 'success'
                  });
              }).catch(err=>{
                swal({
                    title: "Error!",
                    text: err.message,
                    icon: 'error'
                  });
              })
        }else{
            swal({
                title:"Error!",
                text:"Login/Signup to Perform actions",
                icon:"error"
            });
        }
    }

    goToCompose = (data)=>{
        const token = localStorage.getItem('userLoginToken');
        
        if(token){
            this.props.history.push(
                '/compose',
                {
                    email:data.reviewerEmail,
                    review:data.reviewMessage,
                    reviewId:data._id
            })
        }else{
            swal({
                title:"Error!",
                text:"Login/Signup to reply to reviews",
                icon:'error'
            })
        }
    }

    MarkAsRead = (id)=>{
        const url=`/api/review/admin/markAsRead/${id}`;
        Axios.patch(url,"",{headers:{
            Authorization:`bearer ${localStorage.getItem('userLoginToken')}`
        }}).then(res=>{
            swal({
                text:res.data.msg,
                title:"Status",
                icon:'success'
            });
            this.getData();
        }).catch(err=>{
            swal({
                title:"Error!",
                text:err.response.data.msg,
                icon:'error'
            });
        });
    }

    render() {
        return (
            <div>
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
                                        DeleteReview = {this.deleteReview}
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