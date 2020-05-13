import React, { Component } from 'react'
import './assets/css/imageUploadPreview.css';
import swal from 'sweetalert';
import axios from 'axios';
export default class MyProfileUserFunctions extends Component {

    constructor(props){
        super(props);
        this.state = {
            file: null,
            firstName:'',
            lastName:'',
            mobile:'',
            address:'',
            isAdmin:'',
            isSalesManager:'',
            isSalesServicer:'',
            isCustomer:'',
            userDesignation :''

        };

        this.uploadSingleFile = this.uploadSingleFile.bind(this)
        this.upload = this.upload.bind(this)
 
    }

    getUser = ()=>{

        axios({
            method:'get',
            url:`/api/users/singleUser/${this.props.loggedEmail}`,
            headers: {
                "Authorization" : "Bearer "+localStorage.getItem('userLoginToken')
            }
        })
        .then((res) => {
          const user = res.data;
          console.log('User data are : ',user.isSalesManager);

          this.setState({
            firstName:user.firstName,
            lastName:user.lastName,
            mobile:user.mobile,
            address:user.address,
            isAdmin:user.isAdmin,
            isSalesManager:user.isSalesManager,
            isSalesServicer:user.isSalesServicer,
            isCustomer:user.isCustomer
          })

          
          if(this.state.isCustomer === true){
            this.setState({
             userDesignation:'Customer'
            })
           }else if(this.state.isAdmin === true){
               this.setState({
                   userDesignation:'Admin'
               })
           }else if(this.state.isSalesManager === true){
               this.setState({
                   userDesignation:'Sales Manager'
               })
           }else if(this.state.isSalesServicer === true){
               this.setState({
                   userDesignation:'Sales Servicer'
               })
           }
 

        })
        .catch((err)=>{
            console.log(err);
        });

      
        
    }


    onChangeHandler = e =>{
        this.setState({
          [e.target.name] : e.target.value
        })
    }


    componentDidMount(){
        this.getUser();
    }


