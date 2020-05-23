import React, { Component, Fragment } from 'react';
import swal from 'sweetalert';
import Axios from 'axios';
import JwtDecode from 'jwt-decode';
import { withRouter } from 'react-router-dom';

class ContactusDTRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            admin: false
        }
    }

    componentDidMount = () => {
        const token = localStorage.getItem('userLoginToken');
        if (token) {
            const decoded = JwtDecode(token);
            this.setState({
                admin: decoded.isAdmin
            })
        }
    }

    showExtended = (msg, title) => {
        swal({
            title,
            text: msg
        })
    }
    

    goToReply = () => {
        this.props.history.push({
            pathname: '/Compose',
            state: {
                to: this.props.message.email,
                subject: `Regarding the Message on ${this.props.message.subject}`,
                msg: `Your Message: ${this.props.message.msg}`,
                contactUsMsg: true,
                contactUsId: this.props.message._id
            }
        })
    }


    render() {
        const options = {
            year: "numeric", month: "numeric", day: "numeric",
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: true,
        };
        const date = new Date(Date.parse(this.props.message.addedTime));
        const AddedDate = new Intl.DateTimeFormat("en-US", options).format(date);
        return (
            <tr>
                <td>{AddedDate}</td>
                <td>{this.props.message.name}</td>
                {this.props.message.subject.length > 10 ?
                    <td onClick={() => this.showExtended(this.props.message.subject, 'Subject')}>{this.props.message.subject.slice(0, 10) + "..."}</td>
                    :
                    <td>{this.props.message.subject}</td>}
                {this.props.message.msg.length > 10 ?
                    <td onClick={() => this.showExtended(this.props.message.msg, 'Message')}>{this.props.message.msg.slice(0, 10) + "..."}</td>
                    :
                    <td>{this.props.message.msg}</td>}
                <td>{this.props.message.phoneNumber}</td>
                {this.props.message.email.length > 10 ?
                    <td onClick={() => this.showExtended(this.props.message.email, 'Email')}>{this.props.message.email.slice(0, 10) + "..."}</td>
                    :
                    <td>{this.props.message.email}</td>
                }

                <td>{
                    this.props.message.replied ?
                        <button className="btn btn-success" style={{ width: '100%' }} data-toggle="modal" data-target="#reply-modal" onClick={() => this.props.showReply(this.props.index)}>
                            View Reply
                            </button>
                        :
                        <button className="btn btn-info" style={{ width: '100%' }} onClick={() => this.goToReply()}>
                            Reply
                            </button>
                }
                </td>
                <td>
                    <div className='btn-group' style={{ width: '100%' }}>
                        {
                            this.state.admin ?
                                <button className='btn btn-danger' title="Delete Message" onClick={() => this.props.deleteReply(this.props.message._id)}><i class="fa fa-trash"></i></button>
                                :
                                <button className='btn btn-danger' title="Delete Message" onClick={() =>{swal({title:"Error!",text:"No Permission",icon:"error"})} }><i class="fa fa-trash"></i></button>
                        }
                    </div>
                </td>
            </tr>
        );
    }

}
export default withRouter(ContactusDTRow);