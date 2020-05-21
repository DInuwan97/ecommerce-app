import React, { Component } from 'react'
import DashbordCardPanel from '../DashbordCardPannel/DashobordCardPanel';
import SalesManagerProfileFunctions from '../UserProfile/SalesManagerProfile';
import {withRouter} from 'react-router-dom';
class SalesMAnagerProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
          usersList:[],
          loggedUserDetails:''
        }
      }
    

    render() {
        const{loggedEmail,companyName,usersList,loggedUserDetails} = this.props;
        return (
            <div>
                 <DashbordCardPanel loggedUserDetails={loggedUserDetails} usersList={usersList} itemsList={this.props.itemsList}/>
                 <SalesManagerProfileFunctions salesManagerEmail={this.props.match.params.email} loggedEmail={loggedEmail} companyName = {companyName}/>/>
            </div>
        )
    }
}
export default withRouter(SalesMAnagerProfile);