    updateMyProfile = (email) =>{
     
        console.log('Sales Servicer Email : ',email);
        axios({
            method:'patch',
            url:`/api/users/updatemyProfile/${email}`,
            headers:{
               "Authorization" : "Bearer "+localStorage.getItem('userLoginToken')
            },
            data:{
              firstName:this.state.firstName,
              lastName:this.state.lastName,
              mobile:this.state.mobile,
              address:this.state.address
            }
            

        })
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
           console.log(err)
        });
    }


      uploadSingleFile(e) {
        this.setState({
          file: URL.createObjectURL(e.target.files[0])
        })
      }
  
  
      upload(e) {
        e.preventDefault()
        console.log(this.state.file)
      }


      
    render() {

        const{loggedEmail} = this.props;
        console.log('Logged User Email is : ' ,loggedEmail);
        console.log('Logged User FirstName is : ' ,this.state.firstName);


      let imgPreview;
      if (this.state.file) {
          imgPreview = <img src={this.state.file} alt=''  style={{width:'160px',height:'160px',borderRadius:'100px'}}/>;
      }else{
        imgPreview = <img src="../../dist/img/user4-128x128.jpg" alt='' style={{width:'160px',height:'160px',borderRadius:'100px'}}/>;
      }

  


        return (
            <div>
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">

        
            <div className="card card-primary card-outline">
              <div className="card-body box-profile">
                <div className="text-center">
                  {imgPreview}
                </div>

                <h3 className="profile-username text-center">{this.state.firstName} {this.state.lastName}</h3>

                <p className="text-muted text-center">{this.state.userDesignation}</p>

                <ul className="list-group list-group-unbordered mb-3">
                  <li className="list-group-item">
                    <b>Followers</b> <a className="float-right">1,322</a>
                  </li>
                  <li className="list-group-item">
                    <b>Following</b> <a className="float-right">543</a>
                  </li>
                  <li className="list-group-item">
                    <b>Friends</b> <a className="float-right">13,287</a>
                  </li>
                </ul>

                <a href="#" className="btn btn-primary btn-block"><b>Follow</b></a>
              </div>

            </div>

            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">About Me</h3>
              </div>
     
              <div className="card-body">
                <strong><i className="fas fa-book mr-1"></i> Education</strong>

                <p className="text-muted">
                  B.S. in Computer Science from the University of Tennessee at Knoxville
                </p>

                <hr/>

                <strong><i className="fas fa-map-marker-alt mr-1"></i> Location</strong>

                <p className="text-muted">Malibu, California</p>

                <hr/>

                <strong><i className="fas fa-pencil-alt mr-1"></i> Skills</strong>

                <p className="text-muted">
                  <span className="tag tag-danger">UI Design</span>
                  <span className="tag tag-success">Coding</span>
                  <span className="tag tag-info">Javascript</span>
                  <span className="tag tag-warning">PHP</span>
                  <span className="tag tag-primary">Node.js</span>
                </p>

                <hr/>

                <strong><i className="far fa-file-alt mr-1"></i> Notes</strong>

                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
              </div>

            </div>

          </div>

          <div className="col-md-9">
            <div className="card">
              <div className="card-header p-2">
                <ul className="nav nav-pills">
                  <li className="nav-item"><a className="nav-link active" href="#activity" data-toggle="tab">Activity</a></li>
                  <li className="nav-item"><a className="nav-link" href="#timeline" data-toggle="tab">Timeline</a></li>
                  <li className="nav-item"><a className="nav-link" href="#settings" data-toggle="tab">Settings</a></li>
                </ul>
              </div>
              <div className="card-body">
                <div className="tab-content">
                  <div className="active tab-pane" id="activity">
 
                    <div className="post">
                      <div className="user-block">
                        <img className="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.jpg" alt="user image"/>
                        <span className="username">
                          <a href="#">Jonathan Burke Jr.</a>
                          <a href="#" className="float-right btn-tool"><i className="fas fa-times"></i></a>
                        </span>
                        <span className="description">Shared publicly - 7:30 PM today</span>
                      </div>
             
                      <p>
                        Lorem ipsum represents a long-held tradition for designers,
                        typographers and the like. Some people hate it and argue for
                        its demise, but others ignore the hate as they create awesome
                        tools to help create filler text for everyone from bacon lovers
                        to Charlie Sheen fans.
                      </p>

                      <p>
                        <a href="#" className="link-black text-sm mr-2"><i className="fas fa-share mr-1"></i> Share</a>
                        <a href="#" className="link-black text-sm"><i className="far fa-thumbs-up mr-1"></i> Like</a>
                        <span className="float-right">
                          <a href="#" className="link-black text-sm">
                            <i className="far fa-comments mr-1"></i> Comments (5)
                          </a>
                        </span>
                      </p>

                      <input className="form-control form-control-sm" type="text" placeholder="Type a comment"/>
                    </div>

                    <div className="post clearfix">
                      <div className="user-block">
                        <img className="img-circle img-bordered-sm" src="../../dist/img/user7-128x128.jpg" alt="User Image"/>
                        <span className="username">
                          <a href="#">Sarah Ross</a>
                          <a href="#" className="float-right btn-tool"><i className="fas fa-times"></i></a>
                        </span>
                        <span className="description">Sent you a message - 3 days ago</span>
                      </div>

                      <p>
                        Lorem ipsum represents a long-held tradition for designers,
                        typographers and the like. Some people hate it and argue for
                        its demise, but others ignore the hate as they create awesome
                        tools to help create filler text for everyone from bacon lovers
                        to Charlie Sheen fans.
                      </p>

                      <form className="form-horizontal">
                        <div className="input-group input-group-sm mb-0">
                          <input className="form-control form-control-sm" placeholder="Response"/>
                          <div className="input-group-append">
                            <button  className="btn btn-danger">Send</button>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div className="post">
                      <div className="user-block">
                        <img className="img-circle img-bordered-sm" src="../../dist/img/user6-128x128.jpg" alt="User Image"/>
                        <span className="username">
                          <a href="#">Adam Jones</a>
                          <a href="#" className="float-right btn-tool"><i className="fas fa-times"></i></a>
                        </span>
                        <span className="description">Posted 5 photos - 5 days ago</span>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-6">
                          <img className="img-fluid" src="../../dist/img/photo1.png" alt="Photo"/>
                        </div>

                        <div className="col-sm-6">
                          <div className="row">
                            <div className="col-sm-6">
                              <img className="img-fluid mb-3" src="../../dist/img/photo2.png" alt="Photo"/>
                              <img className="img-fluid" src="../../dist/img/photo3.jpg" alt="Photo"/>
                            </div>

                            <div className="col-sm-6">
                              <img className="img-fluid mb-3" src="../../dist/img/photo4.jpg" alt="Photo"/>
                              <img className="img-fluid" src="../../dist/img/photo1.png" alt="Photo"/>
                            </div>
                          </div>               
                        </div>   
                      </div>
      
                      <p>
                        <a href="#" className="link-black text-sm mr-2"><i className="fas fa-share mr-1"></i> Share</a>
                        <a href="#" className="link-black text-sm"><i className="far fa-thumbs-up mr-1"></i> Like</a>
                        <span className="float-right">
                          <a href="#" className="link-black text-sm">
                            <i className="far fa-comments mr-1"></i> Comments (5)
                          </a>
                        </span>
                      </p>

                      <input className="form-control form-control-sm" type="text" placeholder="Type a comment"/>
                    </div>
             
                  </div>
             
                  <div className="tab-pane" id="timeline">
                 
                    <div className="timeline timeline-inverse">
           
                      <div className="time-label">
                        <span className="bg-danger">
                          10 Feb. 2014
                        </span>
                      </div>

                      <div>
                        <i className="fas fa-envelope bg-primary"></i>

                        <div className="timeline-item">
                          <span className="time"><i className="far fa-clock"></i> 12:05</span>

                          <h3 className="timeline-header"><a href="#">Support Team</a> sent you an email</h3>

                          <div className="timeline-body">
                            Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
                            weebly ning heekya handango imeem plugg dopplr jibjab, movity
                            jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle
                            quora plaxo ideeli hulu weebly balihoo...
                          </div>
                          <div className="timeline-footer">
                            <a href="#" className="btn btn-primary btn-sm">Read more</a>
                            <a href="#" className="btn btn-danger btn-sm">Delete</a>
                          </div>
                        </div>
                      </div>
      
                      <div>
                        <i className="fas fa-user bg-info"></i>

                        <div className="timeline-item">
                          <span className="time"><i className="far fa-clock"></i> 5 mins ago</span>

                          <h3 className="timeline-header border-0"><a href="#">Sarah Young</a> accepted your friend request
                          </h3>
                        </div>
                      </div>
         
                      <div>
                        <i className="fas fa-comments bg-warning"></i>

                        <div className="timeline-item">
                          <span className="time"><i className="far fa-clock"></i> 27 mins ago</span>

                          <h3 className="timeline-header"><a href="#">Jay White</a> commented on your post</h3>

                          <div className="timeline-body">
                            Take me to your leader!
                            Switzerland is small and neutral!
                            We are more like Germany, ambitious and misunderstood!
                          </div>
                          <div className="timeline-footer">
                            <a href="#" className="btn btn-warning btn-flat btn-sm">View comment</a>
                          </div>
                        </div>
                      </div>
         
                      <div className="time-label">
                        <span className="bg-success">
                          3 Jan. 2014
                        </span>
                      </div>
               
                      <div>
                        <i className="fas fa-camera bg-purple"></i>

                        <div className="timeline-item">
                          <span className="time"><i className="far fa-clock"></i> 2 days ago</span>

                          <h3 className="timeline-header"><a href="#">Mina Lee</a> uploaded new photos</h3>

                          <div className="timeline-body">
                            <img src="http://placehold.it/150x100" alt="..."/>
                            <img src="http://placehold.it/150x100" alt="..."/>
                            <img src="http://placehold.it/150x100" alt="..."/>
                            <img src="http://placehold.it/150x100" alt="..."/>
                          </div>
                        </div>
                      </div>
                  
                      <div>
                        <i className="far fa-clock bg-gray"></i>
                      </div>
                    </div>
                  </div>
                  

                  <div className="tab-pane" id="settings">
              
                      <div className="form-group row">
                        <label for="firstName" className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-10">

                        

                          <input type="text" value={this.state.firstName} onChange={this.onChangeHandler} className="form-control" id="firstName" name="firstName" placeholder="First Name"/>

                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="lastName" className="col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-10">


                          <input type="text" value={this.state.lastName} onChange={this.onChangeHandler} className="form-control" id="lastName" name="lastName" placeholder="Last Name"/>

                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="userEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">

                          <input type="email" value={this.props.loggedEmail} disabled onChange={this.onChangeHandler} className="form-control" id="userEmail" name="userEmail" placeholder="Email"/>
                          </div>
                        </div>
                
                      <div className="form-group row">
                        <label for="userMobile" className="col-sm-2 col-form-label">Mobile</label>
                        <div className="col-sm-10">


                          <input type="text" value={this.state.mobile} onChange={this.onChangeHandler} className="form-control" id="userMobile" name="mobile" placeholder="Mobile"/>

                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="userAddress" className="col-sm-2 col-form-label">Address</label>
                        <div className="col-sm-10">


                          <input type="text" value={this.state.address} onChange={this.onChangeHandler} className="form-control" id="address" placeholder="Address" name="address"/>

                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="inputSkills" className="col-sm-2 col-form-label">Your DP</label>
                        <div className="col-sm-10">
                        
                        <div className="form-group preview">
                            {imgPreview}
                        </div>

             
                    <input type="file"  onChange={this.uploadSingleFile} />
                
                    

                        </div>
                      </div>


                      <div className="form-group row">
                        <div className="offset-sm-2 col-sm-10">
                          <div className="checkbox">
                            <label>
                              <input type="checkbox"/> I agree to the <a href="#">terms and conditions</a>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="offset-sm-2 col-sm-10">
                          <button  
                                 onClick={()=>{
                                  swal({
                                    title: "Done",
                                    text: "Profile was Updated",
                                    icon: "success",
                                  })
                                  .then(()=>{
                                    this.updateMyProfile(this.props.loggedEmail)
                                  })
                               
                                }
                              }
                          className="btn btn-danger">Submit</button>
                        </div>
                      </div>
                  
                  </div>
                 
                </div>
                
              </div>
            </div>
           
          </div>
        
        </div>
        
      </div>
      </div>
        )


    }
}
