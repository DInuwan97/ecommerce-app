import React, { Component } from 'react'
import classes from './Summary.module.css';
import axios from 'axios';
export default class UserProfile extends Component {


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
        userDesignation :'',
        userImageUrl:'',

        itemImage:'',
        itemList:[],

        oldPassword:'',
        newPassword:'',
        confirmPassword:''
    }
    
    this.uploadSingleFile = this.uploadSingleFile.bind(this)
    
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
        isCustomer:user.isCustomer,
        userImageUrl:user.userImageUrl,
        file:user.userImageUrl
      })

      //this.state.file = this.state.userImageUrl;

      
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

componentDidMount(){
    this.getUser();
}


uploadSingleFile(e) {
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    })

      
    this.setState({ 
        userImageUrl: e.target.files[0] 
    });

}

onChangeHandler = e =>{
    this.setState({
      [e.target.name] : e.target.value
    })
}

    render() {

        let imgPreview;
        if (this.state.file) {
            imgPreview = <img src={this.state.file} alt=''  style={{width:'160px',height:'160px',borderRadius:'100px'}}/>;
        }else{
          imgPreview = <img src="https://res.cloudinary.com/dsuhs6bf5/image/upload/v1589448087/zozjadcms7g1kezmrc.png" alt='' style={{width:'160px',height:'160px',borderRadius:'100px'}}/>;
        }


        return (
            <div>
                <div className="contact">
	<div className="container">
		
        
		<div className="col-md-4 col-sm-4 contact-left">
        <div className="panel panel-default">
  <div className="panel-body">
    

  <div className={classes.container} >
      <div className={classes.header}>
        <center>
        {imgPreview}
             <center><h2 style={{color:'black'}}>{this.state.firstName} {this.state.lastName}</h2></center>
             <p style={{color:'black'}}>{this.state.userDesignation}</p>
             <span class="label label-primary">{this.props.companyName}</span>
        </center>
        
      </div>

      <div className={classes.details}>
        <div className={classes.subtotal}>
          <span style={{fontWeight:'bold',color:'black'}}>EMAIL</span>
          <span style={{fontWeight:'bold'}}>{this.props.loggedEmail} </span>
        </div>
        <div className={classes.discount}>
          <span style={{fontWeight:'bold',color:'black'}}>MOBILE</span>
          <span style={{fontWeight:'bold'}}>{this.state.mobile}</span>
        </div>
        <div className={classes.discount}>
          <span style={{fontWeight:'bold',color:'black'}}>HEAD QUATERS HOTLINE</span>
          <span style={{fontWeight:'bold'}}>+34476354689</span>
        </div>
        <div className={classes.discount}>
          <span style={{fontWeight:'bold',color:'black'}}>COMPLAINS</span>
          <span style={{fontWeight:'bold'}}>+34476354689</span>
        </div>
      </div>


      <div className={classes.button} style={{marginBottom:5}}>
        <button className={classes.button_buy} style={{background:'black'}}>SEND EMAIL</button>
      </div>

      <div className={classes.button}>
        <button className={classes.button_buy}>VOICE</button>
      </div>
    </div>



  </div>
 
</div>
		</div>

            
		<div className="col-md-8 col-sm-8 contact-right" style={{background:'#f5f5f5'}}>
        
      
          <div className="form-w3agile">
          <h3 style={{marginTop:15}}>Edit Your Profile</h3>

				<input type="text" name="firstName" placeholder="First Name" required=" " value={this.state.firstName} onChange={this.onChangeHandler}/>
                <input type="text" name="lastName" placeholder="Last Name" required=" " value={this.state.lastName} onChange={this.onChangeHandler}/>
				<input type="text" name="email" placeholder="Email" required=" " value={this.props.loggedEmail} onChange={this.onChangeHandler}/>
                <input type="text" name="mobile" placeholder="Mobile" required=" " value={this.state.mobile} onChange={this.onChangeHandler}/>
                <input type="text" name="address" placeholder="Address" required=" " style={{marginBottom:30}} value={this.state.address} onChange={this.onChangeHandler}/>
                <input type="text" name="Joined Date" placeholder="Joined Date" required=" " />
				
                
                {imgPreview}
                <input type="file"style={{marginBottom:15}} name="userImageUrl" onChange={this.uploadSingleFile}/>
				<input type="submit" value="Send message"/>

	 
        </div>
			
		</div>
	</div>
</div>
            </div>
        )
    }
}
