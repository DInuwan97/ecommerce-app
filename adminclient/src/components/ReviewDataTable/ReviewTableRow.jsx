import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class ReviewTableRow extends Component {
    goToItemReviews = () => {
        const { history } = this.props;
        if (history) {
            history.push(`/SingleReviews/${this.props.data.item}`);
        }
    }

    render() {

        const { history } = this.props;
        return (
            <tr>
                <td>{this.props.data.item}</td>
                <td>{this.props.data.itemName}</td>
                <td>{this.props.data.count}</td>
                <td>
                    <button className="btn btn-info" style={{ width: "100%" }} onClick={() => this.goToItemReviews()}>View</button>
                </td>
            </tr>
        );
    }
}

export default withRouter(ReviewTableRow);