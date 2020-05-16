import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react';
import Axios from 'axios';
import swal from 'sweetalert';

const $ = require('jquery');
class SendEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            to: "",
            subject: "",
            cc: "",
            bcc: "",
            msg: "",
            reviewId:""
        }
    }
    componentDidMount() {
        if (this.props.location.state) {
            this.setState({
                to:this.props.location.state.to,
                subject:this.props.location.state.subject,
                msg:this.props.location.state.msg,
                cc:this.props.location.state.cc,
                bcc:this.props.location.state.bcc,
                reviewId:this.props.location.state.reviewId,
            })
        }

    }

    handleEditorChange = (content, editor) => {
        this.setState({
            msg: content
        })
        console.log(editor);
        
    }

    sendMail = () => {
        const token = localStorage.getItem('userLoginToken');
        if ((this.state.to || this.state.bcc || this.state.cc) && this.state.subject && this.state.msg &&
            ((this.state.to != "" || this.state.bcc != "" || this.state.cc != "") && this.state.subject != "" && this.state.msg != "")) {
            let data = {
                to: this.state.to,
                cc: this.state.cc,
                bcc: this.state.bcc,
                subject: this.state.subject,
                msg: this.state.msg,
                reviewId: this.state.reviewId
            }
            const url = "/api/review/admin/sendMail"
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
            }).then(async res=>{
                await swal({
                    title:"Success",
                    text:res.data.msg,
                    icon:'success'
                });
                this.setState({
                    to:"",
                    cc:"",
                    bcc:"",
                    msg:"",
                    subject:"",
                    reviewId:""
                });
                
            }).catch(err=>{
                swal({
                    title:"Error!",
                    text:err.message,
                    icon:'error'
                })
            });
        }else{
            swal({
                title:"Error!",
                text:'To/CC/Bcc , Subject and message must be filled',
                icon:'error'
            })
        }

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
                            <input className="form-control" name='to' placeholder="To:" onChange={(e) => this.inputChange(e)} value={this.state.to} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" name='cc' placeholder="CC:" onChange={(e) => this.inputChange(e)}  value={this.state.cc}  />
                        </div>
                        <div className="form-group">
                            <input className="form-control" name='bcc' placeholder="Bcc:" onChange={(e) => this.inputChange(e)}  value={this.state.bcc}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" name='subject' placeholder="Subject:" onChange={(e) => this.inputChange(e)}value={this.state.subject} />
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
                    {/* /.card-body */}
                    <div className="card-footer">
                        <div className="float-right">
                            <button type="submit" className="btn btn-primary" onClick={() => this.sendMail()}><i className="far fa-envelope"  /> Send</button>
                        </div>
                        <button className="btn btn-default"><i className="fas fa-times" />
                            <a href="/Reviews" style={{ textDecoration: 'none', color: '#444' }}>
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

export default withRouter(SendEmail);