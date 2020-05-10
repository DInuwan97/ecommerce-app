import React, { Component } from 'react';
import './ReviewMain.css';
import ReviewCard from '../ReviewCard/ReviewCard';
import Axios from 'axios';
import Swal from 'sweetalert';

class ReviewMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Size: 0,
            SelectedPage: 1,
            PageCount: 1,
            DisplaySize: 5,
            PageNumbersArr: [],
        }
    }
    // componentWillReceiveProps = (props) => {
    //     if (this.props != props) {
    //         this.PageArrSetter();
    //     }
    // }
    componentDidMount(){
        this.PageArrSetter();
        this.setState({
            DisplaySize:5
        })
    }
    PageArrSetter = async () => {
        const Size = this.props.CommentDocuments.length;
        const PageCount = Math.ceil((Size / this.state.DisplaySize));
        await this.setState({
            PageCount,
            Size
        });
        if (this.state.PageCount > 5) {
            const PageNumbersArr = [];
            if (this.state.SelectedPage == 1) {
                PageNumbersArr.push(1);
                PageNumbersArr.push(2);
                PageNumbersArr.push(3);
                PageNumbersArr.push(4);
                PageNumbersArr.push(5);
            } else if (this.state.SelectedPage == this.state.PageCount) {
                PageNumbersArr.push(this.state.PageCount - 4);
                PageNumbersArr.push(this.state.PageCount - 3);
                PageNumbersArr.push(this.state.PageCount - 2);
                PageNumbersArr.push(this.state.PageCount - 1);
                PageNumbersArr.push(this.state.PageCount);
            } else if (this.state.SelectedPage == 2) {
                ;
                PageNumbersArr.push(1);
                PageNumbersArr.push(2);
                PageNumbersArr.push(3);
                PageNumbersArr.push(4);
                PageNumbersArr.push(5);
            } else if (this.state.SelectedPage == this.state.PageCount - 1) {
                PageNumbersArr.push(this.state.PageCount - 4);
                PageNumbersArr.push(this.state.PageCount - 3);
                PageNumbersArr.push(this.state.PageCount - 2);
                PageNumbersArr.push(this.state.PageCount - 1);
                PageNumbersArr.push(this.state.PageCount);
            } else {
                PageNumbersArr.push(this.state.SelectedPage - 2);
                PageNumbersArr.push(this.state.SelectedPage - 1);
                PageNumbersArr.push(this.state.SelectedPage);
                PageNumbersArr.push(this.state.SelectedPage + 1);
                PageNumbersArr.push(this.state.SelectedPage + 2);
            }
            this.setState({
                PageNumbersArr
            })
        } else {
            const PageNumbersArr = [];
            for (let index = 1; index <= this.state.PageCount; index++) {
                PageNumbersArr.push(index);
            }
            this.setState({
                PageNumbersArr
            });
        }
    }
    PageSelecter = async (page) => {
        await this.setState({
            SelectedPage: page,
        });
        this.PageArrSetter();
    }
    PageSizeSelector = async (size) => {
        await this.setState({
            DisplaySize: size,
            SelectedPage: 1
        });
        this.PageArrSetter();
    }
    PageSelectorPrevious = () => {
        if (this.state.SelectedPage != 1) {
            this.PageSelecter(this.state.SelectedPage - 1)
        }
    }
    PageSelectorNext = () => {
        if (this.state.SelectedPage != this.state.PageCount) {
            this.PageSelecter(this.state.SelectedPage + 1)
        }
    }

    HelpfulComment = async (id, type, state) => {
        const url = 'api/Review/newHelpfulReview/5ea4280a46ab4d05a47dfd21';
        // const url = 'api/Review/newHelpfulReview/5e6e389fe5934e44fc90beb8';
        const token = localStorage.getItem('userLoginToken');
        let data;
        if (type == 'like') {
            data = {
                reviewID: id,
                reviewWasHelpful: state,
                reviewWasNotHelpful: false
            }
        } else if (type == 'unlike') {
            data = {
                reviewID: id,
                reviewWasNotHelpful: state,
                reviewWasHelpful: false
            }
        }

        await Axios.patch(url, data, {
            headers: {
                Authorization: "bearer " + token,
            }
        }).catch((err) => {
            console.log(err);
            Swal({
                title: "Error!",
                text: err.message,
                icon: 'error'
            });
        });
        this.props.getCommentData();
    }


    render() {
        let startOfArr = (this.state.SelectedPage - 1) * this.state.DisplaySize;
        let endofArr = this.state.SelectedPage * this.state.DisplaySize;
        return (
            <div >

                <div className="row navigation-row">
                    <div className="col-md-4"></div>
                    <div className="col-md-2">
                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.DisplaySize} <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><p onClick={() => this.PageSizeSelector(1)}>1</p></li>
                            <li><p onClick={() => this.PageSizeSelector(5)}>5</p></li>
                            <li><p onClick={() => this.PageSizeSelector(10)}>10</p></li>
                            <li><p onClick={() => this.PageSizeSelector(50)}>50</p></li>
                            <li><p onClick={() => this.PageSizeSelector(100)}>100</p></li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <nav aria-label="Page navigation">
                            <ul className="pagination">
                                <li className={this.state.SelectedPage == 1 ? "disabled" : ""}
                                    onClick={() => this.PageSelectorPrevious()}>
                                    <p href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </p>
                                </li>
                                {
                                    this.state.PageNumbersArr.map((element, key, self) => (
                                        <li className={this.state.SelectedPage == element ? "active" : ""}
                                            onClick={() => this.PageSelecter(element)}><p >{element}</p></li>
                                    ))
                                }
                                <li className={this.state.SelectedPage === this.state.PageCount ? "disabled" : ""}
                                    onClick={() => this.PageSelectorNext()}>
                                    <p aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </p>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className='row comments-row'>
                    <div className="col-md-12">
                        {this.props.CommentDocuments.slice(startOfArr, endofArr).map((element, key, self) => (
                            <ReviewCard
                                commentDocument={element} key={key}
                                HelpfulComment={this.HelpfulComment}
                                MyComment={this.props.MyComments ? this.props.MyComments.includes(element._id) ? true : false : false}
                                EditComment={this.props.EditComment}
                                DeleteComment={this.props.DeleteComment}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ReviewMain;