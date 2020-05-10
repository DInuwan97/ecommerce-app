import React, { Component, Fragment } from 'react';
import './ReviewCard.css';
import swal from 'sweetalert';
class ReviewCard extends Component {

    likeButtons = (type, state) => {
        if (!this.props.MyComment) {
            if (localStorage.getItem('userLoginToken')) {
                this.props.HelpfulComment(this.props.commentDocument._id, 'like', true);
            } else {
                swal({
                    title: "Error!",
                    text: "Login or Signup to Like/Unlike Reviews",
                    icon: 'error'
                })
            }
        }
    }

    EditComment = () => {
        if (this.props.MyComment) {
            let textBar = document.createElement('input');
            textBar.value = this.props.commentDocument.reviewMessage;
            textBar.className = "swal-content__input";
            textBar.type = "text";
            swal({
                title: "Edit Review",
                content: {
                    element: textBar,
                    attributes: {
                        placeholder: this.props.commentDocument.reviewMessage
                    }
                }
            }).then(data => {
                let editedData = textBar.value;
                console.log(editedData, data);

                if (data != "" && data) {
                    this.props.EditComment(this.props.commentDocument._id, editedData);
                }
            });
        }
    }
    DeleteComment = () => {
        if (this.props.MyComment) {
            swal("Are you sure?", {
                dangerMode: true,
                buttons: true,
            }).then(res => {
                if (res) {
                    this.props.DeleteComment(this.props.commentDocument._id);
                }
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
            <Fragment>
                <div>
                    <div className='row review-row '>
                        <div className="col-md-3 profile-col  ">
                            <div className="user-part " >
                                <div className='row vertical-align user-image-row'>
                                    <div className="user-image col-xs-4">
                                        <img src={require("./assets/images/avatar.png")} alt="Avatar" class="avatar" />
                                    </div>
                                    <div className="user-name col-xs-8 ">
                                        {this.props.commentDocument.reviewUserFirstName + " " + this.props.commentDocument.reviewUserLastName}
                                    </div>
                                </div>
                                <div className="row like-row">
                                    <div className="col-md-3 col-xs-3"></div>
                                    <div className="user-helpful col-md-3 col-xs-3">
                                        <button className={this.props.MyComment ? "btn btn-success disabled" : "btn btn-success"} onClick={() => this.likeButtons()}> <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
                                            {" " + this.props.commentDocument.reviewHelpfulCount}
                                        </button>
                                    </div>
                                    <div className="user-not-helpful col-md-3 col-xs-3">
                                        <button className={this.props.MyComment ? "btn btn-danger disabled" : "btn btn-danger"}>
                                            <span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span>
                                            {" " + this.props.commentDocument.reviewNotHelpfulCount}
                                        </button>
                                    </div>
                                    <div className="user-helpful col-md-3 col-xs-3"></div>
                                </div>
                                {this.props.MyComment ?
                                    <div className="row button-row">
                                        <div className="col-md-12">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Action <span class="caret"></span>
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a href="#">Edit Review</a></li>
                                                    <li><a href="#">Delete Review</a></li>
                                                </ul>
                                            </div>
                                            {/* <div class="btn-group-vertical vertical-btn" role="group" aria-label="...">
                                                <button class="btn btn-info" onClick={()=>this.EditComment()}>Edit Review</button>
                                                <button class="btn btn-danger" onClick={()=>this.DeleteComment()}>Delete Review</button>
                                            </div> */}
                                        </div>
                                    </div> : <div></div>
                                }
                            </div>
                        </div>
                        <div className="col-md-9 review-col">
                            <div className="review-part">
                                <div className='row review-message-row'>
                                    <div className="review-message col-md-12">
                                        {this.props.commentDocument.reviewMessage}
                                        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum placeat aspernatur assumenda distinctio omnis laborum, sed perferendis debitis velit unde. Beatae id dolores laudantium facere mollitia maxime, soluta quia doloremque.
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet doloremque recusandae illum sit quia suscipit dignissimos autem dicta? Dolorem nesciunt corporis quisquam quos. Sed dignissimos deleniti, delectus unde dicta rerum?
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex distinctio, sint minus voluptatem nemo officia qui molestias suscipit, adipisci ut velit similique, alias est beatae culpa iure! Eligendi, velit repudiandae.
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque iusto fugiat, corrupti tenetur exercitationem deleniti labore ratione qui suscipit nihil ea temporibus autem sed dolores reiciendis? Atque, necessitatibus ex? Autem!
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam eligendi quisquam neque eveniet? Ipsa quos facere consequuntur. Sapiente laborum veritatis, sit, nulla voluptatibus aspernatur cupiditate, nam deleniti voluptatum odit velit.
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt explicabo ab perspiciatis error in veritatis nostrum minus, quae quasi. Harum totam et quasi adipisci, ab rerum enim libero autem tempora? */}
                                    </div>
                                </div>
                                <div className="review-part-last-row row">
                                    <div className="review-date col-md-5">
                                        {AddedDate}
                                    </div>
                                    <div className="review "></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ReviewCard;