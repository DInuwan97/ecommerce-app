import React, { Component } from 'react'

export default class Contacts extends Component {
    render() {
        return (
<div>            
<div className="contact">
	<div className="container">
		<h3>Contact Us</h3>
		<div className="col-md-3 col-sm-3 contact-left">
			<div className="address">
				<h4>ADDRESS</h4>
				<h5>345 Setwant natrer,</h5>
				<h5>Washington. United States.</h5>
			</div>
			<div className="phone">
				<h4>PHONE</h4>
				<h5>+1(401) 1234 567.</h5>
				<h5>+1(804) 4261 150.</h5>
			</div>
			<div className="email">
				<h4>EMAIL</h4>
				<h5><a href="mailto:info@example.com">example@gmail.com</a></h5>
				<h5><a href="mailto:info@example.com">example2@yahoo.com</a></h5>
			</div>
		</div>
		<div className="col-md-9 col-sm-9 contact-right">
			<form action="#" method="post">
				<input type="text" name="your name" placeholder="Your name" required=" "/>
				<input type="text" name="your email" placeholder="Your email" required=" "/>
				<input type="text" name="your subject" placeholder="Your subject" required=" "/>
				<input type="text" name="your phone number" placeholder="Phone number" required=" "/>
				<textarea  name="your message" placeholder="Your message" required=" "></textarea>
				<input type="submit" value="Send message"/>
			</form>
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
