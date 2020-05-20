import React, { Component } from 'react'

export default class DashobordCardPanel extends Component {


  constructor(props){
    super(props);
    this.state={
      usersList:[],
      loggedUserDetails:'',
      itemList:[]
    }
  }


  componentDidMount() {
    this.setState({
      usersList:this.props.usersList,
      loggedUserDetails:this.props.loggedUserDetails,
      itemList:this.props.itemsList
    })
  }

  getItemsPerCompany(){
    let itemsPerCompany = 0
    for(let index=0 ; index < this.state.itemList.length ; index++){
      if(this.state.loggedUserDetails.company === this.state.itemList[index].company && 
        this.state.loggedUserDetails.isSalesManager === true && this.state.itemList[index].isApproved === true){
          itemsPerCompany++
      }

      else if(this.state.loggedUserDetails.isAdmin === true && this.state.itemList[index].isApproved === true){
         itemsPerCompany++
      }
    }
    
    //let d = new Date();
    
    return itemsPerCompany;
  }

  getNoOfValidUsers(){
    let noOfValidUsers = 0;
    for(let index=0 ; index < this.state.usersList.length; index++){
      if(this.state.loggedUserDetails.company === this.state.usersList[index].company && 
        this.state.loggedUserDetails.isSalesManager === true && this.state.usersList[index].secureKeyVerifyStatus === true &&
        this.state.usersList[index].isSalesServicer === true && this.state.usersList[index].salasManagerVerification === true
        ){
          noOfValidUsers++
      }
      else if(this.state.loggedUserDetails.isAdmin === true && this.state.usersList[index].secureKeyVerifyStatus === true ){
        noOfValidUsers++
      }
    }

    return noOfValidUsers;
  }


    render() {
        return (
          
            <div className="row">
              <div className="col-lg-3 col-6">
                
                <div className="small-box bg-info">
                  <div className="inner">

                    <h3>{this.getItemsPerCompany()}</h3>


                  {(this.state.loggedUserDetails.isSalesManager === true ) &&
                    <p>{this.state.loggedUserDetails.company+ " 's "}New Items</p>
                  }

                  {(this.state.loggedUserDetails.isAdmin === true) &&
                    <p>Total Items</p>
                  }


                  </div>
                  <div className="icon">
                    <i className="ion ion-bag"></i>
                  </div>
                  <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                </div>
              </div>
             
              <div className="col-lg-3 col-6">
                
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>53<sup style={{fontSize: 20}}>%</sup></h3>
    
                    <p>Bounce Rate</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars"></i>
                  </div>
                  <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                </div>
              </div>


              {((this.state.loggedUserDetails.isAdmin === true))&&
           
              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>{this.getNoOfValidUsers()}</h3>
    
                    <p>User Registrations</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add"></i>
                  </div>
                  <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                </div>
              </div>
              }

              {((this.state.loggedUserDetails.isSalesManager === true))&&
                   <div className="col-lg-3 col-6">
                   <div className="small-box bg-warning">
                     <div className="inner">
                       <h3>{this.getNoOfValidUsers()}</h3>
       
                       <p>Valid Sales Servicers</p>
                     </div>
                     <div className="icon">
                       <i className="ion ion-person-add"></i>
                     </div>
                     <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                   </div>
                 </div>
              }

              <div className="col-lg-3 col-6">
               
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>65</h3>
    
                    <p>Unique Visitors</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph"></i>
                  </div>
                  <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                </div>
              </div>
           
            </div>
        )
    }
}
