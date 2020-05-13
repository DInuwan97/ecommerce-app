import React, { Component } from 'react'
import DashbordCardPanel from '../DashbordCardPannel/DashobordCardPanel';
import MyProfileFunctions from '../UserProfile/MyProfileUserFunctions';
export default class MyProfile extends Component {
    render() {
        const{loggedEmail} = this.props;
        return (
            <div>
                 <DashbordCardPanel/>
                 <MyProfileFunctions loggedEmail={loggedEmail}/>
            </div>
        )
    }
}
