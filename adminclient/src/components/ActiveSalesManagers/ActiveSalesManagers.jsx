import React, { Component } from 'react'
import Avatar from 'react-avatar';
export default class ActiveSalesManagers extends Component {

    constructor(props){
        super(props);
        this.state = {
            usersList : []
        }
    }

    componentDidMount(){
        this.setState({
            usersList:this.props.usersList
        })
    }


    render() {
        return (
            <div>


    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Active Sales Managers / Companies</h1>
          </div>
          <div class="col-sm-6">
     
          </div>
        </div>
      </div>
    </section>


    <section class="content">

      <div class="card card-solid">
        <div class="card-body pb-0">
          <div class="row d-flex align-items-stretch">

          {this.state.usersList.map(({
              _id,
              firstName,
              lastName,
              adminVerification,
              userImageUrl,
              company,
              address,
              email,
              mobile,
              regDate
          }) => {
              if(adminVerification === true || adminVerification === false){
                        
                    return (
                       
            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
            <div className="card bg-light">
              <div className="card-header text-muted border-bottom-0">
                {company}
              </div>
              <div className="card-body pt-0">
                <div className="row">
                  <div className="col-7">
                    <h2 className="lead"><b>{firstName} {lastName}</b></h2>
                    <p className="text-muted text-sm"><b>Date of Joined: </b> {regDate} </p>
                    <ul className="ml-4 mb-0 fa-ul text-muted">
                      <li className="small"><span class="fa-li"><i className="fas fa-lg fa-building"></i></span> Address: {address}</li>
                      <li className="small"><span class="fa-li"><i className="fas fa-lg fa-phone"></i></span> Phone #: {mobile}</li>
                    </ul>
                  </div>
                  <div className="col-5 text-center">

                    {(userImageUrl === '') &&
                        <Avatar name={firstName+ ' ' +lastName}                         
                        round="50%"
                        size="140" />
                    }

                    {(userImageUrl !== '')&&
                    <img src={userImageUrl} alt="" className="img-circle img-fluid"/>
                    }
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="text-right">
                  <a href="#" className="btn btn-sm bg-teal">
                    <i className="fas fa-envelope"></i>
                  </a>
                  <a href="#" className="btn btn-sm btn-primary" style={{marginLeft:5}}>
                    <i className="fas fa-user"></i> View Profile
                  </a>
                </div>
              </div>
            </div>
          </div>            
                    );
              }

         
          })}

   
          </div>
        </div>

        <div class="card-footer">
          <nav aria-label="Contacts Page Navigation">
            {/* <ul class="pagination justify-content-center m-0">
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">4</a></li>
              <li class="page-item"><a class="page-link" href="#">5</a></li>
              <li class="page-item"><a class="page-link" href="#">6</a></li>
              <li class="page-item"><a class="page-link" href="#">7</a></li>
              <li class="page-item"><a class="page-link" href="#">8</a></li>
            </ul> */}
          </nav>
        </div>

      </div>


    </section>

    </div>
        )
    }
}
