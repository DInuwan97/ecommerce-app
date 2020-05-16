import React, { Component } from 'react';
import axios from 'axios';

export default class AddedPackages extends Component {

    

    constructor(props){
        super(props);
        this.getPackages();
        this.state = {
            packageList:[],
            packageName:'',
            packageDescription:'',
            maxNoOfSalesServicers:''
        }
    }

    componentDidMount(){
        this.getPackages();
    }

    getPackages = ()=>{
        axios({
            method:'get',
            url:'/api/packages/view',
        })
        .then((res) =>{

            let pack = res.data;
            this.setState({
                packageList:pack,
                packageName:pack.packageName,
                packageDescription:pack.packageDescription,
                maxNoOfSalesServicers:pack.maxNoOfSalesServicers
            })      
        })
    }


  render() {
    return (
      
        <div className="card card-info">
            <div className="card-header">
              <h3 className="card-title">Availbale Packages</h3>

              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i className="fas fa-minus"></i></button>
              </div>
            </div>
            <div className="card-body p-0">
            <table class="table">
                <thead>
                  <tr>
                    <th>Package Name</th>
                    <th>MAX Salese Servicers</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>


                        
                  {this.state.packageList.map((pac) => (
                    <tr>
                        <td>{pac.packageName}</td>
                        <td>{pac.maxNoOfSalesServicers}</td>
                        <td class="text-right py-0 align-middle">
                          <div class="btn-group btn-group-sm">
                            <a href="#" class="btn btn-info"><i class="fas fa-eye"></i></a>
                            <a href="#" class="btn btn-danger"><i class="fas fa-trash"></i></a>
                          </div>
                        </td>
                    </tr>
                  ))}


               
                 

                </tbody>
              </table>
            </div>
       
          </div>
  
    );
  }
}
