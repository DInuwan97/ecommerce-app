import React, { Component } from 'react'
import DashbordCardPanel from '../DashbordCardPannel/DashobordCardPanel';
import MyProfile from '../UserProfile/MyProfile';
export default class MyProfile extends Component {
    render() {
        const{companyName} = this.props;
        return (
            <div>
                 <DashbordCardPanel/>
                 <MyProfile/>
            </div>
        )
    }
}
