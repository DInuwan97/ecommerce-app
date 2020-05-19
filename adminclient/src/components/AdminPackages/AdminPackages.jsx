import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
export default class AdminPackages extends Component {

  constructor(props){
    super(props)
    this.state = {
      packageName:'',
      packageDscription:'',
      maxNoOfSalesServicers:''
    }
  }


  componentDidMount(){

  }

  onSubmitHandler = e =>{

    e.preventDefault()

    axios({
      method:'post',
      url:'/api/packages/add',
      data:{
        packageName:this.state.packageName,
        maxNoOfSalesServicers:this.state.maxNoOfSalesServicers,
        packageDscription:this.state.packageDscription
      }
    })
    .then((res) => {
      console.log(res)
      swal({
        title: "Done",
        text: "Inserted Successfully",
        icon: "success",
        button: true,
      })

      this.setState({
        packageName:'',
        packageDscription:'',
        maxNoOfSalesServicers:''
      })


      

    })
    .catch((err) => {
      console.error(err)
      swal({
        title: "Oops!!!",
        text: "Does Not Insterted",
        icon: "error",
        button:true,
      })
    });
   
  }

  
onChangeHandler = e =>{
  this.setState({
    [e.target.name] : e.target.value
  })
}



    render() {
        return (
            <div>
              
      
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Add New Package</h3>

              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i className="fas fa-minus"></i></button>
              </div>
            </div>
            <form onSubmit={this.onSubmitHandler}>
            <div className="card-body">
              <div className="form-group">
                <label for="packageName">Package Name</label>
                <input type="text"
                 id="packageName" 
                 name="packageName" 
                 className="form-control" 
                 value={this.state.packageName}
                 onChange={this.onChangeHandler}/>
              </div>
              <div className="form-group">
                <label for="packageDscription">Package Description</label>
                <textarea id="packageDscription"
                 name="packageDscription" 
                 className="form-control"
                 rows="4"
                 value={this.state.packageDscription}
                 onChange={this.onChangeHandler} ></textarea>
              </div>
         
              <div className="form-group">
                <label for="maxNoOfSalesServicers">Maximum Number of Sales Servicers</label>
                <input type="number" 
                 id="maxNoOfSalesServicers"
                 className="form-control"
                 name="maxNoOfSalesServicers"
                 value={this.state.maxNoOfSalesServicers}
                 onChange={this.onChangeHandler} />
              </div>

              <button className="btn btn-primary" >ADD PACKAGE</button>
            </div>
            </form>
    
          </div>

        </div>
    
            
        )
    }
}
