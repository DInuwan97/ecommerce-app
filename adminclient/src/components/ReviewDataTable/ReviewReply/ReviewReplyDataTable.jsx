import React, { Component } from 'react';
import Axios from 'axios';
import ReviewReplyDataTableRow from './ReviewReplyTableRow';
import {withRouter} from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
const $ = require('jquery');
$.DataTable = require('datatables.net');


class ReviewReplyDataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoading:true
        }
    }


    componentDidMount = () => {
        this.getTableData();
    }

    componentDidUpdate=()=>{
        $('#review-reply-table').DataTable();
    }

    getTableData = () => {
        const url = "/api/review/admin/getAdminReplyItems/";
        const token = localStorage.getItem('userLoginToken');
        if (token) {
            Axios.get(url, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }).then(async res => {
                await this.setState({
                    items: res.data.data,
                    isLoading:false
                });
            }).catch(err=>{
                
            })
        }
    }

    goToItemReviewReplies = (itemId,itemName)=>{
        if(itemId){
            this.props.history.push({pathname:`/ReviewReplies/${itemId}`,state:{itemName}});
        }
    }

    render() {
        return (
            this.state.isLoading===true?
            <Spinner/>
            :
            <div>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Item Replies</h3>
                    </div>
                    <div className="card-body">
                        <table id="review-reply-table" className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Item Name</th>
                                    <th>Reply Count</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    this.state.items.map((element,index,self)=>(
                                        <ReviewReplyDataTableRow itemData ={element} index ={index} 
                                        goToItemReviewReplies={this.goToItemReviewReplies} />
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

export default withRouter(ReviewReplyDataTable);