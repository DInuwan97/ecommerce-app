import React, { Component } from 'react'
import DashbordCardPanel from '../DashbordCardPannel/DashobordCardPanel';
import MyProfileFunctions from '../UserProfile/MyProfileUserFunctions';
export default class MyProfile extends Component {

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
                 <MyProfileFunctions loggedEmail={loggedEmail} companyName = {companyName}/>/>
            </div>
        )
    }
}
