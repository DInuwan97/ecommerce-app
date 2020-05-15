import React, { Component } from 'react';




class ReviewReplyTableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.itemData.item}</td>
                <td>{this.props.itemData.itemName}</td>
                <td>{this.props.itemData.count}</td>
                <td>
                    <button className="btn btn-info" style={{width:'100%'}} onClick={()=>this.props.goToItemReviewReplies(this.props.itemData.item,this.props.itemData.itemName)}>
                        View Replys
                    </button>
                </td>
            </tr>
        );
    }
}

export default ReviewReplyTableRow;