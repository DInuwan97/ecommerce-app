import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom';


export default class Newsletter extends Component{
    render(){
        return(
        <div className="newsletter">
            <div className="container">

			    <div className="col-md-6 w3agile_newsletter_left">
				    <h3>Newsletter</h3>
				    <p>Excepteur sint occaecat cupidatat non proident, sunt.</p>
                </div>
			
			    <div className="col-md-6 w3agile_newsletter_right">
				    <form action="#" method="post">
                        <input type="email" name="Email" value="Email" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Email';}" required="" />
					    <input type="submit" value="Subscribe" />
				    </form>
			    </div>
                
			<div className="clearfix"> </div>
		    </div>
        </div>
        )
    }
}