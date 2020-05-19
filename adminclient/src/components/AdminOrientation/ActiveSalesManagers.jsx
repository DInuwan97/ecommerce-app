import React, { Component } from 'react'
import DashbordCardPanel from '../DashbordCardPannel/DashobordCardPanel'
import ActiveSalesManagersList from '../ActiveSalesManagers/ActiveSalesManagers';
export default class ActiveSalesManagers extends Component {
    render() {
        const{companyName,usersList,loggedUserDetails} = this.props;
        return (
            <div>
                 <DashbordCardPanel usersList={usersList} loggedUserDetails={loggedUserDetails} />
                 <ActiveSalesManagersList/>
            </div>
        )
    }
}
