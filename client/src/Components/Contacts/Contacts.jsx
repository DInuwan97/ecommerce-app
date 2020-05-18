import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';

export default class Contacts extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: "",
			msg: "",
			name: "",
			subject: "",
			phoneNumber: ""
		}
	}
	changeInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	sendMail = () => {
		if (this.state.email != "" && this.state.msg != ""
			&& this.state.name != "" && this.state.subject != "" && this.state.phoneNumber != "") {
			const url = "/api/contactus/";
			const data = {
				name: this.state.name,
				email: this.state.email,
				subject: this.state.subject,
				phoneNumber: this.state.phoneNumber,
				msg: this.state.msg
			}
			Axios.post(url, data).then(async res => {
				await swal({
					title: "Status",
					text: res.data.msg,
					icon: "success"
				});
				this.setState({
					email: "",
					msg: "",
					name: "",
					subject: "",
					phoneNumber: ""
				})
			}).catch(err => {
				swal({
					title: "Error!",
					text: err.message,
					icon: 'error'
				})
			})
		} else {
			swal({
				title: "Error!",
				text: "Fill all the fields.",
				icon: 'error'
			})
		}

	}

	render() {
		return (
			<div>
				<div className="contact">
					<div className="container">
						<h3>Contact Us</h3>
						<div className="col-md-3 col-sm-3 contact-left">
							<div className="address">
								<h4>ADDRESS</h4>
								<h5>100 Kaduwela road,</h5>
								<h5>Malabe. Sri Lanka.</h5>
							</div>
							<div className="phone">
								<h4>PHONE</h4>
								<h5>+94(712) 1234 567.</h5>
								<h5>+94(715) 1234 567.</h5>
							</div>
							<div className="email">
								<h4>EMAIL</h4>
								<h5><a href="mailto:FashionStoreBionics@gmail.com">FashionStoreBionics@gmail.com</a></h5>
							</div>
						</div>
						<div className="col-md-9 col-sm-9 contact-right">
							<input type="text" value={this.state.name} name="name" placeholder="Your name" required=" " onChange={e => this.changeInput(e)} />
							<input type="text" value={this.state.email} name="email" placeholder="Your email" required=" " onChange={e => this.changeInput(e)} />
							<input type="text" value={this.state.subject} name="subject" placeholder="Your subject" required=" " onChange={e => this.changeInput(e)} />
							<input type="text" value={this.state.phoneNumber} name="phoneNumber" placeholder="Phone number" required=" " onChange={e => this.changeInput(e)} />
							<textarea name="msg" value={this.state.msg} placeholder="Your message" required=" " onChange={e => this.changeInput(e)}></textarea>
							<input type="submit" value="Send message" onClick={() => this.sendMail()} />

						</div>
					</div>
				</div>

				<div className="map-w3ls">
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.403636707571!2d80.75784231538883!3d7.957172494268695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afca1239433dcb5%3A0x762e72bb619aef0c!2sSigiriya+Lion+Rock!5e0!3m2!1sen!2slk!4v1533052641591" allowfullscreen></iframe>
				</div>



			</div>
		)
	}
}
