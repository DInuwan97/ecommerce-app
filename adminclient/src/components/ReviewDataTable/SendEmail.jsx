import React, { Component } from 'react';

const $ = require('jquery');
class SendEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            to: "",
            subject: ""
        }
    }

    sendMail = () => {
        console.log($('.note-editable').html());
    }

    inputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    discard = () => {
        this.props.history.push('/Reviews')
    }
    render() {
        return (
            <div>
                <div className="card card-primary card-outline">
                    <div className="card-header">
                        <h3 className="card-title">Compose New Message</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                        <div className="form-group">
                            <input className="form-control" name='to' placeholder="To:" onChange={(e) => this.inputChange(e)} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" name='subject' placeholder="Subject:" onChange={(e) => this.inputChange(e)} />
                        </div>
                        <div className="form-group">
                            <textarea id="compose-textarea" className="form-control" style={{ height: '300px' }} value="" />
                        </div>

                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                        <div className="float-right">
                            <button type="submit" className="btn btn-primary"><i className="far fa-envelope" onClick={() => this.sendMail()} /> Send</button>
                        </div>
                        <button className="btn btn-default"><i className="fas fa-times" />
                            <a href="/Reviews" style={{textDecoration:'none',color:'#444'}}>
                                Discard
                            </a>
                        </button>
                    </div>
                    {/* /.card-footer */}
                </div>
            </div>
        );
    }
}

export default SendEmail;