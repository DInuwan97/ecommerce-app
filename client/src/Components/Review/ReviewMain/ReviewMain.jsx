import React, { Component } from 'react';
import './ReviewMain.css';
import ReviewCard from '../ReviewCard/ReviewCard';
import Axios from 'axios';
import swal from 'sweetalert';

import { Editor } from '@tinymce/tinymce-react';

const $ = require('jquery')

class ReviewMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Size: 0,
            SelectedPage: 1,
            PageCount: 1,
            DisplaySize: 5,
            PageNumbersArr: [],
            MyLiked: [],
            MyDisliked: [],
            to: "",
            subject: "",
            cc: "",
            bcc: "",
            msg: "",
            reviewId: ""
        }
    }
    componentWillReceiveProps = (props) => {
        if (this.state.MyLiked != props.MyLiked || this.state.MyDisliked != props.MyDisliked) {
            this.setState({
                MyLiked: props.MyLiked,
                MyDisliked: props.MyDisliked,
            });
        }

    }
    componentDidMount() {
        this.PageArrSetter();
        this.setState({
            DisplaySize: 5,
        });
        setTimeout(() => {
            this.PageArrSetter();
        }, 2000);
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
        } else if (PageCount == 0) {
            this.setState({
                PageNumbersArr: [1],
                PageCount: 1
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

    HelpfulComment = async (id, state) => {
        const url = `/api/Review/newHelpfulReview/${this.props.itemId}`;
        const token = localStorage.getItem('userLoginToken');
        let data = {
            reviewID: id,
            reviewLikeStatus: state
        }
        await Axios.put(url, data, {
            headers: {
                Authorization: "bearer " + token,
            }
        }).catch((err) => {
            swal({
                title: "Error!",
                text: err.message,
                icon: 'error'
            });
        });
        this.props.getCommentData();
    }
    ReplyProduct = () => {
        const token = localStorage.getItem('userLoginToken');
        let to = this.state.to;
        let cc = this.state.cc;
        let bcc = this.state.bcc;
        let subject = this.state.subject;
        let msg = this.state.msg;
        let reviewId = this.state.reviewId;
        if ((to || cc || bcc) && subject && msg && (to != "" || cc != "" || bcc != "") && subject != "" && msg != "" && reviewId) {
            let data = {
                to: to,
                cc: cc,
                bcc: bcc,
                subject: subject,
                msg: msg,
                reviewId: reviewId
            }
            const url = "/api/review/admin/sendMail";
            swal({
                title:"Sending...",
                text:"1..2..3..",
                buttons:false,
                closeOnClickOutside: false,
                closeOnEsc: false,
            })
            Axios.post(url, data, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }).then(async res => {
                await swal({
                    title: "Success",
                    text: res.data.msg,
                    icon: 'success'
                });
                await this.props.getCommentData()
                this.setState({
                    to: "",
                    cc: "",
                    bcc: "",
                    msg: "",
                    subject: "",
                    reviewId: ""
                });

            }).catch(err => {
                swal({
                    title: "Error!",
                    text: err.message,
                    icon: 'error'
                })
            });
        } else {
            swal({
                title: "Error!",
                text: 'To/CC/Bcc , Subject and message must be filled',
                icon: 'error'
            })
        }
    }
    MarkAsRead = (id) => {
        const url = `/api/review/admin/markAsRead/${id}`;
        Axios.patch(url, "", {
            headers: {
                Authorization: `bearer ${localStorage.getItem('userLoginToken')}`
            }
        }).then(res => {

            swal({
                text: res.data.msg,
                title: "Status",
                icon: 'success'
            });
            this.props.getCommentData()
        }).catch(err => {
            swal({
                title: "Error!",
                text: err.response.data.msg,
                icon: 'error'
            });
        });
    }


    triggerModal = (to, cc, bcc, subject, msg, reviewId) => {
        this.setState({
            to,
            cc,
            bcc,
            subject,
            msg,
            reviewId
        })

    }

    handleEditorChange = (content, editor) => {
        this.setState({
            msg: content
        })

    }
    inputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        let startOfArr = (this.state.SelectedPage - 1) * this.state.DisplaySize;
        let endofArr = this.state.SelectedPage * this.state.DisplaySize;
        return (
            <div >
                <div className='row comments-row'>
                    <div className="col-md-12">
                        {this.props.CommentDocuments.slice(startOfArr, endofArr).map((element, key, self) => (
                            <ReviewCard
                                commentDocument={element}
                                key={startOfArr + key}
                                HelpfulComment={this.HelpfulComment}
                                MyComment={this.props.MyComments ? this.props.MyComments.includes(element._id) ? true : false : false}
                                EditComment={this.props.EditComment}
                                DeleteComment={this.props.DeleteComment}
                                MyLiked={this.state.MyLiked.includes(element._id) ? true : false}
                                MyDisliked={this.state.MyDisliked.includes(element._id) ? true : false}
                                userType={this.props.userType}
                                ReplyProduct={this.ReplyProduct}
                                MarkAsRead={this.MarkAsRead}
                                triggerModal={this.triggerModal}
                                company={this.props.company}

                            />
                        ))}
                    </div>
                </div>
                <div className="row navigation-row">
                    <div className="col-md-8" style={{ textAlign: "end" }}>
                        <p>
                            Disply Number
                        </p>
                    </div>
                    <div className="col-md-1" style={{ textAlign: "end", width: "auto" }}>
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
                    <div className="col-md-3" style={{ width: "auto" }}>
                        <nav aria-label="Page navigation" style={{ textAlign: "end" }}>
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
                <div className="modal fade" id='composeModal' tabindex="-1" role="dialog" aria-labelledby="composeModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>

                                <div class="swal-title" >Send Message</div>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <input className="form-control" name='to' placeholder="To:" onChange={(e) => this.inputChange(e)} value={this.state.to} />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" name='cc' placeholder="CC:" onChange={(e) => this.inputChange(e)} value={this.state.cc} />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" name='bcc' placeholder="Bcc:" onChange={(e) => this.inputChange(e)} value={this.state.bcc} />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" name='subject' placeholder="Subject:" onChange={(e) => this.inputChange(e)} value={this.state.subject} />
                                </div>
                                <div className="form-group">
                                    <Editor
                                        apiKey="n23yi564w9ps2xugf67ppfuw5q5izogzxspted9goxsxoezg"
                                        value={this.state.msg}
                                        init={{
                                            height: 500,
                                            menubar: false,
                                            plugins: [
                                                'advlist autolink lists link image',
                                                'charmap print preview anchor help',
                                                'searchreplace visualblocks code',
                                                'insertdatetime media table paste wordcount media',
                                                'print preview paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons'],
                                            toolbar:
                                                'undo redo | bold italic underline strikethrough | \
                                        fontselect fontsizeselect formatselect | \
                                        alignleft aligncenter alignright alignjustify |\
                                         outdent indent | \
                                          numlist bullist |\
                                           forecolor backcolor removeformat | \
                                           pagebreak | charmap emoticons | fullscreen  preview save print | \
                                         link codesample | ltr rtl'
                                        }}
                                        onEditorChange={this.handleEditorChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary"  data-dismiss="modal" onClick={() => this.ReplyProduct()}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReviewMain;