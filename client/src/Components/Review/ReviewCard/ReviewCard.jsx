import React, { Component, Fragment } from 'react';
import './ReviewCard.css';
import swal from 'sweetalert';
class ReviewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MyLiked: false,
            MyDisliked: false
        }
    }
    componentDidMount() {
        this.setState({
            MyLiked: this.props.MyLiked,
            MyDisliked: this.props.MyDisliked
        });
    }

    componentWillReceiveProps = (props) => {
        this.setState({
            MyLiked: props.MyLiked,
            MyDisliked: props.MyDisliked
        });


    }


    likeButtons = (type) => {
        if (!this.props.MyComment) {
            if (localStorage.getItem('userLoginToken')) {
                let state;
                if (type === "like") {
                    state = !this.props.MyLiked;
                    this.setState({
                        MyLiked:!this.props.MyLiked,
                        MyDisliked:false
                    });
                    this.props.HelpfulComment(this.props.commentDocument._id, type, state);
                } else if (type === "unlike") {
                    state = !this.props.MyDisliked;
                    this.setState({
                        MyDisliked:!this.props.MyDisliked,
                        MyLiked:false
                    });
                    this.props.HelpfulComment(this.props.commentDocument._id, type, state);
                }
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
                },
                buttons: {
                    cancel: true,
                    confirm: true,

                },
                closeOnClickOutside: false,
            }).then(data => {
                let editedData = textBar.value;
                console.log(editedData, data);

                if (editedData != "" && data && editedData) {
                    if (editedData !== this.props.commentDocument.reviewMessage) {
                        this.props.EditComment(this.props.commentDocument._id, editedData);
                    }
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
                                        {
                                            this.props.commentDocument.userImageUrl == ""?
                                            <img src={require("./assets/images/avatar.png")} alt="Avatar" class="avatar" />:
                                            <img src={this.props.commentDocument.userImageUrl} alt="Avatar" class="avatar" />
                                        }
                                        
                                    </div>
                                    <div className="user-name col-xs-8 ">
                                        {this.props.commentDocument.reviewUserFirstName + " " + this.props.commentDocument.reviewUserLastName}
                                    </div>
                                </div>
                                <div className="row like-row">
                                    <div className="col-md-2 col-xs-2"></div>
                                    <div className="user-helpful col-md-4 col-xs-4">
                                        <span className={this.props.MyComment ? "disabled like-icon" : "like-icon"} onClick={() => this.likeButtons("like")}>
                                            {this.state.MyLiked ? <i class="fa fa-thumbs-up"></i> : <i class="fa fa-thumbs-o-up"></i>}
                                            {" " + this.props.commentDocument.reviewHelpfulCount}
                                        </span>
                                    </div>
                                    <div className="user-not-helpful col-md-4 col-xs-4">
                                        <span className={this.props.MyComment ? "disabled dislike-icon" : "dislike-icon"} onClick={() => this.likeButtons("unlike")}>
                                            {this.state.MyDisliked ? <i class="fa fa-thumbs-down"></i> : <i class="fa fa-thumbs-o-down"></i>}
                                            {" " + this.props.commentDocument.reviewNotHelpfulCount}
                                        </span>
                                    </div>
                                    <div className="user-helpful col-md-2 col-xs-2"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 review-col col-xs-6">
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
                                </div>

                            </div>
                        </div>
                        <div className="col-md-1 col-xs-6 settings-button-col">
                            {this.props.MyComment ?
                                <div class="btn-group">
                                    <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="glyphicon glyphicon-option-vertical"></span>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-right">
                                        <li><p onClick={() => this.EditComment()}>Edit Review</p></li>
                                        <li><p onClick={() => this.DeleteComment()}>Delete Review</p></li>
                                    </ul>
                                </div> :
                                <div></div>
                            }
                        </div>
                    </div>
                </div>
            </Fragment >
        );
    }
}

export default ReviewCard;