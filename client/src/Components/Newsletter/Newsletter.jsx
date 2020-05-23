import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom';


export default class Newsletter extends Component{
	constructor(props) {
		super(props);
		this.state={
			email:""
		}
	}
	
	onChage=(e)=>{
		this.setState({
			email:e.target.value
		})
	}
	onSubmit=(e)=>{
		e.preventDefault();
		this.setState({
			email:""
		})
	}
    render(){
        return(
        <div className="newsletter">
            <div className="container">

			    <div className="col-md-6 w3agile_newsletter_left">
				    <h3>Newsletter</h3>
				    <p>Subscribe to our newsletter today to receive updates on the latest products.</p>
                </div>
			
			    <div className="col-md-6 w3agile_newsletter_right">
				    <form method="post" onSubmit={(e)=>{this.onSubmit(e)}}>
                        <input type="email" name="Email" value="Email" value={this.state.email} onChange={(e)=>{this.onChage(e)}} placeholder="Email" required="" />
					    <input type="submit" value="Subscribe" />
				    </form>
			    </div>
                
			<div className="clearfix"> </div>
		    </div>
        </div>
        )
    }
}